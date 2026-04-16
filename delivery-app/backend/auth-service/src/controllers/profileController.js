// profileController.js
import db from '../config/db.js';

const getProfile = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email FROM users WHERE id = ?', [req.user.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAddresses = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM addresses WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createAddress = async (req, res) => {
  try {
    const { address_line, city, reference } = req.body;
    await db.query(
      'INSERT INTO addresses (user_id, address_line, city, reference) VALUES (?, ?, ?, ?)',
      [req.user.id, address_line, city, reference]
    );
    res.json({ message: 'Dirección creada' });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateAddress = async (req, res) => {
  try {
    const { address_line, city, reference } = req.body;
    await db.query(
      'UPDATE addresses SET address_line = ?, city = ?, reference = ? WHERE id = ? AND user_id = ?',
      [address_line, city, reference, req.params.id, req.user.id]
    );
    res.json({ message: 'Dirección actualizada' });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, req.user.id]);
    res.json({ message: 'Perfil actualizado' });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteAddress = async (req, res) => {
  try {
    await db.query(
      'DELETE FROM addresses WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    res.json({ message: 'Dirección eliminada' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default { getProfile, updateProfile, getAddresses, createAddress, updateAddress, deleteAddress };