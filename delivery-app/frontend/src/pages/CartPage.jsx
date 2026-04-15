import { useEffect, useState } from "react";
import { getCart } from "../services/cartService";

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = getCart();
    setCart(data);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Carrito</h1>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className="border p-3 mb-2 rounded">
            <h3>{item.name}</h3>
            <p>Precio: ${item.price}</p>
            <p>Cantidad: {item.quantity}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CartPage;