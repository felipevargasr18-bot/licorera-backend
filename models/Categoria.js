const mongoose = require("mongoose")

const CategoriaSchema = new mongoose.Schema({

nombre:String

})

module.exports = mongoose.model("Categoria",CategoriaSchema)