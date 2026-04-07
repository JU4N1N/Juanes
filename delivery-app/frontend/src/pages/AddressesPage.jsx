import { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const AddressesPage = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, name: "Casa", address: "Av. Reforma 123, CDMX" },
    { id: 2, name: "Trabajo", address: "Insurgentes Sur 456, CDMX" }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: ""
  });

  // Manejar cambios
  const handleChange = (e, id = null) => {
    const { name, value } = e.target;

    if (id) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === id ? { ...addr, [name]: value } : addr
        )
      );
    } else {
      setNewAddress({ ...newAddress, [name]: value });
    }
  };

  // Agregar dirección
  const handleAdd = () => {
    if (!newAddress.name || !newAddress.address) return;

    const newItem = {
      id: Date.now(),
      ...newAddress
    };

    setAddresses([...addresses, newItem]);
    setNewAddress({ name: "", address: "" });
  };

  // Eliminar
  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  // Guardar edición
  const handleSave = () => {
    setEditingId(null);
    console.log("Direcciones actualizadas:", addresses);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f5efe6] p-10 space-y-6">

        <h1 className="text-3xl font-bold text-gray-900">
          Mis direcciones
        </h1>

        {/* AGREGAR NUEVA */}
        <Card title="Agregar nueva dirección">
          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              name="name"
              placeholder="Nombre (Casa, Trabajo...)"
              value={newAddress.name}
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />

            <input
              type="text"
              name="address"
              placeholder="Dirección completa"
              value={newAddress.address}
              onChange={handleChange}
              className="p-3 border rounded-lg col-span-2"
            />

          </div>

          <button
            onClick={handleAdd}
            className="mt-4 bg-[#f97316] text-white px-6 py-2 rounded-xl hover:bg-[#ea580c]"
          >
            Agregar
          </button>
        </Card>

        {/* LISTA */}
        <div className="grid md:grid-cols-2 gap-6">

          {addresses.map((addr) => (
            <Card key={addr.id} title={addr.name}>

              {editingId === addr.id ? (
                <div className="space-y-3">

                  <input
                    type="text"
                    name="name"
                    value={addr.name}
                    onChange={(e) => handleChange(e, addr.id)}
                    className="w-full p-2 border rounded"
                  />

                  <input
                    type="text"
                    name="address"
                    value={addr.address}
                    onChange={(e) => handleChange(e, addr.id)}
                    className="w-full p-2 border rounded"
                  />

                  <button
                    onClick={handleSave}
                    className="bg-[#f97316] text-white px-4 py-2 rounded-lg"
                  >
                    Guardar
                  </button>

                </div>
              ) : (
                <>
                  <p className="text-gray-600">{addr.address}</p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setEditingId(addr.id)}
                      className="bg-orange-100 text-[#f97316] px-3 py-1 rounded-lg"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(addr.id)}
                      className="bg-red-100 text-red-600 px-3 py-1 rounded-lg"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}

            </Card>
          ))}

        </div>

      </div>
    </>
  );
};

export default AddressesPage;