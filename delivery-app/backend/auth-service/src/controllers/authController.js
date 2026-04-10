const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
require('dotenv').config();

const AuthController = {
    // Registro de usuario
    async register(req, res) {
        try {
            const { name, email, phone, password } = req.body;

            // Validaciones básicas
            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Nombre, email y contraseña son requeridos'
                });
            }

            // Verificar si el usuario ya existe
            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'El email ya está registrado'
                });
            }

            // Hashear contraseña
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Crear usuario
            const userId = await UserModel.create({
                name,
                email,
                phone: phone || null,
                password: hashedPassword
            });

            // Generar token JWT
            const token = jwt.sign(
                { id: userId, email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: {
                    token,
                    user: {
                        id: userId,
                        name,
                        email,
                        phone: phone || null
                    }
                }
            });
        } catch (error) {
            console.error('Error en register:', error);
            res.status(500).json({
                success: false,
                message: 'Error al registrar usuario'
            });
        }
    },

    // Login de usuario
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validaciones
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email y contraseña son requeridos'
                });
            }

            // Buscar usuario
            const user = await UserModel.findByEmail(email);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            // Verificar contraseña
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            // Generar token JWT
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            // No enviar el password en la respuesta
            const { password: _, ...userWithoutPassword } = user;

            res.json({
                success: true,
                message: 'Login exitoso',
                data: {
                    token,
                    user: userWithoutPassword
                }
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({
                success: false,
                message: 'Error al iniciar sesión'
            });
        }
    },

    // Obtener usuario actual (protegido)
    async getMe(req, res) {
        try {
            const userId = req.user.id;
            const user = await UserModel.findById(userId);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.json({
                success: true,
                data: { user }
            });
        } catch (error) {
            console.error('Error en getMe:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener usuario'
            });
        }
    }
};

module.exports = AuthController;