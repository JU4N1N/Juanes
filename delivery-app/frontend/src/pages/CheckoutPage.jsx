import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, saveCart } from "../services/cartService";
import { getAddresses } from "../services/profileService";

function CheckoutPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 cargar datos
  useEffect(() => {
    const loadData = async () => {
      const cartData = getCart();
      setCart(cartData);

      const addrData = await getAddresses();
      setAddresses(addrData);
    };

    loadData();
  }, []);

  // 🧠 total
  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  // 🧾 confirmar pedido
  const handleCheckout = async () => {
    try {
      if (!user) {
        alert("Debes iniciar sesión");
        navigate("/login");
        return;
      }

      if (!selectedAddress) {
        alert("Selecciona una dirección");
        return;
      }

      const items = cart.map(item => ({
        id: item.id,
        quantity: item.quantity
      }));

      const restaurant_id = cart[0]?.restaurant_id;

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user.id,
          restaurant_id,
          address: selectedAddress.address_line,
          items
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      alert("Pedido realizado 🎉");

      saveCart([]);
      navigate("/orders");

    } catch (error) {
      console.error(error);
      alert("Error al procesar pedido");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Confirmar pedido
      </h1>

      {/* 📍 DIRECCIONES */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Selecciona dirección</h2>

        {addresses.map(addr => (
          <div
            key={addr.id}
            onClick={() => setSelectedAddress(addr)}
            className={`p-3 border rounded mb-2 cursor-pointer ${
              selectedAddress?.id === addr.id
                ? "border-orange-500 bg-orange-50"
                : ""
            }`}
          >
            <p>{addr.address_line}</p>
            <p className="text-sm text-gray-500">{addr.city}</p>
          </div>
        ))}
      </div>

      {/* 🛒 RESUMEN */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Resumen</h2>

        {cart.map(item => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name} x{item.quantity}</span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}

        <div className="mt-2 font-bold">
          Total: ${total} MXN
        </div>
      </div>

      {/* 🔥 BOTÓN */}
      <button
        onClick={handleCheckout}
        className="bg-green-500 text-white px-6 py-2 rounded"
      >
        Confirmar pedido
      </button>

    </div>
  );
}

export default CheckoutPage;