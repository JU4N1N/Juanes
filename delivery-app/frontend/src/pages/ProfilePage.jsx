import { useEffect, useState } from "react";
import { User, ClipboardList, MapPin, Settings, Save, X, Camera } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";

const API_URL = "http://localhost:3001/api";
const getToken = () => localStorage.getItem("token");

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const [user, setUser] = useState({ name: "", email: "" });
  const [originalUser, setOriginalUser] = useState(user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        const data = await res.json();
        setUser(data);
        setOriginalUser(data);
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    if (editing) setUser(originalUser);
    else setOriginalUser(user);
    setEditing(!editing);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ name: user.name, email: user.email })
      });
      if (!res.ok) throw new Error("Error al actualizar");
      setEditing(false);
      // Podrías usar un toast aquí
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-32 pb-12 px-6 flex flex-col lg:flex-row gap-8">
        
        {/* --- SIDEBAR MODERNO --- */}
        <aside className="w-full lg:w-1/4">
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 flex flex-col items-center border border-slate-100 sticky top-32">
            
            {/* Avatar con Efecto */}
            <div className="relative group mb-6">
              <div className="w-32 h-32 bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center rounded-[2.5rem] text-5xl font-black shadow-2xl shadow-orange-500/40 transform group-hover:rotate-6 transition-transform duration-300">
                {user.name?.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 bg-slate-900 text-white p-2.5 rounded-2xl shadow-lg border-4 border-white hover:bg-orange-600 transition-colors">
                <Camera size={18} />
              </button>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-slate-900 leading-tight">{user.name}</h2>
              <p className="text-slate-400 font-medium text-sm mt-1">{user.email}</p>
            </div>

            <nav className="w-full space-y-2">
              <SidebarLink to="/profile" icon={User} label="Mi Perfil" active={location.pathname === '/profile'} />
              <SidebarLink to="/addresses" icon={MapPin} label="Direcciones" />
              <SidebarLink to="/orders" icon={ClipboardList} label="Historial de Pedidos" />
              <SidebarLink to="/settings" icon={Settings} label="Configuración" />
            </nav>
          </div>
        </aside>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <main className="flex-1">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-10 h-full"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Información del Perfil</h1>
                <p className="text-slate-500 font-medium mt-1">Gestiona tus datos personales y cuenta.</p>
              </div>

              <button
                onClick={handleEditToggle}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                  editing 
                    ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
                    : "bg-orange-50 text-orange-600 hover:bg-orange-100 shadow-sm"
                }`}
              >
                {editing ? <><X size={18} /> Cancelar</> : <><Settings size={18} /> Editar Perfil</>}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                label="Nombre Completo"
                name="name"
                value={user.name}
                onChange={handleChange}
                disabled={!editing}
                icon={User}
                placeholder="Tu nombre"
              />

              <Input
                label="Correo Electrónico"
                name="email"
                value={user.email}
                onChange={handleChange}
                disabled={!editing}
                icon={Settings}
                placeholder="ejemplo@correo.com"
              />
            </div>

            <AnimatePresence>
              {editing && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-12 p-8 bg-orange-50 rounded-[2rem] border border-orange-100 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-500/20 p-3 rounded-2xl text-orange-600">
                      <Save size={24} />
                    </div>
                    <p className="text-orange-900 font-bold text-sm max-w-xs leading-tight">
                      Recuerda verificar que tu correo sea el correcto para recibir tus tickets de compra.
                    </p>
                  </div>
                  <Button
                    onClick={handleSave}
                    className="w-full md:w-auto px-10 py-4 shadow-orange-500/40"
                  >
                    Guardar Cambios
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </main>
      </div>
    </div>
  );
};

// Componente auxiliar para los links del Sidebar
const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-all duration-300 ${
      active 
        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 translate-x-2" 
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </Link>
);

export default ProfilePage;