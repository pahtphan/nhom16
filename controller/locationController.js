const express = require("express")
const Router = express.Router()
const [checkLogin]= require("../models/loginModel")
const {getDistrictByProvinceID, getWardbyDistrictID} = require("../models/locationModel")

Router.get("/getDistrict" , async (req, res) =>{
    const check = checkLogin(req)
    if(check){
        const provinceID = req.query.idprovince
        const data = await getDistrictByProvinceID(provinceID)
        if(data === false){
            res.json({"error" : true})
        }else{
            res.json({"error" : false, "district" : data})
        }
    }else{

    }
})

Router.get("/getWard" , async (req, res) =>{
    const check = checkLogin(req)
    if(check){
        const districtID = req.query.districtID
        const data = await getWardbyDistrictID(districtID)
        if(data === false){
            res.json({"error" : true})
        }else{
            res.json({"error" : false, "ward" : data})
        }
    }else{

    }
})

module.exports = Router