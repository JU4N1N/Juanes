// El controller recibe la petición HTTP, llama al model,
// y decide qué respuesta mandar de vuelta al frontend.
const Restaurant = require('../models/restaurantModel');

// El frontend llama esto para mostrar la lista de restaurantes en HomePage
async function listRestaurants(req, res) {
  try {
    const restaurants = await Restaurant.getAllRestaurants();
    res.json(restaurants); // responde con el arreglo de restaurantes
  } catch (err) {
    console.error(err);
    // Si algo falla en la DB, responde con error 500
    res.status(500).json({ error: 'Error al obtener restaurantes' });
  }
}

// El frontend llama esto cuando el usuario entra al detalle de un restaurante
async function getRestaurant(req, res) {
  try {
    // req.params.id contiene el ID que viene en la URL, ej: /api/restaurants/3
    const restaurant = await Restaurant.getRestaurantById(req.params.id);
    // Si el model devuelve undefined, el restaurante no existe
    if (!restaurant) return res.status(404).json({ error: 'Restaurante no encontrado' });
    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener restaurante' });
  }
}

// El frontend llama esto para mostrar los platillos dentro de un restaurante
async function getMenu(req, res) {
  try {
    // Igual que arriba, el :id viene de la URL
    const menu = await Restaurant.getMenuByRestaurantId(req.params.id);
    res.json(menu); // responde con el arreglo de platillos
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener menú' });
  }
}

module.exports = { listRestaurants, getRestaurant, getMenu };