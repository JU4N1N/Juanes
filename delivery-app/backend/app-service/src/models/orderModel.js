// src/models/orderModel.js

const db = require("../config/db");

const createOrder = async ({ user_id, items, address }) => {
  try {
    // 1. Obtener IDs de productos
    const itemIds = items.map((item) => item.id);

    // 2. Traer info REAL desde DB
    const [products] = await db.query(
      `SELECT id, name, price FROM menu_items WHERE id IN (?)`,
      [itemIds]
    );

    // 3. Mapear productos por id (para acceso rápido)
    const productMap = {};
    products.forEach((p) => {
      productMap[p.id] = p;
    });

    // 4. Construir order_items + calcular total
    let total = 0;
    const orderItems = items.map((item) => {
      const product = productMap[item.id];

      if (!product) {
        throw new Error(`Producto con id ${item.id} no existe`);
      }

      const subtotal = product.price * item.quantity;
      total += subtotal;

      return {
        menu_item_id: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      };
    });

    // 5. Insertar en orders
    const [orderResult] = await db.query(
      `INSERT INTO orders (user_id, total_price, status, delivery_address)
       VALUES (?, ?, 'Pendiente', ?)`,
      [user_id, total, address]
    );

    const orderId = orderResult.insertId;

    // 6. Insertar order_items (snapshot)
    for (const item of orderItems) {
      await db.query(
        `INSERT INTO order_items 
        (order_id, menu_item_id, name, price, quantity)
        VALUES (?, ?, ?, ?, ?)`,
        [
          orderId,
          item.menu_item_id,
          item.name,
          item.price,
          item.quantity,
        ]
      );
    }

    // 7. Respuesta final
    return {
      id: orderId,
      total_price: total,
      status: "Pendiente",
    };
  } catch (error) {
    throw error;
  }
};

const getOrdersByUser = async (user_id) => {
  const [orders] = await db.query(
    `SELECT id, total_price, status, created_at
     FROM orders
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [user_id]
  );

  return orders;
};

const getOrderById = async (order_id) => {
  // 1. Pedido
  const [orders] = await db.query(
    `SELECT id, total_price, status, delivery_address, created_at
     FROM orders
     WHERE id = ?`,
    [order_id]
  );

  if (orders.length === 0) return null;

  const order = orders[0];

  // 2. Items
  const [items] = await db.query(
    `SELECT name, price, quantity
     FROM order_items
     WHERE order_id = ?`,
    [order_id]
  );

  // 3. Unir
  return {
    ...order,
    items,
  };
};

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById,
};