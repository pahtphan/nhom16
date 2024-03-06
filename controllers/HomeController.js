const productModel = require("../models/Product");
const categoryModel = require("../models/Category");

class HomeController {
  // static không cần nêu đối tượng
  // Còn nếu ko có static thì phải new đối tượng lên
  // Hiển thị danh sách sản phẩm
  static index = async (req, res) => {
    // trycatch
    try {
      // Lấy 4 sản phẩm nổi bật
      const page = 1;
      const item_per_page = 4;
      const conds = []; //Không có điều kiện
      let sorts = { featured: "DESC" };
      const featuredProducts = await productModel.getBy(
        conds,
        sorts,
        page,
        item_per_page
      );
      //    SELECT * FROM view_product ORDER BY featured DESC LIMIT 0,4

      // Lấy 4 sản phẩm mới nhất
      sorts = { created_date: "DESC" };
      const latestProducts = await productModel.getBy(
        conds,
        sorts,
        page,
        item_per_page
      );
      //    SELECT * FROM view_product ORDER BY created_date DESC LIMIT 0,4

      // Ý tưởng:
      // B1: lấy danh sách danh mục
      const categories = await categoryModel.all();
      // B2: Duyệt từng danh mục để lấy danh sách sản phẩm tương ứng
      // forof
      const categoryProducts = [];
      for (const category of categories) {
        // Lấy sản phẩm theo danh mục
        const conds = {
          category_id: {
            type: "=",
            val: category.id,
          },
        };
        const products = await productModel.getBy(
          conds,
          sorts,
          page,
          item_per_page
        );
        // SELECT * FROM view_product WHERE category_id = 3 LIMIT 0,4

        // Thêm danh sách vào cấu trúc biến để truyền cho view
        categoryProducts.push({
          categoryName: category.name,
          products: products,
        });
      }

      res.render("home/index", {
        featuredProducts: featuredProducts,
        latestProducts: latestProducts,
        categoryProducts: categoryProducts,
        
        
      });
    } catch (error) {
      // 500 là lỗi internal server(Lỗi xảy ra ở server)
      // console.log(error);Dành cho dev xem
      res.status(500).send(error.message); //Cho người dùng xem
    }
  };
}

module.exports = HomeController;
