const express = require("express")
const Router = express.Router()
const [checkLogin]= require("../models/loginModel")
const {getAllstatusData} = require("../models/orderstatusModel")

Router.get("/StatusOrder", async (req,res)=>{
    const check = await checkLogin(req)
    if(check){
        const usname = req.session.usname
        res.render("./page/orderStatus", {usname})
    }else{
        res.redirect("/admin/login")
    }
})

Router.get("/StatusOrder/getStatus", async (req, res)=>{
    const check = await checkLogin(req)
    if(check){
        try{
            const data = await getAllstatusData()
            res.json({"error" : false, "status" : data})
        }catch(error){
            res.json({"error" : true})
        }
    }else{
        res.redirect("/admin/login")
    }
})

module.exports = Router