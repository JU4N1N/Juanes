import { useEffect, useState } from "react";
import { getCart, saveCart } from "../services/cartService";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBasket, Trash2, ArrowRight, CreditCard, MapPin, ReceiptText, ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import { getAddresses } from "../services/profileService";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getCart();
    setCart(data);

    const loadAddresses = async () => {
      try {
        const addrData = await getAddresses();
        setAddresses(addrData);
        if (addrData.length > 0) {
          setSelectedAddress(addrData[0]);
        }
      } catch (error) {
        console.error("Error cargando direcciones:", error);
      }
    };
    loadAddresses();
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
      if (!selectedAddress) {
        alert("Por favor selecciona una dirección de envío");
        return;
      }
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
          address: selectedAddress.address_line,
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
      alert("Error al procesar el pedido");
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
                  
                  {/* --- SELECT DE DIRECCIÓN MEJORADO --- */}
                  {addresses.length > 0 && (
                    <div className="relative group">
                      <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1.5 ml-1 block">
                        Dirección de Entrega
                      </label>
                      <div className="relative flex items-center">
                        <select
                          className="w-full appearance-none bg-white border-2 border-slate-100 text-sm font-bold text-slate-700 py-3.5 pl-4 pr-10 rounded-2xl cursor-pointer focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                          value={selectedAddress?.id || ""}
                          onChange={(e) => {
                            const addr = addresses.find(a => a.id === parseInt(e.target.value));
                            setSelectedAddress(addr);
                          }}
                        >
                          {addresses.map(addr => (
                            <option key={addr.id} value={addr.id}>
                              {addr.address_line}, {addr.city}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 pointer-events-none text-slate-400 group-focus-within:text-orange-500 transition-colors">
                          <ChevronDown size={18} strokeWidth={3} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3 text-slate-500 text-xs bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50">
                    <div className="bg-orange-500 p-1.5 rounded-lg text-white">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-400">Entregar ahora en:</p>
                      <p className="text-slate-900 font-bold text-[13px] leading-tight mt-0.5">
                        {selectedAddress ? `${selectedAddress.address_line}, ${selectedAddress.city}` : "Cargando dirección..."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <span className="text-slate-900 font-bold">Total a pagar</span>
                  <span className="text-3xl font-black text-slate-950">${total} <small className="text-xs uppercase font-bold text-slate-400">mxn</small></span>
                </div>

                <Button 
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full py-5 rounded-2xl text-xl shadow-xl shadow-orange-500/20"
                  variant="secondary"
                >
                  Finalizar Pedido
                  <ArrowRight size={20} />
                </Button>

                <p className="text-center text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                  Pago seguro procesado por AH Studio.
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