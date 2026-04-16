import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ShoppingCart, Plus, Info } from "lucide-react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import { getMenuByRestaurant } from "../services/restaurantService";
import { addToCart } from "../services/cartService";

function RestaurantPage() {
  const [addedId, setAddedId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenuByRestaurant(id);
        setProducts(data);
      } catch (error) {
        console.error("Error cargando menú:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [id]);

  const handleAddToCart = (product) => {
  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    restaurant_id: id
  });

  setAddedId(product.id);

  setTimeout(() => {
    setAddedId(null);
  }, 800);
};

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* --- HEADER DEL RESTAURANTE --- */}
      <div className="relative h-64 md:h-80 bg-slate-900 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-40 blur-sm"
            alt="Fondo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative h-full flex flex-col justify-end pb-8">
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-24 left-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <span className="bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Abierto ahora
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mt-2">
                Menú Seleccionado
              </h1>
            </div>
            
            <Button 
              variant="secondary"
              className="rounded-2xl"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart size={20} />
              Ver mi Carrito
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* 🔄 LOADING */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="h-40 bg-white rounded-3xl animate-pulse p-6 flex gap-4">
                <div className="w-24 h-24 bg-slate-100 rounded-2xl" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-slate-100 w-1/2 rounded-full" />
                  <div className="h-4 bg-slate-50 w-full rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ⚠️ VACÍO */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
            <Info className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 text-xl font-medium">Este restaurante no tiene platillos disponibles aún.</p>
          </div>
        )}

        {/* --- GRID DE PRODUCTOS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="flex flex-row p-4 gap-4 items-center group hover:border-orange-200 transition-colors">
                  {/* Miniatura de Producto (Placeholder) */}
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
                    <img 
                      src={`https://source.unsplash.com/200x200/?food,${product.name}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={product.name}
                      onError={(e) => e.target.src = "https://via.placeholder.com/200?text=Comida"}
                    />
                  </div>

                  <div className="flex flex-col flex-grow justify-between h-full py-1">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h2>
                      <p className="text-slate-500 text-sm font-medium line-clamp-2 mt-1 leading-snug">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <p className="text-2xl font-black text-slate-950">
                        ${product.price} <span className="text-xs text-slate-400 font-bold uppercase">MXN</span>
                      </p>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={addedId === product.id ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleAddToCart(product)}
                        className={`p-3 rounded-xl shadow-lg transition-all ${
                          addedId === product.id
                            ? "bg-green-500 shadow-green-500/30"
                            : "bg-orange-500 shadow-orange-500/30 hover:bg-orange-600"
                        }`}
                      >
                        <Plus size={20} strokeWidth={3} />
                      </motion.button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default RestaurantPage;