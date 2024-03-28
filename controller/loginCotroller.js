const express = require("express")
const Router = express.Router()
const [checkLogin, login] = require("../models/loginModel")

Router.get("/login", (req, res) =>{
    const error = null
    const check = checkLogin(req)
    console.log("check")
    if(check){
        res.redirect("/admin/home")
    }else{
        res.render("./index", {error})
    }
})

Router.post("/login/auth", async (req, res) =>{
    const email = req.body.username
    const pass = req.body.password
    const [error, status, usname] = await login(email, pass)
    if(error){
        const error = "Error, Cannot connect to server!"
        res.render("./index", {error})
    }else{
        if(status){
            req.session.usname = usname
            req.session.islogin = status
            res.redirect("/admin/home")
        }else{
            const error = "Wrong information!"
            res.render("./index", {error})
        }
        
    }

})

Router.get("/home", (req, res) =>{
    const check = checkLogin(req)
    if(check){
        const usname = req.session.usname;
        res.render("./page/home", {usname})
    }else{
        res.redirect("/admin/login")
    }
})

const dasboardRoute = require("../controller/dashboardController")
const logoutRoute = require("../controller/logoutController")
Router.use("/home" ,  [logoutRoute, dasboardRoute])


module.exports = Router
