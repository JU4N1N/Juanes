import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // 🔥 Obtener cantidad del carrito
  const getCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Si manejas quantity:
    const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

    setCartCount(total);
  };

  useEffect(() => {
    getCartCount();

    // 🔥 Escuchar cambios (evento custom)
    const handleCartUpdate = () => {
      getCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

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

        {/* LINKS */}
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

        {/* DERECHA */}
        <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
          
          {/* 🛒 CARRITO DINÁMICO */}
          <Link 
            to="/cart" 
            className="p-3 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-colors relative"
          >
            <ShoppingBag size={22} />

            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0, y: -5 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-orange-600 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
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

          {/* Logout */}
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