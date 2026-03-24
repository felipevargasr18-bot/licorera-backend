const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")

const categorias = require("./routes/categorias")
const productos = require("./routes/productos")

const app = express()

app.use(cors())
app.use(express.json())

// carpeta de imágenes
app.use("/imagenes", express.static(path.join(__dirname,"imagenes")))

// SERVIR FRONTEND COMPLETO
app.use(express.static(path.join(__dirname,"../frontend")))

mongoose.connect("mongodb://127.0.0.1/licorera")

app.use("/categorias", categorias)
app.use("/productos", productos)

app.listen(3000, '0.0.0.0', () => {
  console.log("Servidor corriendo")
})

const auth = require("./routes/auth")

app.use("/auth", auth)

const Admin = require("./models/Admin")

async function crearAdmin(){

const existe = await Admin.findOne({usuario:"admin"})

if(!existe){

await Admin.create({
usuario:"",
password:""
})

console.log("✅ Admin creado")

}else{
console.log("⚡ Admin ya existe")
}

}

crearAdmin()