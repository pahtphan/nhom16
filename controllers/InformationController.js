class InformationController {
//   Chính sách thanh toán
  static paymentPolicy = async (req, res) => {
    // trycatch
    try {
     

      res.render("information/paymentPolicy", {
        
      });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      // console.log(error);Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  //   Chính sách đổi trả
  static returnPolicy = async (req, res) => {
    // trycatch
    try {
     

      res.render("information/returnPolicy", {
        
      });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      // console.log(error);Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  //   Chính sách giao hàng
  static deliveryPolicy = async (req, res) => {
    // trycatch
    try {
     

      res.render("information/deliveryPolicy", {
        
      });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      // console.log(error);Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };
}

module.exports =  InformationController
