const express = require("express");
const router = express.Router();

const Producto = require("../models/Producto");
const upload = require("../middlewares/upload");
const cloudinary = require("../config/cloudinary");

// ✅ CREAR PRODUCTO
router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, precio, categoria } = req.body;

    // VALIDACIÓN
    if (!nombre || !precio || !categoria) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "NO LLEGA IMAGEN" });
    }

    // 🔥 SUBIR A CLOUDINARY
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "licorera"
      }
    );

    // GUARDAR EN MONGO
    const nuevoProducto = new Producto({
      nombre,
      precio,
      categoria,
      imagen: result.secure_url
    });

    await nuevoProducto.save();

    res.json({ mensaje: "Producto creado", producto: nuevoProducto });

  } catch (error) {
    console.log("❌ ERROR CREANDO PRODUCTO:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ OBTENER PRODUCTOS
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// ✅ ELIMINAR PRODUCTO
router.delete("/:id", async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

// ✅ ACTUALIZAR PRODUCTO
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
    console.log("❌ ERROR ACTUALIZANDO:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;