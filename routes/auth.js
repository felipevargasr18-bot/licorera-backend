const express = require("express")
const router = express.Router()

const Admin = require("../models/Admin")

router.post("/login", async (req,res)=>{

const {usuario, password} = req.body

try{

const admin = await Admin.findOne({usuario})

if(!admin){
return res.status(401).json({success:false})
}

if(admin.password !== password){
return res.status(401).json({success:false})
}

res.json({success:true})

}catch(error){

res.status(500).json({success:false})

}

})

module.exports = router