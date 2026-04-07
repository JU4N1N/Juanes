import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { ClipboardList } from "lucide-react";

const OrdersPage = () => {

  const orders = [
    {
      id: 1,
      date: "10 Marzo 2026",
      total: 250,
      status: "Entregado"
    },
    {
      id: 2,
      date: "15 Marzo 2026",
      total: 180,
      status: "En camino"
    },
    {
      id: 3,
      date: "20 Marzo 2026",
      total: 320,
      status: "Cancelado"
    }
  ];

  // Convertir estado a estilo del Card
  const mapStatus = (status) => {
    switch (status) {
      case "Entregado":
        return "success";
      case "En camino":
        return "warning";
      case "Cancelado":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f5efe6] p-10">

        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <ClipboardList />
          Historial de pedidos
        </h1>

        {/* Grid de Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {orders.map((order) => (
            <Card
              key={order.id}
              title={`Pedido #${order.id}`}
              subtitle={`📅 ${order.date}`}
              status={mapStatus(order.status)}
              footer={
                <Link
                  to={`/orders/${order.id}`}
                  className="block text-center bg-[#f97316] text-white py-2 rounded-xl hover:bg-[#ea580c] transition"
                >
                  Ver detalle
                </Link>
              }
            >
              <p className="font-semibold text-[#f97316]">
                Total: ${order.total} MXN
              </p>
            </Card>
          ))}

        </div>

      </div>
    </>
  );
};

export default OrdersPage;