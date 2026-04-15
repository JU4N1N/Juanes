const express = require("express");
const cors = require("cors");
require("dotenv").config(); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas 
const orderRoutes = require("./routes/orderRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const profileRoutes = require("./routes/profileRoutes"); 

// Usar rutas 
app.use("/api", orderRoutes);
app.use("/api", restaurantRoutes);
app.use("/api", profileRoutes); 

// Ruta base
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Puerto 
const PORT = process.env.PORT || 3000;

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});