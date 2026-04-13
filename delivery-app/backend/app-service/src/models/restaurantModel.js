// El model es el único archivo que habla directamente con la base de datos.
// Cada función hace una consulta SQL y devuelve el resultado al controller.
const db = require('../config/db'); // conexión a la base de datos hecha por Back 4

// Trae todos los restaurantes de la tabla restaurants
async function getAllRestaurants() {
  const [rows] = await db.query('SELECT * FROM restaurants');
  // MySQL2 devuelve un arreglo de dos elementos: [filas, metadata]
  // con el destructuring [rows] nos quedamos solo con las filas
  return rows;
}

// Trae un solo restaurante buscándolo por su ID
async function getRestaurantById(id) {
  const [rows] = await db.query('SELECT * FROM restaurants WHERE id = ?', [id]);
  return rows[0]; // [0] porque solo esperamos un resultado, no un arreglo
}

// Trae los platillos del menú de un restaurante específico
async function getMenuByRestaurantId(id) {
  const [rows] = await db.query(
    // Solo devuelve items donde available = true (platillos activos)
    // restaurant_id es la columna que relaciona menu_items con restaurants
    'SELECT * FROM menu_items WHERE restaurant_id = ? AND available = true',
    [id]
  );
  return rows;
}

module.exports = { getAllRestaurants, getRestaurantById, getMenuByRestaurantId };