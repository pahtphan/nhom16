const express = require("express")
const Router = express.Router()
const [checkLogin]= require("../models/loginModel")
const {getAllImg, deleteImage,deleteMoreImg} = require("../models/imageModel")

Router.get("/Images", async (req,res)=>{
    const check = checkLogin(req)
    if(check){
        const usname = req.session.usname
        res.render("./page/listImage", {usname})
    }else{
        res.redirect("/admin/home")
    }
})

Router.get("/Images/getImages" , async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        try{
            const dataImage = await getAllImg()
            console.log(dataImage)
            res.json({"images" : dataImage, "imageStatus" : true})
        }catch(err){
            console.log(err)
            res.json({ "imageStatus" : false})
        }
    }else{
        res.redirect("/admin/home")
    }
})

Router.delete("/Images/delImage", async (req,res)=>{
    const idImg = req.query.imgID
    try{
        await deleteImage(idImg)
        res.json({"deleteImgStat" : true})
    }catch(err){
        res.json({"deleteImgStat" : true})
    }
})

Router.delete("/Images/delmoreImg", async (req,res)=>{
    const idImg = req.body.img_list
    try{
        await deleteMoreImg(idImg)
        res.json({"deleteImgStat" : true})
    }catch(err){
        res.json({"deleteImgStat" : true})
    }
})


module.exports = Router