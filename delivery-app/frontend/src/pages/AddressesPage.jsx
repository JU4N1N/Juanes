import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Trash2, Edit3, Save, X, Navigation } from "lucide-react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress
} from "../services/profileService";

const AddressesPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newAddress, setNewAddress] = useState({
    address_line: "",
    city: "",
    reference: ""
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

const fetchAddresses = async () => {
  setLoading(true);
  try {
    const data = await getAddresses();
    setAddresses(Array.isArray(data) ? data : []); // ← protege contra undefined
  } catch (error) {
    console.error("Error cargando direcciones:", error);
    setAddresses([]);
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e, id = null) => {
    const { name, value } = e.target;
    if (id) {
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === id ? { ...addr, [name]: value } : addr))
      );
    } else {
      setNewAddress({ ...newAddress, [name]: value });
    }
  };

  const handleAdd = async () => {
    if (!newAddress.address_line || !newAddress.city) return;
    await createAddress(newAddress);
    setNewAddress({ address_line: "", city: "", reference: "" });
    fetchAddresses();
  };

  const handleDelete = async (id) => {
    await deleteAddress(id);
    fetchAddresses();
  };

  const handleSave = async (addr) => {
    await updateAddress(addr.id, {
      address_line: addr.address_line,
      city: addr.city,
      reference: addr.reference
    });
    setEditingId(null);
    fetchAddresses();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-5xl mx-auto pt-32 pb-12 px-6 space-y-10">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-orange-500 p-3 rounded-2xl text-white shadow-lg shadow-orange-500/20">
              <MapPin size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Mis Direcciones</h1>
              <p className="text-slate-500 font-medium">Gestiona dónde recibes tus pedidos.</p>
            </div>
          </div>
        </header>

        {/* AGREGAR NUEVA DIRECCIÓN */}
        <Card className="p-8 border-dashed border-2 border-slate-200 bg-white/50" hover={false}>
          <div className="flex items-center gap-2 mb-6 text-orange-600">
            <Plus size={20} strokeWidth={3} />
            <h2 className="text-xl font-bold uppercase tracking-wider text-sm">Agregar nueva ubicación</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                name="address_line"
                placeholder="Calle, número y colonia..."
                label="Dirección"
                value={newAddress.address_line}
                onChange={handleChange}
                icon={MapPin}
              />
            </div>
            <Input
              name="city"
              placeholder="Ciudad"
              label="Ciudad"
              value={newAddress.city}
              onChange={handleChange}
              icon={Navigation}
            />
            <Input
              name="reference"
              placeholder="Eje: Portón azul, junto al Oxxo"
              label="Referencia"
              value={newAddress.reference}
              onChange={handleChange}
              icon={Edit3}
            />
          </div>

          <div className="mt-8 flex justify-end">
            <Button onClick={handleAdd} className="px-10 shadow-orange-500/30">
              Guardar Dirección
            </Button>
          </div>
        </Card>

        {/* LISTADO DE DIRECCIONES */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence>
            {addresses.map((addr, index) => (
              <motion.div
                key={addr.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="p-6 h-full flex flex-col justify-between group border-l-4 border-l-slate-200 hover:border-l-orange-500 transition-all duration-300">
                  
                  {editingId === addr.id ? (
                    <div className="space-y-4">
                      <Input
                        name="address_line"
                        value={addr.address_line}
                        onChange={(e) => handleChange(e, addr.id)}
                        className="py-2"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          name="city"
                          value={addr.city}
                          onChange={(e) => handleChange(e, addr.id)}
                          className="py-2 text-sm"
                        />
                        <Input
                          name="reference"
                          value={addr.reference}
                          onChange={(e) => handleChange(e, addr.id)}
                          className="py-2 text-sm"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button onClick={() => handleSave(addr)} className="flex-1 py-2 text-sm">
                          <Save size={16} /> Guardar
                        </Button>
                        <Button variant="outline" onClick={() => setEditingId(null)} className="py-2 text-sm">
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="bg-slate-100 p-2 rounded-xl text-slate-500 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                            <Navigation size={20} />
                          </div>
                          <span className="text-[10px] font-black text-slate-300 uppercase">Dirección #{index + 1}</span>
                        </div>
                        
                        <div>
                          <p className="text-xl font-bold text-slate-900 leading-tight">{addr.address_line}</p>
                          <p className="text-slate-500 font-bold text-sm">{addr.city}</p>
                        </div>
                        
                        {addr.reference && (
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Referencia</p>
                            <p className="text-sm text-slate-600 italic">"{addr.reference}"</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 mt-6">
                        <button
                          onClick={() => setEditingId(addr.id)}
                          className="flex-1 flex items-center justify-center gap-2 bg-orange-50 text-orange-600 py-2 rounded-xl font-bold hover:bg-orange-100 transition-all text-sm"
                        >
                          <Edit3 size={16} /> Editar
                        </button>
                        <button
                          onClick={() => handleDelete(addr.id)}
                          className="px-4 flex items-center justify-center bg-red-50 text-red-500 py-2 rounded-xl hover:bg-red-100 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* LOADING STATE */}
        {loading && addresses.length === 0 && (
          <div className="text-center py-10">
            <div className="inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressesPage;