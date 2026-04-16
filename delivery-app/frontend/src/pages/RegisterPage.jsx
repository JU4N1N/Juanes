import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, ArrowRight, Bike, Sparkles } from "lucide-react";
import { register } from "../services/authService";
import Input from "../components/Input";
import Button from "../components/Button";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(form);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      navigate("/home");
    } catch (error) {
      console.error(error);
      // Aquí podrías usar un componente de notificación en lugar de alert
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-slate-100 flex font-sans overflow-hidden">
      
      {/* --- PANEL IZQUIERDO (Visual/Branding) --- */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center p-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 max-w-lg"
        >
          <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-orange-200/50 border border-orange-100 mb-8 inline-block">
            <Bike size={60} className="text-orange-500 transform -scale-x-100" strokeWidth={1.5} />
          </div>
          
          <h1 className="text-6xl font-black text-slate-900 leading-[0.9] mb-6">
            Únete a la <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
              revolución
            </span> <br />
            del sabor.
          </h1>
          
          <p className="text-xl text-slate-600 font-medium leading-relaxed mb-10">
            Crea tu cuenta en segundos y accede a los mejores restaurantes de la ciudad con entregas ultra rápidas.
          </p>

          <div className="flex gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">+500 usuarios ya están pidiendo</p>
            </div>
          </div>
        </motion.div>

        {/* Círculos decorativos de fondo */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[10%] w-80 h-80 bg-amber-200/20 rounded-full blur-3xl" />
      </div>

      {/* --- PANEL DERECHO (Formulario) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-white"
        >
          <div className="mb-10">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Crear Cuenta</h2>
            <p className="text-slate-500 font-medium mt-2">¿Listo para empezar tu aventura culinaria?</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Nombre completo"
              name="name"
              placeholder="Ej. Juan Juanes"
              value={form.name}
              onChange={handleChange}
              icon={User}
              required
            />

            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={form.email}
              onChange={handleChange}
              icon={Mail}
              required
            />

            <Input
              label="Teléfono"
              name="phone"
              placeholder="55 1234 5678"
              value={form.phone}
              onChange={handleChange}
              icon={Phone}
            />

            <Input
              label="Contraseña"
              name="password"
              type="password"
              placeholder="••••••••••••"
              value={form.password}
              onChange={handleChange}
              icon={Lock}
              required
            />

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full py-5 text-lg rounded-[1.5rem] shadow-orange-500/40"
              >
                Comenzar ahora
                <ArrowRight size={20} />
              </Button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-medium">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-orange-600 font-black hover:text-orange-700 transition-colors">
                Inicia Sesión
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;