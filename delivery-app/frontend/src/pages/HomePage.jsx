import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { getRestaurants } from "../services/restaurantService";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await getRestaurants();
      console.log("Restaurants:", data);
      setRestaurants(data);
    };

    fetchRestaurants();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f5efe6] p-10 space-y-6">

        {/* TÍTULO */}
        <h1 className="text-3xl font-bold text-gray-900">
          Restaurantes disponibles
        </h1>

        {/* MENSAJE SI NO HAY DATOS */}
        {restaurants.length === 0 && (
          <p className="text-gray-500">
            No hay restaurantes disponibles
          </p>
        )}

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              className="cursor-pointer transform hover:scale-105 transition"
            >
              <Card
                title={restaurant.name}
                subtitle={restaurant.description}
              >
                {/* IMAGEN */}
                <img
                  src={
                    restaurant.image_url ||
                    "https://via.placeholder.com/300"
                  }
                  alt={restaurant.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />

                {/* CATEGORÍA */}
                <span className="inline-block text-xs bg-orange-100 text-[#f97316] px-3 py-1 rounded-full mb-2">
                  {restaurant.category}
                </span>

                {/* CTA */}
                <button className="mt-2 w-full bg-orange-500 text-white py-2 rounded-lg">
                  Ver menú
                </button>
              </Card>
            </div>
          ))}

        </div>

      </div>
    </>
  );
};

export default HomePage;