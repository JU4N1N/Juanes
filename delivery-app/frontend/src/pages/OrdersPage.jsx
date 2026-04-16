import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Calendar, ChevronRight, PackageCheck, Clock, XCircle, Truck } from "lucide-react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user) return;
        const response = await fetch(`/api/orders?user_id=${user.id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setOrders(data);
      } catch (error) {
        console.error("Error cargando pedidos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Mapeo estético de estados con iconos y colores
  const getStatusConfig = (status) => {
    switch (status) {
      case "Pendiente":
        return { color: "bg-amber-100 text-amber-700", icon: Clock, label: "Pendiente" };
      case "En camino":
        return { color: "bg-blue-100 text-blue-700", icon: Truck, label: "En camino" };
      case "Entregado":
        return { color: "bg-emerald-100 text-emerald-700", icon: PackageCheck, label: "Entregado" };
      case "Cancelado":
        return { color: "bg-red-100 text-red-700", icon: XCircle, label: "Cancelado" };
      default:
        return { color: "bg-slate-100 text-slate-700", icon: Clock, label: status };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-6">
      <Navbar />

      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-lg">
              <ClipboardList size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Mis Pedidos</h1>
              <p className="text-slate-500 font-medium">Rastrea y revisa tus compras anteriores.</p>
            </div>
          </div>
        </header>

        {/* 🔄 LOADING */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-56 bg-white rounded-[2rem] animate-pulse p-6 space-y-4">
                <div className="h-6 w-1/3 bg-slate-100 rounded-full" />
                <div className="h-10 w-full bg-slate-50 rounded-xl" />
                <div className="h-12 w-full bg-slate-100 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* ⚠️ SIN PEDIDOS */}
        {!loading && orders.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm"
          >
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <ClipboardList size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">¿Tienes hambre?</h2>
            <p className="text-slate-500 mb-8">Aún no has realizado ningún pedido.</p>
            <Link to="/home">
              <Button variant="primary">Empezar a comprar</Button>
            </Link>
          </motion.div>
        )}

        {/* GRID DE PEDIDOS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {orders.map((order, index) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 flex flex-col justify-between h-full border-b-4 border-b-slate-100 hover:border-b-orange-500 transition-all duration-300">
                    <div className="space-y-4">
                      {/* Badge de Estado */}
                      <div className="flex justify-between items-start">
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${statusConfig.color}`}>
                          <StatusIcon size={14} />
                          {statusConfig.label}
                        </div>
                        <span className="text-slate-400 text-xs font-bold">#{order.id}</span>
                      </div>

                      {/* Info Principal */}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Pedido de Juanes</h3>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mt-1 font-medium">
                          <Calendar size={14} />
                          {new Date(order.created_at).toLocaleDateString('es-MX', { 
                            day: 'numeric', month: 'long', year: 'numeric' 
                          })}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-50">
                        <p className="text-xs text-slate-400 font-bold uppercase mb-1">Total Pagado</p>
                        <p className="text-2xl font-black text-slate-950">
                          ${order.total_price} <span className="text-sm font-bold text-orange-500">MXN</span>
                        </p>
                      </div>
                    </div>

                    <Link to={`/orders/${order.id}`} className="mt-6">
                      <Button variant="outline" className="w-full group rounded-xl py-3 border-slate-100 bg-slate-50">
                        Detalles del pedido
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;