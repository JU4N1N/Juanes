import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando datos al auth-service:", { email, password });
    // Aquí iría la lógica para conectar con tu microservicio de Auth
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
      {/* Tarjeta Principal */}
      <div className="max-w-md w-full bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
        
        {/* Encabezado con degradado (Toque Ferrari/Delivery) */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 p-8 text-center">
          <h1 className="text-4xl font-black text-white tracking-tight italic">
            FAST<span className="text-slate-900">EAT</span>
          </h1>
          <p className="text-red-100 text-sm mt-2 font-medium uppercase tracking-widest">
            Tu comida a la velocidad de la luz 🏎️
          </p>
        </div>

        {/* Formulario */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Bienvenido de nuevo</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input de Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1 ml-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="piloto@ferrari.com" 
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-slate-500"
                required
              />
            </div>

            {/* Input de Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1 ml-1">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-slate-500"
                required
              />
            </div>

            {/* Olvidé mi contraseña */}
            <div className="text-right">
              <a href="#" className="text-xs text-red-400 hover:text-red-300 transition-colors">¿Olvidaste tu contraseña?</a>
            </div>

            {/* Botón de Acción */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/20 transform active:scale-95 transition-all duration-200 uppercase tracking-wider mt-4"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Footer del Formulario */}
          <div className="mt-8 pt-6 border-t border-slate-700 text-center">
            <p className="text-slate-400 text-sm">
              ¿Eres nuevo en el equipo?{' '}
              <a href="/register" className="text-red-400 font-bold hover:underline">Regístrate aquí</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;