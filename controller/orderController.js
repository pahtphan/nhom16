const express = require("express")
const Router = express.Router()
const [checkLogin]= require("../models/loginModel")
const [getAllOrder,getOrderToday, getOrderYesterday, getOrderYear, getOrderMonth, getOrderWeek, getpre3month, getBySearch, deleteOrder, getOrderById, getOrder_item , deleteOrder_item , addOrder_item , getItemOrder_byID,editOrder , Accpt_Order , CreateOrder, deleteOrderList] = require("../models/orderModel")
const [getAllStaff , getStaffById] = require("../models/staffModel")
const [getAllProduct, getProductByID] = require("../models/productModel")
const {changeShippingName , getCustomer} = require("../models/customerModel")
const {format} = require("date-fns")
const {getProvice , getTransportByProvince , getDis_ProvinceByWard, getDistrict, getWard} = require("../models/locationModel")

Router.get("/Order" , async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        const allOrder = await getAllOrder()
        const usname = req.session.usname
        res.render("./page/listOrder", {allOrder, usname})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/getOrder" , async (req , res) =>{
    const check = checkLogin(req)
    if(check){
        if(req.query.order_edit === null){
            res.json({'error' : 'there is no order to get!'})
        }else{
            console.log(req.query.order_edit)
            const id_order = req.query.order_edit
            const usname = req.session.usname
            const order = await getOrderById(id_order)
            const order_item = await getOrder_item(id_order)
            const staff = await getAllStaff()
            const product = await getAllProduct()
            console.log(product)
            const cities = await getProvice()
            const district = await getDistrict()
            const ward = await getWard()
            const location = await getDis_ProvinceByWard(order[0].shipping_ward_id)
            res.render("./page/editOrder", {usname , order , order_item, staff,product , cities,district, ward , location})
        }
    }else{
        res.redirect("/admin/login")
    } 
})

Router.delete("/deleteProduct_Order" , async (req , res) =>{
    const check = checkLogin(req)
    if(check){
        const id_list = req.body.id_list
        const id_order = req.body.id_order
        const result = await deleteOrder_item(id_list, id_order)
        const OrderData = await getOrderById(id_order)
        console.log(OrderData)
        const total = OrderData[0].total
        const totalWfee = OrderData[0].toltalwfee
        if(result){
            res.json({'del_status' : 'true' , "total" : total, "totalWfee" : totalWfee})
        }else{
            res.json({'del_status' : 'false' , "total" : total, "totalWfee" : totalWfee})
        }
    }else{
        res.redirect("/admin/login")
    } 
})

Router.post("/addProduct_Order" , async (req , res) =>{
    const check = checkLogin(req)
    if(check){
        const id_product = req.body.id_pro
        const id_order = req.body.id_order
        const [status, isEx] = await addOrder_item(id_product , id_order)
        const item_data = await getItemOrder_byID(id_product , id_order)
        const OrderData = await getOrderById(id_order)
        const total = OrderData[0].total
        const totalWfee = OrderData[0].toltalwfee
        console.log(isEx)
        if(status){
            if(isEx === "non_exist"){
                res.json({'add_status' : 'true', "product" : item_data, 'isEx' : 'false' , "total" : total, "totalWfee" : totalWfee})
            }else if(isEx === "exist"){
                res.json({'add_status' : 'true', "product" : item_data , 'isEx' : 'true', "total" : total, "totalWfee" : totalWfee})
            }
        }else{
            res.json({'add_status' : 'false'})
        }
    }else{
        res.redirect("/admin/login")
    } 
})

Router.put("/UpdateOrder" , async (req , res) =>{
    const check = checkLogin(req)
    if(check){
        const id_cus = req.body.id_cus
        const id_order = req.body.id_order
       const stat = req.body.status
       const re_name = req.body.re_name
       const re_phone = req.body.re_phone
       const payMed = req.body.payMed
       const shipFee = req.body.shipFee
       const address = req.body.address
       const shipDate = req.body.shipDate
       const staffID = req.body.staffID
       const province_id = req.body.province_id
       const ward_id = req.body.ward
       const transport = await getTransportByProvince(province_id)
       const result = await editOrder(id_order ,stat , re_name ,re_phone, payMed, shipFee, address, shipDate,staffID , ward_id, transport[0].price)
       const result1 = await changeShippingName(id_cus, re_name,re_phone,address)
       console.log(id_cus)
       if(result){
        if(result1){
            res.json({"status" : true})

        }else{
            res.json({"status" : false})

        }
       }else{
            res.json({"status" : false})
       }
    }else{
        res.redirect("/admin/login")
    } 
})


Router.delete("/delete_order/:id_order", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        if(req.params.id_order === null){
            res.json({'error' : 'there is no order to delete!'})
        }else{
            // console.log(req.params.id_order)
            const deleStat = deleteOrder(req.params.id_order)
            res.json({'error' : 'false', 'status' : `${deleStat}`})
        }
    }else{
        res.redirect("/admin/login")
    } 
})

Router.put("/acptOrder", async (req,res)=>{
    const check = checkLogin(req)
    if(check){
        const id_order = req.query.ID_order
        const result = await Accpt_Order(id_order)
        if(result){
            res.json({"status":true})
        }else{
            res.json({"status":false})
        }
    }else{
        res.redirect("/admin/login")
    }
})

Router.get("/AddOrder", async (req,res)=>{
    const check = checkLogin(req)
    if(check){
        const cus_data = await getCustomer()
        const date = new Date()
        const currentDate = format(date,"yyyy-MM-dd")
        const usname = req.session.usname
        const staff_data = await getAllStaff()
        const cities = await getProvice()
        console.log(staff_data)
        res.render("./page/addOrder",{usname ,cus_data , currentDate , staff_data , cities})
    }else{
        res.redirect("/admin/login")
    }
})

Router.post("/CreateOrder", async (req, res)=>{
    const check = checkLogin(req)
    if(check){
       const id_cus = req.body.id_cus
       const id_stat = req.body.id_status
       const id_staff = req.body.id_staff
       const name_re = req.body.name_re
       const phone_re = req.body.phone_re
       const address = req.body.address
       const ship_date = req.body.ship_date
       const paymed = req.body.paymed
       const id_province = req.body.province
       const id_ward = req.body.ward
       const shipFee = await getTransportByProvince(id_province)
       const result = await CreateOrder(id_cus, name_re, phone_re, address, ship_date, id_stat, id_staff,paymed, id_ward, shipFee[0].price)
       if(result === "wrongDate"){
            res.json({"status" : "wrongDate"})
       }else if(result === true){
            res.json({"status" : true})
       }else{
        res.json({"status" : false})
       }
    }else{
        res.redirect("/admin/login")
    }
})

Router.delete("/delete_choose_order", async (req, res)=>{
    const order_list = req.body.orderList
    try {
        const result = await deleteOrderList(order_list)
        res.json({"status" : true})
    } catch (error) {
        console.log(error)
        res.json({"status": false})
    }
})

module.exports = Router