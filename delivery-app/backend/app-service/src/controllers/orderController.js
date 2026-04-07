// src/controllers/orderController.js

const orderModel = require("../models/orderModel");

// Crear pedido
const createOrder = async (req, res) => {
  try {
    const { user_id, items, address } = req.body;

    // Validaciones básicas
    if (!user_id || !items || items.length === 0 || !address) {
      return res.status(400).json({
        message: "Datos incompletos",
      });
    }

    // Llamar al modelo
    const order = await orderModel.createOrder({
      user_id,
      items,
      address,
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error("Error al crear pedido:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// Obtener pedidos de un usuario
const getOrders = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({
        message: "user_id es requerido",
      });
    }

    const orders = await orderModel.getOrdersByUser(user_id);

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// Obtener detalle de un pedido
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderModel.getOrderById(id);

    if (!order) {
      return res.status(404).json({
        message: "Pedido no encontrado",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error al obtener pedido:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};