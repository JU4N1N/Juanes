import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuByRestaurant } from "../services/restaurantService";
import { addToCart } from "../services/cartService";

function RestaurantPage() {
  const { id } = useParams(); // id del restaurante
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const data = await getMenuByRestaurant(id);
      setProducts(data);
    };

    fetchMenu();
  }, [id]);

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
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price
                });
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
        className="mt-6 bg-orange-500 text-white px-4 py-2 rounded"
      >
        Ir al carrito
      </button>

    </div>
  );
}

export default RestaurantPage;