const express = require("express")
const router = express.Router()

const Producto = require("../models/Producto")

const upload = require("../middlewares/upload")
const cloudinary = require("../config/cloudinary")




// crear producto con imagen

router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, precio, categoria } = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "licorera"
        }
      );

      imageUrl = result.secure_url;
    }

    const nuevoProducto = new Producto({
      nombre,
      precio,
      categoria,
      imagen: imageUrl
    });

    await nuevoProducto.save();

    res.json(nuevoProducto);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear producto" });
  }
});


// obtener productos

router.get("/", async(req,res)=>{

const productos = await Producto.find()

res.json(productos)

})
router.delete("/:id", async (req,res)=>{

await Producto.findByIdAndDelete(req.params.id)

res.json({mensaje:"Producto eliminado"})

})
router.put("/:id", upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, precio, categoria } = req.body;

    let updateData = {
      nombre,
      precio,
      categoria
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "licorera"
        }
      );

      updateData.imagen = result.secure_url;
    }

    await Producto.findByIdAndUpdate(req.params.id, updateData);

    res.json({ mensaje: "Producto actualizado" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});
module.exports = router
