const express = require("express")
const Router = express.Router()

Router.get("/logout",(req, res)=>{
    req.session.islogin = false
    req.session.usname = null
    res.redirect("/admin/login")
})

module.exports = Router