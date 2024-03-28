const express = require("express")
const Router = express.Router()
const [checkLogin]= require("../models/loginModel")
const {getCutomerByID, getCustomer, deleteCustomer, UpdateCus, AddCustomer} = require("../models/customerModel")
const {getProvice, getDistrict, getWard, getDis_ProvinceByWard} = require("../models/locationModel")

Router.get("/getCustomer" , async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        const id_cus = req.query.id_cus
        const dataCus = await getCutomerByID(id_cus)
        console.log(dataCus)
        if(dataCus !== false){
            res.json({"error" : false , "cusData" : dataCus})
        }else{
            res.json({"error" : true})
        }
    }else{
        res.redirect("/admin/login")
    }
})

Router.get("/Customer", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        const usname = req.session.usname
            res.render("./page/listCustomer", {usname})
    }else{
        res.redirect("/admin/login")
    }
})

Router.get("/Customer/GetAllCustomers", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        const dataCus = await getCustomer()
        if(dataCus !== false){
            res.json({"error": false, "cus" : dataCus})
        }else{
            res.json({"error" : true})
        }
    }else{
        res.redirect("/admin/login")
    }
})

Router.delete("/Customer/DeleteCus", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            const idCus = req.query.idCus
            await deleteCustomer(idCus)
            res.json({"error" : false})
        }catch(error){
            console.log(error)
            res.json({"error" : true})
        }
       
    }else{
        res.redirect("/admin/login")
    }
})

Router.delete("/Customer/DeleteChooseCus", async (req, res) =>{
    const check = checkLogin(req)
    if(check){
        try{
            const idCus = req.body.cusList
            console.log(idCus)
            await deleteCustomer(idCus)
            res.json({"error" : false})
        }catch(error){
            console.log(error)
            res.json({"error" : true})
        }
       
    }else{
        res.redirect("/admin/login")
    }
})

Router.get("/Customer/GetCus", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            const cusID = req.query.cus_id
            const usname = req.session.usname
            const cusData = await getCutomerByID(cusID)
            const provinces = await getProvice()
            const districts = await getDistrict()
            const wards = await getWard()
            const dataCusEdit = cusData[0]
            console.log(dataCusEdit.ward_id)
            if(dataCusEdit.ward_id){
                console.log("not null")
                const pro_dist_ward = await getDis_ProvinceByWard(dataCusEdit.ward_id)
                res.render("./page/editCustomer", {usname, dataCusEdit, provinces, districts , wards, pro_dist_ward})
            }else{
                console.log("null")
                const pro_dist_ward = {"distID" : null , "provinID" : null , "wardID" : null}
                res.render("./page/editCustomer", {usname, dataCusEdit, provinces, districts , wards, pro_dist_ward})
            }
        }catch(error){
            console.log(error)
            res.json({"error" : true})
        }
       
    }else{
        res.redirect("/admin/login")
    }
})

Router.put("/Customer/editCus", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            await UpdateCus(req.body.id_cus, req.body.name, req.body.email, req.body.mobile, req.body.loginfrom, req.body.wardID, req.body.address, req.body.shipName, req.body.shipPhone, req.body.isActive)
            res.json({"error" : false})
        }catch(error){
            console.log(error)
            res.json({"error" : true})
        }
       
    }else{
        res.redirect("/admin/login")
    }
})

Router.get("/Customer/addCus", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        const provinces = await getProvice()
        const usname = req.session.usname
        res.render("./page/addCustomer", {usname, provinces})
    }else{
        res.redirect("/admin/login")
    }
})

Router.post("/Customer/addCus/addNewCus", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            await AddCustomer(req.body.name, req.body.email, req.body.pass, req.body.mobile, req.body.loginfrom, req.body.wardID, req.body.address, req.body.shipName, req.body.shipPhone, req.body.isActive)
            res.json({"error" : false})
        }catch(error){
            console.log(error)
            res.json({"error" : true})
        }
    }else{
        res.redirect("/admin/login")
    }
})

module.exports = Router