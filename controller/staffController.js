const express = require("express")
const Router = express.Router()
const [checkLogin]= require("../models/loginModel")
const [getAllStaff , getStaffById, DeleteStaff, TransferOrder, NewStaff, EditStaff] = require("../models/staffModel")
const {getRole} = require("../models/roleModel")

Router.get("/Staff",(req,res)=>{
    const check = checkLogin(req)
    if(check){
        const usname = req.session.usname
        res.render("./page/listStaff", {usname})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/Staff/GetAllStaff", async (req,res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            const dataStaff = await getAllStaff();
            res.json({"error" : false, "staff" : dataStaff})
        }catch(err){
            res.json({"error" : true})
        }
    }else{
        res.redirect("/admin/login")
    } 
})

Router.delete("/Staff/DeleteStaff", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            const idStaff = req.query.staffid
            console.log(idStaff)
            const dataStaff = await DeleteStaff(idStaff);
            console.log(dataStaff.dataOrder)
            if(dataStaff.error){
                console.log("true")
                res.json({"error" : 2, "dataOrder" : dataStaff.dataOrder, "staffdata" : dataStaff.staffdata, "idstaff" : idStaff})
            }else{
                console.log("false")
                res.json({"error" : 3})
            }
        }catch(err){
            console.log(err)
            res.json({"error" : 1})
        }
    }else{
        res.redirect("/admin/login")
    } 
})

Router.put("/Staff/TransferStaff", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            const staffId = req.body.idStaf
            const orderStr = req.body.orderStr
            await TransferOrder(staffId,orderStr)
            res.json({"error": false})
        }catch(error){
            console.log(error)
            res.json({"error": true})
        }
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/Staff/addStaff", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        const usname = req.session.usname
        const role = await getRole()
        res.render("./page/addStaff", {usname, role})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.post("/Staff/addStaff/addNew", async(req, res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            await NewStaff(req.body.staffname, req.body.username, req.body.password, req.body.phone, req.body.email, req.body.role)
            res.json({"status" : true})
        }catch(error){
            console.log(error)
            res.json({"status" : false})
        }
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/Staff/EditStaff", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        const id = req.query.staffid
        console.log(id)
        const dataStaff = await getStaffById(id)
        const role = await getRole()
        const usname = req.session.usname
        res.render("./page/editStaff", {dataStaff, usname, role})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.put("/Staff/EditStaff/SaveEdit", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            await EditStaff(req.body.id_staff, req.body.staffname, req.body.username, req.body.phone, req.body.email, req.body.role)
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