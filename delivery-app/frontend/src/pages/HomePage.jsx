import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Star, Clock, Search } from "lucide-react"; // Iconos para sumar detalle
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import { getRestaurants } from "../services/restaurantService";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error("Error cargando restaurantes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 pt-32 pb-20 px-10 text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4">
            ¿Qué se te <span className="text-orange-500">antoja</span> hoy?
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto font-medium">
            Descubre los mejores sabores de la ciudad directo a tu puerta.
          </p>
        </motion.div>
        {/* Decoración abstracta de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </section>

      <div className="max-w-7xl mx-auto p-10 -mt-10 relative z-20">
        
        {/* BARRA DE TÍTULO Y FILTRO (Visual por ahora) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-500/20">
              <Utensils size={28} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              Restaurantes
            </h2>
          </div>
        </div>

        {/* 🔄 LOADING STATE (Skeletons visuales) */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-[2rem] h-[400px] animate-pulse p-6">
                <div className="w-full h-48 bg-slate-200 rounded-[1.5rem] mb-4" />
                <div className="h-6 w-3/4 bg-slate-200 rounded-full mb-3" />
                <div className="h-4 w-1/2 bg-slate-100 rounded-full" />
              </div>
            ))}
          </div>
        )}

        {/* ⚠️ VACÍO */}
        {!loading && restaurants.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-[2.5rem] shadow-inner border-2 border-dashed border-slate-200"
          >
            <p className="text-slate-400 text-xl font-medium">No encontramos restaurantes activos en este momento.</p>
          </motion.div>
        )}

        {/* --- GRID DE RESTAURANTES --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                className="cursor-pointer group"
              >
                <Card className="h-full flex flex-col p-5 hover:shadow-2xl transition-all duration-300">
                  <Card.Image 
                    src={restaurant.image_url || "https://via.placeholder.com/300"} 
                    alt={restaurant.name}
                    badge={restaurant.category}
                  />

                  <div className="flex-grow space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold text-slate-950 group-hover:text-orange-600 transition-colors">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold">4.8</span>
                      </div>
                    </div>

                    <p className="text-slate-500 font-medium line-clamp-2 leading-relaxed">
                      {restaurant.description}
                    </p>

                    <div className="flex items-center gap-4 text-slate-400 text-sm font-semibold pb-2">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>20-30 min</span>
                      </div>
                      <div className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span>Envío Gratis</span>
                    </div>
                  </div>

                  <Button 
                    variant="primary" 
                    className="w-full mt-4 rounded-xl py-4 group-hover:shadow-orange-500/40"
                  >
                    Ver menú y pedir
                  </Button>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HomePage;