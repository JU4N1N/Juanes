import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useParams } from "react-router-dom";

const OrderDetailPage = () => {
  const { id } = useParams();

  // Datos simulados (luego conectas backend)
  const order = {
    id,
    date: "10 Marzo 2026",
    status: "Entregado",
    total: 250,
    payment: "Tarjeta",
    address: "Av. Reforma 123, CDMX",
    items: [
      { name: "Hamburguesa clásica", qty: 2, price: 80 },
      { name: "Papas fritas", qty: 1, price: 50 },
      { name: "Refresco", qty: 1, price: 40 }
    ]
  };

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

      <div className="min-h-screen bg-[#f5efe6] p-10 space-y-6">

        {/* HEADER */}
        <Card
          title={`Pedido #${order.id}`}
          subtitle={`📅 ${order.date}`}
          status={mapStatus(order.status)}
        >
          <p className="text-gray-600">
            Estado actual del pedido
          </p>
        </Card>

        {/* PRODUCTOS */}
        <Card title="Productos">
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Cantidad: {item.qty}
                  </p>
                </div>

                <p className="text-[#f97316] font-semibold">
                  ${item.price * item.qty} MXN
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* DIRECCIÓN */}
        <Card title="Dirección de entrega">
          <p className="text-gray-700">{order.address}</p>
        </Card>

        {/* PAGO */}
        <Card title="Método de pago">
          <p className="text-gray-700">{order.payment}</p>
        </Card>

        {/* TOTAL */}
        <Card title="Resumen">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-[#f97316]">
              ${order.total} MXN
            </span>
          </div>
        </Card>

      </div>
    </>
  );
};

export default OrderDetailPage;