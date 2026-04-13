// Las rutas conectan cada URL con su función del controller.
// Como en app.js está registrado con app.use("/api", restaurantRoutes),
// todas las rutas aquí quedan bajo /api automáticamente.
const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantController');

// Lista todos los restaurantes

router.get('/restaurants', controller.listRestaurants);

// Detalle de un restaurante específico

router.get('/restaurants/:id', controller.getRestaurant);

// Menú de un restaurante específico

router.get('/restaurants/:id/menu', controller.getMenu);

module.exports = router;