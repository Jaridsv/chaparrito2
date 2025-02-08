const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); // Cargar variables de entorno

const app = express();
app.use(express.json());
app.use(cors()); // Permitir solicitudes desde otros dominios

// 🔹 Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// 🔹 Conexión a MySQL con variables de entorno
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "", 
    database: process.env.DB_NAME || "chaparrito"
});

db.connect(err => {
    if (err) {
        console.error("❌ Error de conexión a MySQL:", err);
        process.exit(1); // Termina el proceso si hay error
    } else {
        console.log("✅ Conectado a MySQL");
    }
});

// 🔹 Guardar la respuesta en la base de datos
app.post("/respuesta", (req, res) => {
    const { respuesta } = req.body;

    if (!respuesta) {
        return res.status(400).json({ success: false, error: "Falta la respuesta" });
    }

    db.query("INSERT INTO respuestas (respuesta) VALUES (?)", [respuesta], (err, result) => {
        if (err) {
            console.error("❌ Error al guardar en la BD:", err);
            return res.status(500).json({ success: false, error: "Error en la base de datos" });
        }
        res.json({ success: true, message: "✅ Respuesta guardada" });
    });
});

// 🔹 Servir el archivo HTML correctamente
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔹 Cerrar conexión a la base de datos al apagar el servidor
process.on("SIGINT", () => {
    db.end();
    console.log("🔴 Conexión a MySQL cerrada.");
    process.exit(0);
});

// 🔹 Configurar el puerto dinámicamente para despliegue
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
