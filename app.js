const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
require('dotenv').config();
// Xử lý post data
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// const path= require('path');

// Xử lý session
var session = require("express-session");
var FileStore = require("session-file-store")(session);
var fileStoreOptions = {};

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

// import global(toàn cục) helpers cho toàn bộ project
// Nghĩa là chỗ nào trong project cũng gọi được các hàm/biến trong helpers
const helpers = require("./utils/helpers");
// add helpers vào đối tượng locals trong app
// đối tượng locals mặc định có sẵn trong app
app.locals.helpers = helpers;
// import global(toàn cục) helpers cho toàn bộ project
const path = require("path");

const hostname = "127.0.0.1";
const port = 80;

// Cấu hình hệ thống sử dụng engine view nào
// Set dịch là thiết lập
// view engine là buộc phải viết y chang
app.set("view engine", "ejs");

// Chỉ định view hay (template) nằm ở đâu
//2 tham số:tham số 1 là từ khóa views(không đổi)
// Tham số thứ 2 là đường dẫn đến thư mục chứa template
app.set("views", "./views");

// Chỉ định các file trong thư mục public (file tĩnh)
// __dirname là đường dẫn chứa thư mục của file đang chạy,cụ thể là:
// D:\nodejs\qlsv
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname,'public')));
console.log(__dirname);

app.use(
  session({
    store: new FileStore(fileStoreOptions),
    secret: "con bò",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);



// Dùng middleware
// Trong hàm use là 1 callback function
// Cú pháp app.use (() => { })

app.use((req, res, next) => {
  // Lưu tên route vào trong thuộc tính currentRoute
  app.locals.currentRoute = helpers.getCurrentRoute(req.path);
  app.locals.session = req.session; //Lưu trong locals của app để lấy session xài ở mọi nơi mà không cần controller phải truyền qua view
  next(); //Xử lý tiếp request(yêu cầu)
});

const indexRouter = require("./routers/IndexRouter");
app.use("/", indexRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
