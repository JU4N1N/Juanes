import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, 
  ShoppingBag, 
  LogOut, 
  Home, 
  ClipboardList, 
  MapPin,
  Bike
} from "lucide-react";
import { twMerge } from "tailwind-merge";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Estilo base para los links de navegación
  const navItemStyles = ({ isActive }) =>
    twMerge(
      "relative flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-300",
      isActive 
        ? "text-orange-600 bg-orange-50" 
        : "text-slate-600 hover:text-orange-500 hover:bg-slate-50"
    );

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4">
      {/* Contenedor Flotante con Glassmorphism */}
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg shadow-slate-200/50 rounded-[2rem] px-8 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/home" className="flex items-center gap-2 group">
          <div className="bg-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <Bike size={24} className="text-white transform -scale-x-100" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">
            Juanes<span className="text-orange-500">Delivery</span>
          </span>
        </Link>

        {/* LINKS CENTRALES */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/home" className={navItemStyles}>
            <Home size={18} />
            <span>Inicio</span>
          </NavLink>

          <NavLink to="/orders" className={navItemStyles}>
            <ClipboardList size={18} />
            <span>Mis Pedidos</span>
          </NavLink>

          <NavLink to="/addresses" className={navItemStyles}>
            <MapPin size={18} />
            <span>Direcciones</span>
          </NavLink>
        </div>

        {/* ACCIONES DERECHA */}
        <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
          
          {/* Botón de Carrito con Indicador */}
          <Link 
            to="/cart" 
            className="p-3 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-colors relative"
          >
            <ShoppingBag size={22} />
            {/* Badge de cantidad (opcional/estático por ahora) */}
            <span className="absolute top-2 right-2 w-4 h-4 bg-orange-600 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white">
              2
            </span>
          </Link>

          {/* Perfil */}
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              twMerge(
                "p-3 rounded-xl transition-all",
                isActive ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" : "text-slate-600 hover:bg-slate-100"
              )
            }
          >
            <User size={22} />
          </NavLink>

          {/* Logout con estilo de botón fantasma pero definido */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="ml-2 flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Salir</span>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;