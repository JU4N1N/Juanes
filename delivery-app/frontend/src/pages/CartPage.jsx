import { useEffect, useState } from "react";
import { getCart, saveCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getCart();
    setCart(data);
  }, []);

  // 🧠 calcular total
  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  // 🧨 crear pedido
  const handleCheckout = async () => {
    try {
      const items = cart.map(item => ({
        id: item.id,
        quantity: item.quantity
      }));

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: 1, // luego lo sacas de auth
          restaurant_id: 1, // luego dinámico
          address: "Mi casa",
          items
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      alert("Pedido creado con éxito 🎉");

      // 🧹 limpiar carrito
      saveCart([]);
      setCart([]);

      navigate("/orders");

    } catch (error) {
      console.error(error);
      alert("Error al crear pedido");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Carrito</h1>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="border p-3 mb-2 rounded">
              <h3>{item.name}</h3>
              <p>Precio: ${item.price}</p>
              <p>Cantidad: {item.quantity}</p>
            </div>
          ))}

          {/* 💰 TOTAL */}
          <div className="mt-4 font-bold text-lg">
            Total: ${total} MXN
          </div>

          {/* 🧾 BOTÓN CHECKOUT */}
          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Finalizar pedido
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;