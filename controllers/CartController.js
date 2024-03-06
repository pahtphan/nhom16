const Cart = require("../models/Cart");
class CartController {
  //Thêm vào giỏ hàng
  static add = async (req, res) => {
    // trycatch
    try {
        // console.log(req.query);
        // res.end('helllo');
      // Lấy cookie có tên là cart từ trình duyệt web gởi lên
      // Cookie được lưu ở trình duyệt web
      //req.cookies.cart là lấy giá trị của cookie cart từ trình duyệt web gởi lên
      const cart = new Cart(req.cookies.cart);
      const product_id = req.query.product_id;
      const qty = req.query.qty;
      await cart.addProduct(product_id, qty);
      const stringCart = cart.toString();//chuyển obj -> string
      //   Lưu giỏ hàng xuống lại cookie(ở trình duyệt web);
      res.cookie('cart',stringCart, {
        // Thời gian sống của cookie, đơn vị mili giây
        // Sống 1h thì ta có: 1 x 60 x 60 x 1000 = 3600000
        maxAge: 3600000,
        // Cho phép truy cập cookie này ở trình duyệt web lẫn server,
        // Nếu true thì chỉ cho phép truy cập ở server
        httpOnly: false
      });
      //   Không gởi về dữ liệu, chỉ gởi về trình duyệt web cookie thoi
      res.end();
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      // console.log(error);Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // Xóa giỏ hàng
  static delete =  (req, res) => {
    // trycatch
    try {
        // console.log(req.query);
        // res.end('helllo');
      // Lấy cookie có tên là cart từ trình duyệt web gởi lên
      // Cookie được lưu ở trình duyệt web
      //req.cookies.cart là lấy giá trị của cookie cart từ trình duyệt web gởi lên
      const cart = new Cart(req.cookies.cart);
      const product_id =req.query.product_id;
      cart.deleteProduct(product_id);
      const stringCart = cart.toString();//chuyển obj -> string
      //   Lưu giỏ hàng xuống lại cookie(ở trình duyệt web);
      res.cookie('cart',stringCart, {
        // Thời gian sống của cookie, đơn vị mili giây
        // Sống 1h thì ta có: 1 x 60 x 60 x 1000 = 3600000
        maxAge: 3600000,
        // Cho phép truy cập cookie này ở trình duyệt web lẫn server,
        // Nếu true thì chỉ cho phép truy cập ở server
        httpOnly: false
      });
      //   Không gởi về dữ liệu, chỉ gởi về trình duyệt web cookie thoi
      res.end();
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      // console.log(error);Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // Cập nhật số lượng trong giỏ hàng
  static update = async (req, res) => {
    // trycatch
    try {
        // console.log(req.query);
        // res.end('helllo');
      // Lấy cookie có tên là cart từ trình duyệt web gởi lên
      // Cookie được lưu ở trình duyệt web
      //req.cookies.cart là lấy giá trị của cookie cart từ trình duyệt web gởi lên
      const cart = new Cart(req.cookies.cart);
      const product_id = req.query.product_id;
      const qty = req.query.qty;
      cart.deleteProduct(product_id);
      await cart.addProduct(product_id, qty);
      const stringCart = cart.toString();//chuyển obj -> string
      //   Lưu giỏ hàng xuống lại cookie(ở trình duyệt web);
      res.cookie('cart',stringCart, {
        // Thời gian sống của cookie, đơn vị mili giây
        // Sống 1h thì ta có: 1 x 60 x 60 x 1000 = 3600000
        maxAge: 3600000,
        // Cho phép truy cập cookie này ở trình duyệt web lẫn server,
        // Nếu true thì chỉ cho phép truy cập ở server
        httpOnly: false
      });
      //   Không gởi về dữ liệu, chỉ gởi về trình duyệt web cookie thoi
      res.end();
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      // console.log(error);Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };
}

module.exports = CartController;
