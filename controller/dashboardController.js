const express = require("express")
const Router = express.Router()
const [checkLogin]= require("../models/loginModel")
const [getTotalOrder,getTotalCancelOrder,getTotal]= require("../models/dashboardModel")
const [getAllOrder,getOrderToday, getOrderYesterday, getOrderYear, getOrderMonth, getOrderWeek, getpre3month, getBySearch, deleteOrder, getOrderById, getOrder_item, deleteOrder_item , addOrder_item , getItemOrder_byID , editOrder] = require("../models/orderModel")

Router.get("/dashboard/today", async (req, res)=>{
    const check = checkLogin(req)
 
    if(check){
        const order = await getOrderToday()
        const totalOrder = getTotalOrder(order)
        const totalCancelOrder = getTotalCancelOrder(order)
        const totalIncome = getTotal(order)
        res.json({'orderCount':`${totalOrder}`,'orderCancel':`${totalCancelOrder}`,'totalIncome':`${totalIncome}`,'order':order})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/dashboard/yesterday", async (req, res)=>{
    const check = checkLogin(req)
 
    if(check){
        const order = await getOrderYesterday()
        const totalOrder = getTotalOrder(order)
        const totalCancelOrder = getTotalCancelOrder(order)
        const totalIncome = getTotal(order)
        res.json({'orderCount':`${totalOrder}`,'orderCancel':`${totalCancelOrder}`,'totalIncome':`${totalIncome}`,'order':order})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/dashboard/this_year", async (req, res)=>{
    const check = checkLogin(req)
 
    if(check){
        const order = await getOrderYear()
        const totalOrder = getTotalOrder(order)
        const totalCancelOrder = getTotalCancelOrder(order)
        const totalIncome = getTotal(order)
        res.json({'orderCount':`${totalOrder}`,'orderCancel':`${totalCancelOrder}`,'totalIncome':`${totalIncome}`,'order':order})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/dashboard/this_month", async (req, res)=>{
    const check = checkLogin(req)
 
    if(check){
        const order = await getOrderMonth()
        const totalOrder = getTotalOrder(order)
        const totalCancelOrder = getTotalCancelOrder(order)
        const totalIncome = getTotal(order)
        res.json({'orderCount':`${totalOrder}`,'orderCancel':`${totalCancelOrder}`,'totalIncome':`${totalIncome}`,'order':order})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/dashboard/this_week", async (req, res)=>{
    const check = checkLogin(req)
 
    if(check){
        const order = await getOrderWeek()
        const totalOrder = getTotalOrder(order)
        const totalCancelOrder = getTotalCancelOrder(order)
        const totalIncome = getTotal(order)
        res.json({'orderCount':`${totalOrder}`,'orderCancel':`${totalCancelOrder}`,'totalIncome':`${totalIncome}`,'order':order})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/dashboard/pre_three_month", async (req, res)=>{
    const check = checkLogin(req)
 
    if(check){
        const order = await getpre3month()
        const totalOrder = getTotalOrder(order)
        const totalCancelOrder = getTotalCancelOrder(order)
        const totalIncome = getTotal(order)
        res.json({'orderCount':`${totalOrder}`,'orderCancel':`${totalCancelOrder}`,'totalIncome':`${totalIncome}`,'order':order})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/dashboard/get_by_search" , async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        const from = req.query.fromDate
        const to = req.query.toDate
        const order = await getBySearch(from, to)
        const totalOrder = getTotalOrder(order)
        const totalCancelOrder = getTotalCancelOrder(order)
        const totalIncome = getTotal(order)
        res.json({'orderCount':`${totalOrder}`,'orderCancel':`${totalCancelOrder}`,'totalIncome':`${totalIncome}`,'order':order})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/dashboard/getAll", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        const order = await getAllOrder()
        const totalOrder = getTotalOrder(order)
        const totalCancelOrder = getTotalCancelOrder(order)
        const totalIncome = getTotal(order)
        res.json({'orderCount':`${totalOrder}`,'orderCancel':`${totalCancelOrder}`,'totalIncome':`${totalIncome}`,'order':order})
    }else{
        res.redirect("/admin/login")
    } 
})

const orderController = require("./orderController")
const locaiontController = require("./locationController")
Router.use("/dashboard" ,[orderController,locaiontController])

module.exports = Router