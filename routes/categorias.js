const express = require("express")
const router = express.Router()

const Categoria = require("../models/Categoria")

// OBTENER TODAS LAS CATEGORÍAS
router.get("/", async (req,res)=>{

try{

const categorias = await Categoria.find()

res.json(categorias)

}catch(error){

res.status(500).json({error:"Error obteniendo categorias"})

}

})


// CREAR CATEGORÍA
router.post("/", async (req,res)=>{

try{

const nuevaCategoria = new Categoria({
nombre:req.body.nombre
})

await nuevaCategoria.save()

res.json(nuevaCategoria)

}catch(error){

res.status(500).json({error:"Error creando categoria"})

}

})


// 🔥 ELIMINAR CATEGORÍA
router.delete("/:id", async (req,res)=>{

try{

await Categoria.findByIdAndDelete(req.params.id)

res.json({mensaje:"Categoria eliminada"})

}catch(error){

res.status(500).json({error:"Error eliminando categoria"})

}

})

module.exports = router