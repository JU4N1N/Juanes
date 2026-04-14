const API_URL = "http://localhost:3000/api/restaurants";

// LISTA DE RESTAURANTES (lo usa Front 2)
export const getRestaurants = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener restaurantes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getRestaurants:", error);
    return [];
  }
};

//  DETALLE DE RESTAURANTE (lo usa Front 3)
export const getRestaurantById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Error al obtener restaurante");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getRestaurantById:", error);
    return null;
  }
};

// MENÚ DEL RESTAURANTE (lo usa Front 3)
export const getMenuByRestaurant = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/menu`);

    if (!response.ok) {
      throw new Error("Error al obtener menú");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getMenuByRestaurant:", error);
    return [];
  }
};