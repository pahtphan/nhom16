const customerModel = require("../models/Customer");
const bcrypt = require("bcrypt");
class AuthController {
  //   Hiển thị trang liên hệ
  static login = async (req, res) => {
    // trycatch
    try {
      //Kiểm tra email có tồn tại trong hệ thống không?
      const email = req.body.email;
      const customer = await customerModel.findEmail(email);
      if (!customer) {
        // Cách viết gọn của dòng comment 14
        req.session.message_error = `Lỗi: không tồn tại ${email} trong hệ thống`;
        // req.app.locals.session.message_error = `Lỗi: không tồn tại ${email} trong hệ thống`;
        // Về trang chủ
        req.session.save(() => {
          res.redirect("/");
        });

        return;
      }

      // Kiểm tra mật khẩu
      const password = req.body.password;
      // password chưa mã hóa
      // customer.password là password đã mã hóa
      const match = bcrypt.compareSync(password, customer.password);

      if (!match) {
        req.session.message_error = "Lỗi mật khẩu không đúng";
        // Về trang chủ
        req.session.save(() => {
          res.redirect("/");
        });
        return;
      }

      // Kiểm tra customer đã active chưa??
      if (!customer.is_active) {
        req.session.message_error = "Lỗi tài khoản chưa được kích hoạt";
        // Về trang chủ
        req.session.save(() => {
          res.redirect("/");
        });
        return;
      }
      //login thành công
      req.session.name = customer.name;
      req.session.email = customer.email;
      // req.session.message_success = 'Đã đăng nhập thành công';
      // Về trang chủ
      // lưu session xuống file trước khi redirect
      req.session.save(() => {
        res.redirect("/thong-tin-tai-khoan.html");
      });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // Logout
  static logout = async (req, res) => {
    // trycatch
    try {
      req.session.destroy();
      // Về trang chủ
      res.redirect("/");
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // login by google
  static loginGoogle = async (req, res) => {
    // trycatch
    try {
      res.render("google/auth");
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // // login by google
  static successGoogleLogin = async (req, res) => {
    // trycatch
    try {
      const email = req.user.email;
      const customer = await customerModel.findEmail(email);
      if(!customer){
      const data = {
        name: req.user.displayName,
        mobile: '',
        password: '',
        email: email,
        shipping_name: req.user.displayName,
        shipping_mobile: '',
        ward_id : null,
        housenumber_street : null,
        login_by: "google",
        is_active: 1,
      };
      await customerModel.save(data);
      };
      req.session.name = customer.name;
      req.session.email = customer.email;
      // Về trang chủ
      req.session.save(() => {
        res.redirect("/thong-tin-tai-khoan.html");
      });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  static failureGoogleLogin = async (req, res) => {
    // trycatch
    try {
      res.send("Error");
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };


  // login by facebook
  
  //  static loginGoogle = async (req, res) => {
  //   // trycatch
  //   try {
  //     res.render("facebook/auth");
  //   } catch (error) {
  //     // 500 là lỗi internal server(Lỗi xảy ra ở server)
  //     console.log(error); //Dành cho dev xem
  //     res.status(500).send(error.message); //Cho người dùng xem
  //   }
  // };

  
  // static successFacebookLogin = async (req, res) => {
  //   // trycatch
  //   try {
  //     const email = req.user.email;
  //     const customer = await customerModel.findEmail(email);
  //     if(!customer){
  //     const data = {
  //       name: req.user.displayName,
  //       mobile: '',
  //       password: '',
  //       email: email,
  //       shipping_name: req.user.displayName,
  //       shipping_mobile: '',
  //       ward_id : null,
  //       housenumber_street : null,
  //       login_by: "google",
  //       is_active: 1,
  //     };
  //     await customerModel.save(data);
  //     };
  //     req.session.name = customer.name;
  //     req.session.email = customer.email;
  //     // Về trang chủ
  //     req.session.save(() => {
  //       res.redirect("/thong-tin-tai-khoan.html");
  //     });
  //   } catch (error) {
  //     // 500 là lỗi internal server(Lỗi xảy ra ở server)
  //     console.log(error); //Dành cho dev xem
  //     res.status(500).send(error.message); //Cho người dùng xem
  //   }
  // };

  // static failureFacebookLogin = async (req, res) => {
  //   // trycatch
  //   try {
  //     res.send("Error");
  //   } catch (error) {
  //     // 500 là lỗi internal server(Lỗi xảy ra ở server)
  //     console.log(error); //Dành cho dev xem
  //     res.status(500).send(error.message); //Cho người dùng xem
  //   }
  // };
}

module.exports = AuthController;
