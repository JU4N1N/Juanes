import React, { useState } from 'react';
import { Mail, Lock, LogIn, ChevronRight, Sparkles, Bike } from 'lucide-react';
// Importamos framer-motion para dar vida
import { motion } from 'framer-motion'; 
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const data = await login(email, password);

        // Guardar sesión
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        alert("Login exitoso 🚀");

        navigate("/home"); // o donde quieras mandar

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

    // Variantes de animación para elementos que entran en cascada
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Retraso entre cada hijo
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    const graphicVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { delay: 0.5, type: 'spring', bounce: 0.4 } }
    }

    return (
        // Fondo con gradiente sutil y animado (vía CSS en el index.css si se desea más complejo, aquí es estático pero vibrante)
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-slate-100 text-slate-900 flex font-sans overflow-hidden">
            
            {/* --- PANEL DE MARCA IZQUIERDO --- */}
            <div className="hidden lg:flex w-7/12 relative items-center justify-center p-16 overflow-hidden">
                
                {/* Elementos decorativos de fondo flotantes y animados */}
                <motion.div 
                    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-20 w-32 h-32 bg-amber-200/50 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-20 right-20 w-48 h-48 bg-orange-200/40 rounded-full blur-3xl"
                />

                {/* Contenido principal izquierdo con animaciones de entrada */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="relative z-10 max-w-xl text-center"
                >
                    {/* Icono animado */}
                    <motion.div variants={graphicVariants} className="mb-10 flex items-center justify-center relative">
                        {/* Brillo de fondo */}
                        <div className="absolute inset-0 bg-orange-400 rounded-full blur-3xl opacity-20 scale-150"></div>
                        <div className="bg-white p-7 rounded-full text-orange-600 shadow-xl border border-orange-100 relative z-10">
                            <Bike size={90} strokeWidth={1.2} className="transform -scale-x-100"/>
                        </div>
                    </motion.div>
                    
                    {/* Título con gradiente de texto para más "vida" */}
                    <motion.h1 variants={itemVariants} className="text-7xl font-extrabold tracking-tighter text-slate-950 mb-6 leading-[0.95]">
                        Satisface tu<br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">antojo</span>, rápido.
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-2xl text-slate-700/90 mb-12 leading-relaxed font-medium">
                        La forma más vibrante de pedir comida a domicilio.
                    </motion.p>
                    
                    {/* Panel gráfico con ligero efecto de desenfoque y animación hover */}
                    <motion.div 
                        variants={graphicVariants}
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        className="w-full h-28 bg-white/70 backdrop-blur-sm rounded-3xl flex items-center justify-around p-4 shadow-lg border border-white/50"
                    >
                        <div className="text-center group">
                            <Sparkles className="mx-auto text-amber-500 mb-1 group-hover:animate-pulse" size={24}/>
                            <p className="text-3xl font-extrabold text-slate-950">98%</p>
                            <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Entregas a Tiempo</p>
                        </div>
                        <div className="w-px h-16 bg-slate-200" />
                        <div className="text-center">
                            <p className="text-3xl font-extrabold text-slate-950">22m</p>
                            <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Tiempo Promedio</p>
                        </div>
                        <div className="w-px h-16 bg-slate-200" />
                        <div className="text-center">
                            <p className="text-3xl font-extrabold text-slate-950">4.9★</p>
                            <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Puntuación App</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>


            {/* --- PANEL DE FORMULARIO DERECHO --- */}
            {/* Ligeramente más translúcido y con gradiente sutil de fondo para separarlo */}
            <div className="w-full lg:w-5/12 flex items-center justify-center p-6 md:p-12 lg:p-16 xl:p-20 relative bg-white/40 backdrop-blur-md border-l border-white/20">
                
                {/* Contenedor del formulario con animaciones de entrada */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
                    className="w-full max-w-md"
                >
                    
                    {/* Header del Formulario */}
                    <div className="text-center mb-12">
                        {/* Logo para Móvil con Brillo */}
                        <div className="lg:hidden mb-8 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-orange-300 rounded-full blur-2xl opacity-40"></div>
                             <div className="bg-white p-4 rounded-full text-orange-600 shadow-md border relative z-10">
                                <Bike size={36} />
                            </div>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-950 mb-3">
                            ¡A comer se ha dicho!
                        </h2>
                        <p className="text-lg text-slate-700 font-medium">
                            Inicia sesión para ver qué hay de bueno hoy.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                        {/* INPUT EMAIL */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-800" htmlFor="email">
                                Tu e-mail
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-orange-600 transition-colors">
                                    <Mail size={22} strokeWidth={1.5} />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ejemplo@correo.com"
                                    required
                                    // Border radius más orgánico y borde más suave por defecto
                                    className="w-full pl-14 pr-6 py-4.5 text-base border-2 border-slate-200/70 rounded-3xl bg-white text-slate-950 placeholder:text-slate-400 focus:ring-4 focus:ring-orange-200/70 focus:border-orange-500 transition-all duration-200 shadow-sm"
                                />
                            </div>
                        </div>

                        {/* INPUT PASSWORD */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-slate-800" htmlFor="password">
                                    Contraseña
                                </label>
                                <a href="#" className="text-sm font-semibold text-orange-700 hover:text-orange-600 transition-colors">
                                    ¿Olvidaste la clave?
                                </a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-orange-600 transition-colors">
                                    <Lock size={22} strokeWidth={1.5} />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    required
                                    className="w-full pl-14 pr-6 py-4.5 text-base border-2 border-slate-200/70 rounded-3xl bg-white text-slate-950 placeholder:text-slate-400 focus:ring-4 focus:ring-orange-200/70 focus:border-orange-500 transition-all duration-200 shadow-sm"
                                />
                            </div>
                        </div>

                        {/* BOTÓN DE LOGIN CON ANIMACIÓN HOVER */}
                        <div className="pt-4 relative group">
                            {/* Brillo detrás del botón al hacer hover */}
                            <div className="absolute inset-0 bg-orange-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                            <motion.button
                                type="submit"
                                // Micro-interacción: escala un poco al pasar el mouse
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-xl py-5 px-6 rounded-3xl transition-all shadow-lg shadow-orange-500/30 relative z-10"
                            >
                                <LogIn size={24} className="group-hover:translate-x-1 transition-transform"/>
                                Iniciar Mi Aventura Culinaria
                            </motion.button>
                        </div>
                    </form>

                    {/* Footer del Formulario (Registro) */}
                    <div className="mt-14 text-center border-t border-slate-200/50 pt-8">
                        <p className="text-base text-slate-700 font-medium">
                            ¿Hambre y sin cuenta?
                        </p>
                        <motion.a 
                            href="/register" 
                            whileHover={{ gap: '12px' }} // Animación sutil del gap
                            className="inline-flex items-center gap-2 mt-3 text-lg font-extrabold text-orange-700 hover:text-orange-600 transition-all"
                        >
                            Regístrate y come gratis <ChevronRight size={24} strokeWidth={2.5} />
                        </motion.a>
                    </div>
                    
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;