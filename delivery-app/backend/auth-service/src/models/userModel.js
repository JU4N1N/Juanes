import db from '../config/db.js';

const UserModel = {
    // Crear un nuevo usuario
    async create(userData) {
        const { name, email, phone, password } = userData;
        const [result] = await db.execute(
            `INSERT INTO users (name, email, phone, password, created_at, updated_at) 
             VALUES (?, ?, ?, ?, NOW(), NOW())`,
            [name, email, phone, password]
        );
        return result.insertId;
    },

    // Buscar usuario por email
    async findByEmail(email) {
        const [rows] = await db.execute(
            `SELECT id, name, email, phone, password, created_at, updated_at 
             FROM users WHERE email = ?`,
            [email]
        );
        return rows[0];
    },

    // Buscar usuario por ID
    async findById(id) {
        const [rows] = await db.execute(
            `SELECT id, name, email, phone, created_at, updated_at 
             FROM users WHERE id = ?`,
            [id]
        );
        return rows[0];
    }
};

export default UserModel;