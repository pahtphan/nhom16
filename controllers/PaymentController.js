const Cart = require("../models/Cart");
const customerModel = require("../models/Customer");
const provinceModel = require('../models/Province');
const wardModel = require('../models/Ward');
class PaymentController {
  //Thanh toán
  static checkout = async (req, res) => {
    // trycatch
    try {
      const cart = new Cart(req.cookies.cart);
      const email = req.session.email || "khachvanglai@gmail.com";
      const customer = await customerModel.findEmail(email);
      const provinces = await provinceModel.all();
      let districts = [];
      let wards = [];
      let selected_ward_id = '';
      let selected_district_id = '';
      let selected_province_id = '';
      let shipping_fee = 0;
      if(customer.ward_id){
       selected_ward_id  = customer.ward_id;
       
       const selected_ward = await wardModel.find(selected_ward_id);
       const selected_district = await selected_ward.getDistricts();
       const selected_province = await selected_district.getProvince();

      // Tìm danh sách wards và districts
      wards = await selected_district.getWards();
      
      districts = await selected_province.getDistricts();
      
      selected_district_id = selected_district.id;
      selected_province_id = selected_province.id;
      
      // Phí giao hàng
      const transportModel = require("../models/Transport");
      const transport = await transportModel.getByProvinceId(selected_province_id);
      shipping_fee = transport.price;

      

      }
      // console.log(cart);
      res.render("payment/checkout", {
        cart: cart,
        customer: customer,
        provinces:provinces,
        districts : districts,
        wards: wards,
        selected_district_id: selected_district_id,
        selected_province_id : selected_province_id,
        selected_ward_id:selected_ward_id,
        shipping_fee : shipping_fee
      });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };
  

  // Đặt hàng
  static order = async (req, res) => {
    // trycatch
    try {
      // console.log(req.body);
      // res.end('test');
      // return;
      const cart = new Cart(req.cookies.cart);
      const email = req.session.email || "khachvanglai@gmail.com";
      const customer = await customerModel.findEmail(email);
      const provinces = await provinceModel.all();
      let districts = [];
      let wards = [];
      let selected_ward_id = '';
      let selected_district_id = '';
      let selected_province_id = '';
      let shipping_fee = 0;
      if(customer.ward_id){
       selected_ward_id  = customer.ward_id;
       
       const selected_ward = await wardModel.find(selected_ward_id);
       const selected_district = await selected_ward.getDistricts();
       const selected_province = await selected_district.getProvince();

      // Tìm danh sách wards và districts
      wards = await selected_district.getWards();
      
      districts = await selected_province.getDistricts();
      
      selected_district_id = selected_district.id;
      selected_province_id = selected_province.id;
      
      // Phí giao hàng
      const transportModel = require("../models/Transport");
      const transport = await transportModel.getByProvinceId(selected_province_id);
      shipping_fee = transport.price;

      }
    //  Lưu xuống database
      const orderModel = require('../models/Order');
      const orderItemModel = require('../models/OrderItem');
      const data = {
        created_date : req.app.locals.helpers.getCurrentDateTime(),
        order_status_id: 1,
        staff_id : null,
        customer_id: customer.id,
        shipping_fullname: req.body.fullname,
        shipping_mobile: req.body.mobile,
        payment_method: req.body.payment_method,
        shipping_ward_id: req.body.ward,
        shipping_housenumber_street: req.body.address,
        shipping_fee: shipping_fee,
        delivered_date:req.app.locals.helpers.getCurrentDateTime()

      };
      const orderId = await orderModel.save(data);
      for (const product_id in cart.items) {
        const item = cart.items[product_id];
        const data = {
          product_id : item.product_id,
          order_id : orderId,
          qty : item.qty,
          unit_price : item.unit_price,
          total_price : item.total_price,
        }
      await orderItemModel.save(data);
      }
      // res.end('test');
      // Xóa giỏ hàng ở cookie và session
      const cartEmpty = new Cart();
      const stringCart = cartEmpty.toString();//chuyển obj -> string
      //   Lưu giỏ hàng xuống lại cookie(ở trình duyệt web);
      res.cookie('cart',stringCart, {
        // Thời gian sống của cookie, đơn vị mili giây
        // Sống 1h thì ta có: 1 x 60 x 60 x 1000 = 3600000
        maxAge: 3600000,
        // Cho phép truy cập cookie này ở trình duyệt web lẫn server,
        // Nếu true thì chỉ cho phép truy cập ở server
        httpOnly: false
      });
      // Điều hướng về trang đơn hàng của tôi
      
        res.redirect('/don-hang-cua-toi.html');
      
    
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };
}

module.exports = PaymentController;
