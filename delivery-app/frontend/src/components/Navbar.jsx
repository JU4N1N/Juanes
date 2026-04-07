import { Link, NavLink } from "react-router-dom";
import { User, ShoppingCart, LogOut } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full bg-[#fffaf3] shadow-md px-8 py-4 flex items-center justify-between">

      {/* Logo */}
      <Link to="/home" className="text-2xl font-bold text-gray-900">
        <span className="text-[#f97316]">Ju</span>anes
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">

        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center gap-2 ${
              isActive ? "text-[#f97316]" : "text-gray-700 hover:text-[#f97316]"
            }`
          }
        >
          Inicio
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-2 ${
              isActive ? "text-[#f97316]" : "text-gray-700 hover:text-[#f97316]"
            }`
          }
        >
          <ShoppingCart size={18} />
          Pedidos
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-2 ${
              isActive ? "text-[#f97316]" : "text-gray-700 hover:text-[#f97316]"
            }`
          }
        >
          <User size={18} />
          Perfil
        </NavLink>

      </div>

      {/* Botón logout */}
      <button
        className="flex items-center gap-2 bg-[#f97316] text-white px-4 py-2 rounded-xl hover:bg-[#ea580c] transition shadow"
        onClick={() => {
          console.log("Cerrar sesión");
        }}
      >
        <LogOut size={18} />
        Salir
      </button>

    </nav>
  );
};

export default Navbar;