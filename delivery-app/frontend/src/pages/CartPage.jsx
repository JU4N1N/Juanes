import { useEffect, useState } from "react";
import { getCart, saveCart } from "../services/cartService";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBasket, Trash2, ArrowRight, CreditCard, MapPin, ReceiptText } from "lucide-react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";

function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getCart();
    setCart(data);
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const total = cart.reduce((acc, item) => {
    return acc + item.price * (item.quantity || 1);
  }, 0);

  const handleCheckout = async () => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }

      if (cart.length === 0) return;

      const items = cart.map(item => ({
        id: item.id,
        quantity: item.quantity || 1
      }));

      const restaurant_id = cart[0]?.restaurant_id || 1;

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          restaurant_id,
          address: "Mi casa", 
          items
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      saveCart([]);
      setCart([]);
      navigate("/orders");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-6">
      <Navbar />

      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex items-center gap-4">
          <div className="bg-orange-500 p-3 rounded-2xl text-white shadow-lg shadow-orange-500/20">
            <ShoppingBasket size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Mi Carrito</h1>
            <p className="text-slate-500 font-medium">Revisa tus productos antes de finalizar.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* --- LISTA DE PRODUCTOS --- */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-white rounded-[2.5rem] p-16 text-center border border-slate-100 shadow-sm"
                >
                  <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBasket size={40} className="text-slate-300" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Tu carrito está vacío</h2>
                  <p className="text-slate-500 mb-8">¿Aún no sabes qué comer?</p>
                  <Link to="/home">
                    <Button variant="primary">Explorar restaurantes</Button>
                  </Link>
                </motion.div>
              ) : (
                cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="flex items-center p-4 gap-6 hover:border-orange-200 transition-colors">
                      <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 flex-shrink-0">
                        <ReceiptText size={32} />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-slate-500 font-bold">Cant: {item.quantity || 1}</p>
                          <div className="w-1 h-1 bg-slate-300 rounded-full" />
                          <p className="text-orange-600 font-black">${item.price} MXN</p>
                        </div>
                      </div>

                      <button 
                        className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        onClick={() => {
                          const newCart = cart.filter(c => c.id !== item.id);
                          setCart(newCart);
                          saveCart(newCart);
                        }}
                      >
                        <Trash2 size={20} />
                      </button>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* --- RESUMEN DE PAGO --- */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-32"
            >
              <Card className="p-8 space-y-6" hover={false}>
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <CreditCard size={24} className="text-orange-500" />
                  Resumen
                </h2>

                <div className="space-y-4 border-y border-slate-100 py-6">
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Subtotal</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Envío</span>
                    <span className="text-green-600 font-bold">Gratis</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-400 text-xs bg-slate-50 p-3 rounded-xl">
                    <MapPin size={14} className="mt-0.5" />
                    <p>Entrega en: <span className="text-slate-700 font-bold">C.U., Ciudad de México</span></p>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <span className="text-slate-900 font-bold">Total a pagar</span>
                  <span className="text-3xl font-black text-slate-950">${total} <small className="text-xs uppercase">mxn</small></span>
                </div>

                <Button 
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full py-5 rounded-2xl text-xl"
                  variant="secondary"
                >
                  Finalizar Pedido
                  <ArrowRight size={20} />
                </Button>

                <p className="text-center text-xs text-slate-400 font-medium">
                  Al finalizar, aceptas los términos de servicio de AH Studio.
                </p>
              </Card>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CartPage;