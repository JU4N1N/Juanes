import { addToCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";

function RestaurantPage() {
  const products = [
    { id: 1, name: "Pizza", price: 140, description: "Pizza clásica con queso" },
    { id: 2, name: "Hamburguesa", price: 80, description: "Hamburguesa sencilla" },
    { id: 3, name: "Tacos", price: 60, description: "Orden de tacos" },
    { id: 4, name: "Refresco", price: 20, description: "Bebida fría" }
  ];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f1eb] p-6">

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
         Menú del Restaurante
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {products.map(product => (
          <div 
            key={product.id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {product.description}
              </p>

              <p className="text-orange-500 font-bold mt-3 text-lg">
                ${product.price} MXN
              </p>
            </div>

            <button
              onClick={() => {
                addToCart(product);
                alert("Producto agregado al carrito");
              }}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl transition"
            >
              Agregar al carrito
            </button>
            
          </div>
        ))}

      </div>
      <button
              onClick={() => navigate("/cart")}
                  className="mb-4 bg-orange-500 text-white px-4 py-2 rounded"
            >
              Ir al carrito 
            </button>
    </div>
  );
}

export default RestaurantPage;