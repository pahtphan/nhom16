const express = require("express");
const router = express.Router();
const passport = require('passport');

require ('../passport');
router.use(passport.initialize());
router.use(passport.session());

const HomeController = require("../controllers/HomeController");
const ProductController = require("../controllers/ProductController");
const InformationController = require("../controllers/InformationController");
const ContactController = require("../controllers/ContactController");
const AuthController = require("../controllers/AuthController");
const CustomerController = require("../controllers/CustomerController");
const CartController = require("../controllers/CartController");
const PaymentController = require("../controllers/PaymentController");
const AddressController = require("../controllers/AddressController");
// Trang chủ
router.get("/", HomeController.index);

// Trang danh sách sản phẩm
router.get("/san-pham.html", ProductController.index);

// Trang hiển thị danh sách sản phẩm theo danh mục cụ thể
// vd: /danh-muc/kem-chong-nang/c3.html
router.get("/danh-muc/:slug/c:category_id.html", ProductController.index);

// Trang chính sách thanh toán
router.get("/chinh-sach-thanh-toan.html", InformationController.paymentPolicy);

// Trang chính sách đổi trả
router.get("/chinh-sach-doi-tra.html", InformationController.returnPolicy);

// Trang chính sách giao hàng
router.get("/chinh-sach-giao-hang.html", InformationController.deliveryPolicy);

// Trang liên hệ
router.get("/lien-he.html", ContactController.form);

// Gởi email
router.post("/contact/sendEmail", ContactController.sendEmail);

// trang chi tiết sản phẩm
router.get("/san-pham/:slug.html", ProductController.detail);

// đánh giá sản phẩm
router.post("/comments", ProductController.storeComment);

// Đăng nhập
router.post("/login", AuthController.login);

// Đăng xuất
router.get("/logout", AuthController.logout);

// Thông tin tài khoản
router.get("/thong-tin-tai-khoan.html", CustomerController.show);

// Địa chỉ giao hàng mặc định
router.get("/dia-chi-giao-hang-mac-dinh.html",CustomerController.shippingDefault);


// Cập nhật địa chỉ giao hàng mặc định
router.post("/customer/saveShippingAddress",CustomerController.updateShippingDefault);

//Đơn hàng của tôi
router.get("/don-hang-cua-toi.html", CustomerController.orders);

// chi tiết đơn hàng
router.get("/chi-tiet-don-hang-:order_id.html", CustomerController.orderDetail);

// Cập nhật thông tin cá nhân
router.post("/customer/updateInfo", CustomerController.updateInfo);

// Kiểm tra email có tồn tại chưa??
router.get("/customer/notexisting", CustomerController.notexisting);

// Kiểm tra mã google recaptcha response hợp lệ không?
// Dùng middleware, kiểm tra trước khi gọi hàm CustomerController.register
var Recaptcha = require("express-recaptcha").RecaptchaV2;
//import Recaptcha from 'express-recaptcha'
var recaptcha = new Recaptcha(
  process.env.GOOGLE_RECAPTCHA_SITE,
  process.env.GOOGLE_RECAPTCHA_SECRET
);

// Đăng ký
router.post(
  "/register",
  recaptcha.middleware.verify,
  CustomerController.register
);

// kích hoạt tài khoản
router.get("/customer/active/token/:token", CustomerController.active);

// Thêm vào giỏ hàng
router.get("/cart/add", CartController.add);

// xóa giỏ hàng

router.get("/cart/delete", CartController.delete);

// cập nhật số lượng trong giỏ hàng
router.get("/cart/update", CartController.update);

// Đặt hàng
router.get("/dat-hang.html", PaymentController.checkout);

// address
router.get("/address/districts", AddressController.districts);
router.get("/address/shippingfee", AddressController.shippingFee);
router.get("/address/wards", AddressController.wards);

//thanh toán (đặt hàng) 
router.post("/thanh-toan.html", PaymentController.order);


// login by google
router.get("/",AuthController.loginGoogle);

router.get("/auth/google", passport.authenticate('google', { scope: 
	[ 'email', 'profile' ] })); 

  // Auth Callback 
router.get( '/auth/google/callback', 
passport.authenticate( 'google', { 
  successRedirect: '/success', 
  failureRedirect: '/failure'
}));

// Success 
router.get('/success' ,AuthController.successGoogleLogin); 

// failure 
router.get('/failure' , AuthController.failureGoogleLogin);


// login by facebook

// router.get("/",AuthController.loginGoogle);

// router.get('/auth/facebook',
//   passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }));

//   router.get( '/auth/facebook/callback', 
// passport.authenticate( 'facebook', { 
//   successRedirect: '/success', 
//   failureRedirect: '/failure'
// }));

// // Success 
// router.get('/success' ,AuthController.successFacebookLogin); 

// // failure 
// router.get('/failure' , AuthController.failureFacebookLogin);





module.exports = router;