const app = require("express")
const Router = app.Router()
const [checkLogin]= require("../models/loginModel")
const [getAllProduct, getProductByID, deleteProduct, deleteMoreThanOne, addNewProduct, editProduct] = require("../models/productModel")
const {getAllCate} = require("../models/categoriesModel")
const path = require('path');
const multer  = require('multer')
const {addNewImg, UpdateImg} = require("../models/imageModel")


Router.get("/Product", (req,res)=>{
    const check = checkLogin(req)
    if(check){
        const usname = req.session.usname
        res.render("./page/listProduct", {usname})
    }else{
        res.redirect("/admin/home")
    }
})

Router.get("/Product/getAllProduct", async (req,res)=>{
    const check = checkLogin(req)
    if(check){
        const dataProduct = await getAllProduct()
        console.log(dataProduct)
        res.json(dataProduct)
    }else{
        res.redirect("/admin/home")
    }
})

Router.delete("/Product/deleteProduct", async (req,res)=>{
    const check = checkLogin(req)
    if(check){
        const id_pro = req.query.idProduct
        try{
            const result = await deleteProduct(id_pro)
            res.json({'deleteStatus' : true})
        }catch(error){
            res.json({'deleteStatus' : false})
        }
    }else{
        res.redirect("/admin/home")
    }
})

Router.delete("/Product/deleteMoreThanOnePro", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        const listPro = req.body.productList
        try{
            await deleteMoreThanOne(listPro)
            res.json({"deleteStatus" : true})
        }catch(error){
            res.json({"deleteStatus" : false})
        }
    }else{
        res.redirect("/admin/home")
    }
})

Router.get("/Product/addProduct" , async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        const usname = req.session.usname
        await getAllCate()
        .then((dataCates) => {
            res.render("./page/addProduct", {usname , dataCates})
        }).catch((err) => {
            res.json({"error" : err})
        });
    }else{
        res.redirect("/admin/home")
    }
})

const uploadDir = path.join(__dirname, '../public/images');


    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
          cb(null,  file.originalname);
        }
      });

        const upload = multer({ storage: storage });  

Router.post("/Product/addProduct/addNew", upload.single('img_product'),async (req,res)=>{
    const check = checkLogin(req)
    if(check){
        const img =  req.file.originalname
        const name = req.body.name_pro
        const price  = req.body.price_pro
        const descript = req.body.descript_pro
        const isfeat = req.body.isfeat
        const qty = req.body.qty_pro
        const id_cate = req.body.cate_choose
        console.log(img + " " + name + " " + price + " " + descript + " " + isfeat + " " + qty + " " + id_cate)
        try{
        const id_pro = await addNewProduct(name, price, qty, id_cate, isfeat, img, descript) 
        await addNewImg(img, id_pro)
        res.json({"addProductStatus" : true})
        }catch(err){
            console.log(err)
            res.json({"addProductStatus" : false})
        }
    }else{
        res.redirect("/admin/home")
    }
})

Router.get("/Product/getProduct", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        const id_product = req.query.id_product
        try{
            const dataProduct = await getProductByID(id_product)
            const dataCate = await getAllCate()
            const usname = req.session.usname
            res.render("./page/editProduct", {dataProduct, usname,dataCate})
        }catch(err){
            res.json()
        }
    }else{
        res.redirect("/admin/home")
    }
})


Router.put("/Product/editProduct", upload.single('img_product') , async (req,res)=>{
    const check = checkLogin(req)
    if(check){
        const id_pro = req.body.id_pro
        const hasImg = req.body.hasImg
        const name = req.body.name_pro
        const price = req.body.price_pro
        const qty = req.body.qty_pro
        const cate = req.body.cate_choose
        const isFeat = req.body.isfeat
        const descript = req.body.descript_pro
        try{
            if(hasImg === "true"){
                const img = req.file.originalname
                await editProduct(id_pro, name, price,qty,cate,isFeat,img, descript, true)
                await UpdateImg(img, id_pro)
            }else{
                await editProduct(id_pro, name, price,qty,cate,isFeat,null, descript, false)
            }
            res.json({"editPro_status" : true})
        }catch(error){
            console.log(error)
            res.json({"editPro_status" : false})
        }
        
    }else{
        res.redirect("/admin/home")
    }
})

module.exports = Router