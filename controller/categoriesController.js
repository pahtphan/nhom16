const express = require("express")
const Router = express.Router()
const [checkLogin]= require("../models/loginModel")
const {getAllCate, deleteCate,CreateCate, getCateId, updateCate} = require("../models/categoriesModel")

Router.get("/Categories", async (req,res)=>{
    const check = checkLogin(req)
    if(check){
        const usname = req.session.usname
        res.render("./page/listCate", {usname})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/Categories/getAllCate", async (req,res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            const cateData = await getAllCate()
            res.json({"status" : true, "cateData" : cateData})
        }catch(error){
            console.log(error)
            res.json({"status" : false})
        }
    }else{
        res.redirect("/admin/login")
    }
})

Router.delete("/Categories/delCate", async (req,res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            const id_cate = req.query.id_cate
            const stat = await deleteCate(id_cate)
            console.log(stat)
            res.json({"status" : true})
        }catch(error){
            console.log(error)
            res.json({"status" : false})
        }
    }else{
        res.redirect("/admin/login")
    }
})

Router.get("/Categories/addCate",async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        const usname = req.session.usname
        res.render("./page/addCate", {usname})
    }else{
        res.redirect("/admin/login")
    }
})

Router.post("/Categorise/addCate/CreateNewCate", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            const nameCate = req.body.name
            await CreateCate(nameCate)
            res.json({"status" : true})
        }catch(err){
            console.log(err)
            res.json({"status" : false})
        }
    }else{
        res.redirect("/admin/login")
    }
})

Router.delete("/Categories/delCateChoose", async (req,res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            const id_cate = req.body.cateList
            await deleteCate(id_cate)
            res.json({"status" : true})
        }catch(error){
            console.log(error)
            res.json({"status" : false})
        }
    }else{
        res.redirect("/admin/login")
    }
})

Router.get("/Categorise/GetCate", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            const idCate = req.query.id_cate
            const usname = req.session.usname
            const data = await getCateId(idCate)
            res.render("./page/editCate", {data, usname})
        }catch(error){
            console.log(error)
            res.json({"status" : false})
        }
    }else{
        res.redirect("/admin/login")
    }
})

Router.put("/Categorise/UpdateCate", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            const idCate = req.body.id_cate
            const cateName = req.body.nameCate
            await updateCate(idCate, cateName)
            res.json({"status" : true})
        }catch(error){
            console.log(error)
            res.json({"status" : false})
        }
    }else{
        res.redirect("/admin/login")
    }
})



module.exports = Router