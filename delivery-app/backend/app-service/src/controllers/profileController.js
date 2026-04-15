const db = require('../config/db');


// Obtener perfil
exports.getProfile = (req, res) => {
  const userId = req.user.id;

  db.query(
    'SELECT id, name, email FROM users WHERE id = ?',
    [userId],
    (err, results) => {
      if (err) return res.status(500).json(err);

      res.json(results[0]);
    }
  );
};

// Actualizar perfil
exports.updateProfile = (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  db.query(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, userId],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: 'Perfil actualizado' });
    }
  );
};


// Obtener direcciones
exports.getAddresses = (req, res) => {
  const userId = req.user.id;

  db.query(
    'SELECT * FROM addresses WHERE user_id = ?',
    [userId],
    (err, results) => {
      if (err) return res.status(500).json(err);

      res.json(results);
    }
  );
};

// Crear dirección
exports.createAddress = (req, res) => {
  const userId = req.user.id;
  const { street, city, zip } = req.body;

  db.query(
    'INSERT INTO addresses (user_id, street, city, zip) VALUES (?, ?, ?, ?)',
    [userId, street, city, zip],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: 'Dirección creada' });
    }
  );
};

// Actualizar dirección
exports.updateAddress = (req, res) => {
  const userId = req.user.id;
  const addressId = req.params.id;
  const { street, city, zip } = req.body;

  db.query(
    'UPDATE addresses SET street = ?, city = ?, zip = ? WHERE id = ? AND user_id = ?',
    [street, city, zip, addressId, userId],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: 'Dirección actualizada' });
    }
  );
};

// Eliminar dirección
exports.deleteAddress = (req, res) => {
  const userId = req.user.id;
  const addressId = req.params.id;

  db.query(
    'DELETE FROM addresses WHERE id = ? AND user_id = ?',
    [addressId, userId],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: 'Dirección eliminada' });
    }
  );
};