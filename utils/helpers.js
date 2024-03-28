const numeral = require("numeral");
const slugify = require("slugify");
// phân cách hàng ngàn ở việt nam, dùng dấu chấm
// Bạn có thể thấy nó trong node_modules
require("numeral/locales/vi");
numeral.locale("vi");

exports.formatMoney = (money) => {
  return numeral(money).format("0,0");
};

// Trả về tên route do mình định nghĩa
exports.getCurrentRoute = (path) => {
  // Xóa dấu / phía trước path
  // /san-pham.html => san-pham.html
  path = path.startsWith("/") ? path.slice(1) : path;
  // Trang chủ
  if (path == "") {
    // tự đặt
    return "home";
  }

  if (path == "san-pham.html") {
    // tự đặt
    return "product";
  }

  // match tức là trùng khớp với bắt đầu là chữ danh-muc
  if (path.match(/^danh-muc/)) {
    // tự đặt
    return "product";
  }

  if (path == "chinh-sach-thanh-toan.html") {
    // tự đặt
    return "paymentPolicy";
  }

  if (path == "chinh-sach-doi-tra.html") {
    // tự đặt
    return "returnPolicy";
  }

  if (path == "chinh-sach-giao-hang.html") {
    // tự đặt
    return "deliveryPolicy";
  }

  if (path == "lien-he.html") {
    // tự đặt
    return "contact";
  }

  // match tức là trùng khớp với bắt đầu là chữ danh-muc
  // Chuyển trang chi tiết sản phẩm active nút sản phẩm
  if (path.match(/^san-pham/)) {
    // tự đặt
    return "productDetail";
  }

  if (path == "thong-tin-tai-khoan.html") {
    // tự đặt
    return "show";
  }

  if (path == "dia-chi-giao-hang-mac-dinh.html") {
    // tự đặt
    return "shippingDefault";
  }

  if (path == "don-hang-cua-toi.html") {
    // tự đặt
    return "orders";
  }

  if (path.match(/^chi-tiet-don-hang-/)) {
    // tự đặt
    return "orderDetail";
  }
};

// vd: /danh-muc/kem-chong-nang/c3.html
exports.genRouteCategory = (category) => {
  // Chuyển kem chống nắng => kem-chong-nang
  const slug = slugify(category.name, { lower: true });
  return `/danh-muc/${slug}/c${category.id}.html`;
};

// vd: /san-pham/kem-chong-nang-1927.html
exports.genRouteProductDetail = (product) => {
  // Chuyển kem chống nắng => kem-chong-nang
  const slug = slugify(product.name, { lower: true });
  return `/san-pham/${slug}-${product.id}.html`;
};

// gởi email
exports.sendEmail = async (to, subject, content) => {
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    // Xài free với 1-2 email thì được
    // Nếu dùng số lượng lớn 1 ngày 1000k mail thì mua
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_SECRET,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.SMTP_USERNAME, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: content, // html body
  });
  console.log("Message sent : " + info.messageId);
};

exports.santitizeData = (data) => {
  // trả về data đã được làm sạch
  const createDOMPurify = require("dompurify");
  const { JSDOM } = require("jsdom");

  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);
  const clean = DOMPurify.sanitize(data);
  return clean;
};

exports.getCurrentDateTime = () => {
  const { format } = require("date-fns");
  const datetime = format(new Date(), "yyyy-MM-dd H:mm:s");
  //=> '2023-12-02'
  return datetime;
};

// Lấy format của 3 ngày sau tính từ hôm nay
exports.getThreeLaterDateTime = () => {
  const { addDays,format } = require("date-fns");
  const today = new Date();
  const threeDaysLater = addDays(today,3); //3 ngày sau tính từ hôm nay
  const datetime = format(threeDaysLater, "yyyy-MM-dd H:mm:s");
  //=> '2023-12-02 10:04:17'
  return datetime;
};
