import { useState } from "react";
import { User, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "555-123-4567",
    address: "Ciudad de México, México"
  });

  const [originalUser, setOriginalUser] = useState(user);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleEditToggle = () => {
    if (editing) {
      // Cancelar → restaurar datos originales
      setUser(originalUser);
    } else {
      // Guardar copia antes de editar
      setOriginalUser(user);
    }
    setEditing(!editing);
  };

  const handleSave = () => {
    setEditing(false);
    console.log("Datos guardados:", user);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex bg-[#f5efe6]">

        {/* SIDEBAR */}
        <div className="w-1/4 bg-[#fffaf3] shadow-lg p-6 flex flex-col items-center">

          {/* Avatar */}
          <div className="w-24 h-24 bg-[#f97316] text-white flex items-center justify-center rounded-full text-3xl font-bold mb-4 shadow-md">
            {user.name.charAt(0)}
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {user.name}
          </h2>

          {/* Navegación */}
          <div className="w-full space-y-3">

            <Link
              to="/profile"
              className="flex items-center gap-2 p-3 rounded-xl bg-[#f97316] text-white shadow"
            >
              <User size={18} />
              Perfil
            </Link>

            <Link
              to="/addresses"
              className="flex items-center gap-2 p-3 rounded-xl hover:bg-orange-100 text-gray-700"
            >
              Direcciones
            </Link>

            <Link
              to="/orders"
              className="flex items-center gap-2 p-3 rounded-xl hover:bg-orange-100 text-gray-700"
            >
              <ClipboardList size={18} />
              Pedidos
            </Link>

          </div>
        </div>

        {/* CONTENIDO */}
        <div className="flex-1 p-10">

          <div className="bg-white rounded-2xl shadow-md p-8 w-full h-full">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Información del perfil
              </h1>

              <button
                onClick={handleEditToggle}
                className="bg-orange-100 text-[#f97316] px-4 py-2 rounded-lg hover:bg-orange-200 transition"
              >
                {editing ? "Cancelar" : "Editar"}
              </button>
            </div>

            {/* Formulario */}
            <div className="grid grid-cols-2 gap-6">

              <div>
                <label className="text-sm text-gray-500">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316]"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Correo</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316]"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316]"
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm text-gray-500">Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316]"
                />
              </div>

            </div>

            {/* Botón Guardar */}
            {editing && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-[#f97316] text-white px-6 py-3 rounded-xl hover:bg-[#ea580c] transition shadow-md"
                >
                  Guardar cambios
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </>
  );
};

export default ProfilePage;