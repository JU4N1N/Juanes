import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'auth-service' });
});

app.listen(PORT, () => {
    console.log(`🔐 Auth service running on port ${PORT}`);
});