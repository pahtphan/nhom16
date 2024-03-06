const provinceModel = require("../models/Province");

class AddressController {
  //Thanh toán
  static districts = async (req, res) => {
    // trycatch
    try {
      const province_id = req.query.province_id;
      const province = await provinceModel.find(province_id);
      const districts = await province.getDistricts();
      // send về trình duyệt dạng json
      const json_str = JSON.stringify(districts);
      res.end(json_str);
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  //Thanh toán
  static shippingFee = async (req, res) => {
    // trycatch

    try {
      const transportModel = require("../models/Transport");
      const province_id = req.query.province_id;
      const transport = await transportModel.getByProvinceId(province_id);
      console.log(transport);
      // Cần chuyển số thành chuỗi trước khi gởi về
      res.end(transport.price.toString());
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // 
  static wards = async (req, res) => {
    // trycatch
    try {
      const districtModel = require('../models/District');
      const district_id = req.query.district_id;
      const district = await districtModel.find(district_id);
      const wards = await district.getWards();
      // send về trình duyệt dạng json
      const json_str = JSON.stringify(wards);
      res.end(json_str);
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      console.log(error); //Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };
}

module.exports = AddressController;
