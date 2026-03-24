const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema({
usuario:String,
password:String
})

module.exports = mongoose.model("Admin", AdminSchema)