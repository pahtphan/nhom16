class ContactController {
  //   Hiển thị trang liên hệ
  static form = async (req, res) => {
    // trycatch
    try {
      res.render("contact/form", {});
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  static sendEmail = async (req, res) => {
    // trycatch
    try {
      //  console.log(req.body); cái này để xem các thông tin trên trình duyệt web gửi về server
      // console.log(req.protocol, req.headers.host); để tạo thành tên trang web
      const web_url= `${req.protocol}://${req.headers.host}`;

      // Gọi helper phải thông qua req
      const to = process.env.SHOP_OWNER;
      const subject = `${process.env.APP_NAME} - liên hệ`;
      const content = `
      Xin chào chủ cửa hàng, <br>
      Dưới đây là thông tin khách hàng liên hệ: <br>
      Tên: ${req.body.fullname} <br>
      Email: ${req.body.email} <br>
      Mobile:${req.body.mobile} <br>
      Message:${req.body.content} <br>
      Được gởi từ trang web ${web_url}
      `;
      req.app.locals.helpers.sendEmail(to,subject,content);
      res.end('Đã gởi mail thành công');

    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };
}

module.exports = ContactController;
