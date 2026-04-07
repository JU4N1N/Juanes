const express = require("express");
const router = express.Router();

// Importar controller
const {
  createOrder,
  getOrders,
  getOrderById,
} = require("../controllers/orderController");

// Crear pedido
router.post("/orders", createOrder);

// Obtener historial de pedidos
router.get("/orders", getOrders);

// Obtener detalle de pedido
router.get("/orders/:id", getOrderById);

module.exports = router;