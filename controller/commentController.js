const express = require("express")
const Router = express.Router()
const [checkLogin]= require("../models/loginModel")
const {getAllComment} = require("../models/commentModel")

Router.get("/Comments", (req, res)=>{
    const check = checkLogin(req)
    if(check){
        const usname = req.session.usname
        res.render("./page/listComment", {usname})
    }else{
        res.redirect("/admin/login")
    } 
})


Router.get("/Comments/getAllComments", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            const data = await getAllComment()
            res.json({"error" : false, dataCom : data})
        }catch(error){
            res.json({"error" : true})
        }
    }else{
        res.redirect("/admin/login")
    } 
})

module.exports = Router