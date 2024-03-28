const productModel = require("../models/Product");
const categoryModel = require("../models/Category");
const commentModel = require("../models/Comment");
class ProductController {
  // static không cần nêu đối tượng
  // Còn nếu ko có static thì phải new đối tượng lên
  // Hiển thị danh sách sản phẩm
  static index = async (req, res) => {
    // trycatch
    try {
      let conds = {
        category_id: {
          type: "!=",
          val: 30,
        },
      };
      let sorts = {};
      // nguyên tắc server luôn nhận giá trị là chuỗi từ trình duyệt web gởi lên
      const page = Number(req.query.page ?? 1);
      const item_per_page = 10;
      // Tìm kiếm sản phẩm theo danh mục
      // /danh-muc/kem-chong-nang/c1.html
      const category_id = req.params.category_id;
      if(category_id){
        conds = {
          'category_id' : {
            'type': '=',
            'val' : category_id
          }
        }
        // SELECT * FROM view_product WHERE category_id = 3
      }

      // Tìm kiếm sản phẩm theo khoảng giá
      // /danh-muc/kem-chong-nang/c1.html?price-range = 300000-500000
      // Có 2 cách lấy giá trị thuộc tính
      // Cách 1 : req.query.sort, Cách 2 : req.query['sort']
      // Tuy nhiên tên thuộc tính có gạch nối thì phải dùng CÁCH 2
      const priceRange = req.query['price-range'];
      if(priceRange){
        const temp = priceRange.split('-');
        const startPrice = temp[0];
        const endPrice = temp[1];
        if(endPrice != 'greater'){
          conds = {
            ...conds,
            'sale_price' : {
              'type': 'BETWEEN',
              'val' : `${startPrice} AND ${endPrice}`
            }
          }
          // SELECT * FROM view_product WHERE sale_price BETWEEN 300000 AND 500000
        }
        else{
          // /danh-muc/kem-chong-nang/c1.html?price-range = 1000000-greater
          conds = {
            ...conds,
            'sale_price' : {
              'type': '>=',
              'val' : `${startPrice}`
            }
          }
          // SELECT * FROM view_product WHERE sale_price >= 1000000
        }
        
         
      }

      // sort=alpha-asc
      const sort = req.query.sort;
      if(sort){
        const temp = sort.split('-');
        // dummyCol là tên giả
        const dummyCol = temp[0];
        const order = temp[1].toUpperCase(); //asc => ASC
        // map là ánh xạ
        const map = {price: 'sale_price',alpha:'name',created: 'created_date'};
        // CHỗ map không dùng chấm dummyCol mà phải dùng ngoặc vuông
        // Để lấy giá trị thuộc tính
        const colName = map[dummyCol];
        
        // [colName] thì giá trị của colName sẽ trở thành tên thuộc tính
          sorts = {
            [colName] : order
          }
          // SELECT * FROM view_product ORDER BY sale_price DESC LIMIT 0,10
      }

      // /san-pham.html?search = kem
      const search = req.query.search ?? '';
      if(search){
        conds = {
          name : {
              type: 'LIKE',
              val : `'%${search}%'`//es6 - template literal
          }
        } 
         // SELECT * FROM view_product WHERE name LIKE '%kem%'
      }
      const products = await productModel.getBy(conds, sorts, page, item_per_page);
      // Tìm số trang
      // totalPage = Math.ceil(24 / 10) = 3
      // Lấy sản phẩm không có phân trang 
      const totalProducts = await productModel.getBy(conds, sorts);
      const totalPage = Math.ceil(totalProducts.length/item_per_page);

      // Lấy tất cả các danh mục đổ ra view
      const categories = await categoryModel.all();
      res.render("product/index", {
        products : products,
        categories : categories,
        category_id : category_id,
        priceRange : priceRange,
        sort: sort,
        search : search,
        page:page,
        totalPage : totalPage
      });
    } catch (error) {
       // 500 là lỗi internal server(Lỗi xảy ra ở server)
       console.log(error); //Dành cho dev xem
       res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // Hiển thị trang chi tiết sản phẩm
  static detail = async (req, res) => {
    // trycatch
    try {
      // sua-rua-,at-nghe-beaumore-moi-100g-4
      // Mã sản phẩm là
      const slug = req.params.slug;
      const temp = slug.split('-');
      // Mã sản phẩm nằm ở phần tử cuối cùng
      const id = temp.pop();
      const product = await productModel.find(id);
      const category_id = product.category_id;

      // Lấy tất cả các danh mục đổ ra view
      const categories = await categoryModel.all();

      const imageItems = await product.getImageItems();

      const brand = await product.getBrand();

      // Lấy comments của product
      const comments = await product.getComments();

      // Lấy sản phẩm có liên quan
      const conds = {
        'category_id' : {
          'type': '=',
          'val' : category_id //3
        },
        'id': {
          'type' : '!=',
          'val' : id
        }
      }
      // SELECT * FROM view_product WHERE category_id = 3 AND id != 2

      const relatedProducts = await product.getBy(conds);
      
      res.render("product/detail", {
        product: product,
        category_id: category_id,
        categories: categories,
        imageItems: imageItems,
        brand : brand,
        comments : comments,
        relatedProducts : relatedProducts
      });
    } catch (error) {
       // 500 là lỗi internal server(Lỗi xảy ra ở server)
       console.log(error); //Dành cho dev xem
       res.status(500).send(error.message); //Cho người dùng xem
    }
  };

  // Đánh giá sản phẩm
  static storeComment = async (req, res) => {
    // trycatch
    try {
      // Lưu comment xuống database
      const data = {
        product_id: req.body.product_id,
        email: req.body.email,
        fullname: req.body.fullname,
        star: req.body.rating,
        created_date: req.app.locals.helpers.getCurrentDateTime(),
        description: req.body.description
      }
      // lấy product
      const product = await productModel.find(req.body.product_id);
      
     
      await commentModel.save(data);

       // Lấy comments của product
       const comments = await product.getComments();
       
      res.render("product/comments", {
        comments : comments,
        layout: false //không render layout, chỉ lấy view chính
      });
     
    } catch (error) {
       // 500 là lỗi internal server(Lỗi xảy ra ở server)
       console.log(error); //Dành cho dev xem
       res.status(500).send(error.message); //Cho người dùng xem
    }
  };
}

module.exports = ProductController;
