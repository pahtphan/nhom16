const customerModel = require("../models/Customer");
const orderModel = require("../models/Order");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const provinceModel = require("../models/Province");
const wardModel = require("../models/Ward");
class CustomerController {
  // Thông tin tài khoản
  static show = async (req, res) => {
    // trycatch
    try {
      const customer = await customerModel.findEmail(req.session.email);
      res.render("customer/show", {
        customer: customer,
      });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // Địa chỉ giao hàng mặc định
  static shippingDefault = async (req, res) => {
    // trycatch
    try {
      const customer = await customerModel.findEmail(req.session.email);
      const provinces = await provinceModel.all();
      let districts = [];
      let wards = [];
      let selected_ward_id = "";
      let selected_district_id = "";
      let selected_province_id = "";
      if (customer.ward_id) {
        selected_ward_id = customer.ward_id;

        const selected_ward = await wardModel.find(selected_ward_id);
        const selected_district = await selected_ward.getDistricts();
        const selected_province = await selected_district.getProvince();

        // Tìm danh sách wards và districts
        wards = await selected_district.getWards();

        districts = await selected_province.getDistricts();

        selected_district_id = selected_district.id;
        selected_province_id = selected_province.id;
      }
      res.render("customer/shippingDefault", {
        customer: customer,
        provinces: provinces,
        districts: districts,
        wards: wards,
        selected_district_id: selected_district_id,
        selected_province_id: selected_province_id,
        selected_ward_id: selected_ward_id,
      });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // Cập nhật địa chỉ giao hàng mặc định
  static updateShippingDefault = async (req, res) => {
    // trycatch
    try {
      const customer = await customerModel.findEmail(req.session.email);
      // Cập nhật name và mobile
      customer.shipping_name = req.body.fullname;
      customer.shipping_mobile = req.body.mobile;
      customer.ward_id = req.body.ward;
      customer.district_id = req.body.district;
      customer.province_id = req.body.province;
      customer.housenumber_street = req.body.housenumber_street;
      await customer.update();
      req.session.message_success =
        "Đã cập nhật địa chỉ giao hàng mặc định thành công";
      // Về trang chủ
      // lưu session xuống file và điều hướng đến trang thông tin tài khoản
      // Phải cập nhật session.name
      req.session.name = req.body.fullname;
      req.session.save(() => {
        res.redirect("/dia-chi-giao-hang-mac-dinh.html");
      });
      // res.render("/customer/saveShippingAddress", {
      //   customer:customer,
      //   provinces:provinces,
      //   districts : districts,
      //   wards: wards,
      //   selected_district_id: selected_district_id,
      //   selected_province_id : selected_province_id,
      //   selected_ward_id:selected_ward_id,
      // });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // Đơn hàng của tôi
  static orders = async (req, res) => {
    // trycatch
    try {
      const email = req.session.email || "khachvanglai@gmail.com";
      const customer = await customerModel.findEmail(email);
      const orders = await orderModel.getByCustomerId(customer.id);
      // Duyệt từng đơn hàng để lấy chi tiết đơn hàng
      for (let i = 0; i <= orders.length - 1; i++) {
        // Lấy order items tương ứng của 1 đơn hàng
        const orderItems = await orders[i].getOrderItems();
        // Duyệt từng orderItem trong danh sách orderItems để tìm sản phẩm tương ứng
        for (let j = 0; j <= orderItems.length - 1; j++) {
          orderItems[j].product = await orderItems[j].getProduct();
        }
        // Gán orderItems vào thuộc tính orderItems của 1 đơn hàng cụ thể
        orders[i].orderItems = orderItems;

        // Lấy trạng thái của đơn hàng
        orders[i].status = await orders[i].getStatus();
      }
      res.render("customer/orders", {
        customer: customer,
        orders: orders,
      });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // chi tiết đơn hàng
  static orderDetail = async (req, res) => {
    // trycatch
    try {
      const email = req.session.email || "khachvanglai@gmail.com";
      const customer = await customerModel.findEmail(email);
      const orderId = req.params.order_id;
      const order = await orderModel.find(orderId);

      order.orderItems = await order.getOrderItems();
      for (let j = 0; j <= order.orderItems.length - 1; j++) {
        order.orderItems[j].product = await order.orderItems[j].getProduct();
      }
      // Xuống model để lấy hàm tính tổng
      order.subTotalPrice = await order.getSubTotalPrice();

      // Tìm phường,xã- quận,huyện - tỉnh,thành phố
      const shippingWard = await order.getShippingWard();
      console.log(shippingWard);
      const shippingDistrict = await shippingWard.getDistricts();
      const shippingProvince = await shippingDistrict.getProvince();
      console.log(shippingProvince);
      res.render("customer/orderDetail", {
        customer: customer,
        order: order,
        shippingWard: shippingWard,
        shippingDistrict: shippingDistrict,
        shippingProvince: shippingProvince,
      });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // Cập nhật thông tin cá nhân
  static updateInfo = async (req, res) => {
    // trycatch
    try {
      const customer = await customerModel.findEmail(req.session.email);
      // Cập nhật name và mobile
      customer.name = req.body.fullname;
      customer.mobile = req.body.mobile;
      if (req.body.current_password && req.body.password) {
        //kiểm tra mật khẩu hiện tại trong database đúng không??
        if (!bcrypt.compareSync(req.body.current_password, customer.password)) {
          req.session.message_error = "Lỗi: sai mật khẩu";
          req.session.save(() => {
            res.redirect("/thong-tin-tai-khoan.html");
          });
          return;
        }
        // Kiểm tra mật khẩu hiện tại thành công
        // độ khó của mật khẩu
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const new_password_hash = bcrypt.hashSync(req.body.password, salt);
        customer.password = new_password_hash;
      }
      await customer.update();
      req.session.message_success = "Đã cập nhật tài khoản thành công";
      // Về trang chủ
      // lưu session xuống file và điều hướng đến trang thông tin tài khoản
      // Phải cập nhật session.name
      req.session.name = req.body.fullname;
      req.session.save(() => {
        res.redirect("/thong-tin-tai-khoan.html");
      });
      // res.render("customer/updateInfo", {
      //   customer: customer,
      // });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // Kiểm tra email có tồn tại không?
  static notexisting = async (req, res) => {
    // trycatch
    try {
      const email = req.query.email;
      const customer = await customerModel.findEmail(email);
      if (customer) {
        res.end("false");
        return;
      }
      res.end("true");
      // res.render("customer/notexisting", {

      // });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // Đăng ký tạo tài khoản mới
  static register = async (req, res) => {
    // trycatch
    try {
      console.log(req.body);
      console.log(req.recaptcha);
      if (req.recaptcha.error) {
        req.session.message_error = `Lỗi:${req.recaptcha.error}`;
        req.session.save(() => {
          res.redirect("/");
        });
        return;
      }

      // Kiểm tra email có tồn tại trong hệ thống không??
      const email = req.body.email;
      const customer = await customerModel.findEmail(email);
      if (customer) {
        req.session.message_error = `Lỗi:${email} đã tồn tại trong hệ thống`;
        req.session.save(() => {
          res.redirect("/");
        });
        return;
      }
      // Mã hóa mật khẩu mới
      // ĐỘ khó của mật khẩu
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const encode_password = bcrypt.hashSync(req.body.password, salt);
      const data = {
        name: req.body.fullname,
        email: req.body.email,
        password: encode_password,
        mobile: req.body.mobile,
        shipping_name: req.body.fullname,
        shipping_mobile: req.body.mobile,
        login_by: "form",
        is_active: 0,
      };
      await customerModel.save(data);
      // Gởi mail kích hoạt tài khoản
      const to = email;
      const subject = "Godashop - Verify your email";
      // http://godashop.com
      const web = `${req.protocol}://${req.headers.host}`;
      const privateKey = process.env.JWT_KEY;
      const token = jwt.sign({ email: email }, privateKey, {
        algorithm: "HS256",
      });
      const linkActiveAccount = `${web}/customer/active/token/${token}`;
      // sign là bước mã hóa dữ liệu
      // HS256 là sử dụng 1 mã khóa riêng tư đơn giản và hiểu quả hơn
      // RS256 thì nó có 2 key(private key,public key) - bảo mật tốt hơn

      const content = `
      Xin chào ${email}, <br>
      Vui lòng click vào link bên dưới để kích hoạt tài khoản , <br>
      <a href="${linkActiveAccount}">Active Account</a> <br>
      Được gởi từ trang web ${web}
      `;
      req.app.locals.helpers.sendEmail(to, subject, content);

      req.session.message_success = `Đã tạo tài khoản thành công.Vui lòng vào email${email} để kích hoạt tài khoản`;
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // kích hoạt tài khoản
  static active = async (req, res) => {
    // trycatch
    try {
      const token = req.params.token;
      const privateKey = process.env.JWT_KEY;
      const decoded = jwt.verify(token, privateKey);
      const email = decoded.email;
      const customer = await customerModel.findEmail(email);
      customer.is_active = 1;
      await customer.update();
      req.session.message_success = `Đã kích hoạt tài khoản thành công`;
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };
}

module.exports = CustomerController;
