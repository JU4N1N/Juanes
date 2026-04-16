import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Package, 
  MapPin, 
  Receipt, 
  Clock, 
  CheckCircle2, 
  Bike, 
  Store 
} from "lucide-react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setOrder(data);
      } catch (error) {
        console.error("Error cargando pedido:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  // Configuración del Stepper de seguimiento
  const steps = [
    { label: "Confirmado", status: "Pendiente", icon: Store },
    { label: "Preparando", status: "Preparando", icon: Clock },
    { label: "En camino", status: "En camino", icon: Bike },
    { label: "Entregado", status: "Entregado", icon: CheckCircle2 },
  ];

  const getCurrentStep = (status) => {
    if (status === "Cancelado") return -1;
    const index = steps.findIndex(s => s.status === status);
    return index !== -1 ? index : 0;
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!order) return <div className="p-10 text-center font-bold">Pedido no encontrado</div>;

  const currentStep = getCurrentStep(order.status);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-32 pb-12 px-6 space-y-8">
        
        {/* ENCABEZADO Y BOTÓN VOLVER */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold transition-colors"
          >
            <ChevronLeft size={20} />
            Volver a mis pedidos
          </button>
          <span className="text-sm font-black text-slate-300 uppercase tracking-widest"></span>
        </div>

        {/* --- TRACKER DE ESTADO (Timeline) --- */}
        <Card className="p-10" hover={false}>
          <div className="flex justify-between items-center relative">
            {/* Línea de progreso de fondo */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0" />
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStep;
              const isCurrent = index === currentStep;

              return (
                <div key={index} className="relative z-10 flex flex-col items-center gap-3">
                  <motion.div 
                    initial={false}
                    animate={{ 
                      scale: isCurrent ? 1.2 : 1,
                      backgroundColor: isCompleted ? "#f97316" : "#f1f5f9",
                      color: isCompleted ? "#ffffff" : "#94a3b8"
                    }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Icon size={22} strokeWidth={isCurrent ? 3 : 2} />
                  </motion.div>
                  <span className={`text-xs font-black uppercase tracking-tighter ${isCompleted ? "text-slate-900" : "text-slate-400"}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
          
          {order.status === "Cancelado" && (
            <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-center font-bold">
              Este pedido fue cancelado.
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* DETALLES DE PRODUCTOS (Resumen) */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-8" hover={false}>
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                <Receipt className="text-orange-500" />
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Resumen del Pedido</h2>
              </div>

              <div className="space-y-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start group">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center font-black text-orange-600 border border-slate-100">
                        {item.quantity}x
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-400 font-medium italic">Precio unitario: ${item.price}</p>
                      </div>
                    </div>
                    <p className="font-black text-slate-900">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t-2 border-dashed border-slate-100 flex justify-between items-end">
                <div>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest">Total Pagado</p>
                  <p className="text-slate-500 text-xs font-medium italic">Incluye impuestos y envío gratis</p>
                </div>
                <p className="text-4xl font-black text-slate-950 tracking-tighter">
                  ${order.total_price} <span className="text-sm font-bold text-orange-500 uppercase">mxn</span>
                </p>
              </div>
            </Card>
          </div>

          {/* DIRECCIÓN Y AYUDA */}
          <div className="md:col-span-1 space-y-6">
            <Card className="p-6 bg-slate-900 text-white border-none" hover={false}>
              <div className="flex items-center gap-2 mb-4 text-orange-400">
                <MapPin size={18} />
                <h3 className="font-black uppercase text-xs tracking-widest">Entrega en</h3>
              </div>
              <p className="text-lg font-bold leading-tight">
                {order.delivery_address || "Dirección no especificada"}
              </p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Si hay algún problema con tu entrega, contacta a soporte técnico de Juanes Delivery.
                </p>
              </div>
            </Card>

            <Button variant="outline" className="w-full py-4 border-slate-200 text-slate-600 hover:bg-slate-100">
              ¿Necesitas ayuda?
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailPage;