const express = require("express")
const router = express.Router()

const Producto = require("../models/Producto")

const multer = require("multer")

// configuración de almacenamiento

const storage = multer.diskStorage({

destination: function(req,file,cb){

cb(null,"imagenes/")

},

filename: function(req,file,cb){

cb(null, Date.now() + "-" + file.originalname)

}

})

const upload = multer({storage:storage})


// crear producto con imagen

router.post("/", upload.single("imagen"), async(req,res)=>{

const nuevoProducto = new Producto({

nombre:req.body.nombre,
precio:req.body.precio,
categoria:req.body.categoria,
imagen: req.file ? req.file.filename : ""

})

await nuevoProducto.save()

res.json(nuevoProducto)

})


// obtener productos

router.get("/", async(req,res)=>{

const productos = await Producto.find()

res.json(productos)

})
router.delete("/:id", async (req,res)=>{

await Producto.findByIdAndDelete(req.params.id)

res.json({mensaje:"Producto eliminado"})

})
router.put("/:id", async (req, res) => {
  const { nombre, precio } = req.body;

  await Producto.findByIdAndUpdate(req.params.id, {
    nombre,
    precio
  });

  res.json({ mensaje: "Producto actualizado" });
});

module.exports = router
