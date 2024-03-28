const sql = require("../config/connectMysql");

async function getAllComment() {
  return new Promise((resolve, reject) => {
    sql.query(
      "SELECT godashop_k98.product.featured_image, godashop_k98.comment.email,  godashop_k98.comment.fullname, godashop_k98.comment.star, godashop_k98.comment.created_date, godashop_k98.comment.description from godashop_k98.comment join godashop_k98.product on godashop_k98.product.id = godashop_k98.comment.product_id;",
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          const dataJson = JSON.parse(JSON.stringify(res));
          console.log(dataJson);
          resolve(dataJson);
        }
      }
    );
  });
}

module.exports.getAllComment = getAllComment;
