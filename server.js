require ("dotenv").config();
const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors")
const path = require("path")

const categorias = require("./routes/categorias")
const productos = require("./routes/productos")
const auth = require("./routes/auth")

const Admin = require("./models/Admin")

const app = express()

app.use(cors())
app.use(express.json())

// carpeta de imágenes
app.use("/imagenes", express.static(path.join(__dirname,"imagenes")))

// SERVIR FRONTEND
app.use(express.static(path.join(__dirname,"../frontend")))

// 🔥 CONEXIÓN A MONGODB (IMPORTANTE)

async function conectarDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error MongoDB:", error);
    process.exit(1);
  }
}

conectarDB();

// 🔥 RUTA PRINCIPAL (CLAVE)
app.get("/", (req, res) => {
  res.send("🚀 Backend licorera funcionando")
})

// 🔥 PUERTO CORRECTO PARA RENDER
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT)
})

// crear admin
async function crearAdmin(){
  const existe = await Admin.findOne({usuario:"admin"})

  if(!existe){
    await Admin.create({
      usuario:"admin",
      password:"1234"
    })
    console.log("✅ Admin creado")
  }else{
    console.log("⚡ Admin ya existe")
  }
}

crearAdmin()