const sql = require("../config/connectMysql");
const { subMonths, format } = require("date-fns");

async function getAllProduct() {
  return new Promise((resolve, reject) => {
    sql.query(
      "SELECT godashop_k98.product.* , godashop_k98.category.name as cate_name from godashop_k98.product left join godashop_k98.category ON godashop_k98.product.category_id = godashop_k98.category.id;",
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          const dataJson = JSON.parse(JSON.stringify(res));
          resolve(dataJson);
        }
      }
    );
  });
}

async function getProductByID(id) {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT * FROM godashop_k98.product WHERE product.id = ${id}`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          const dataJson = JSON.parse(JSON.stringify(res));
          resolve(dataJson);
        }
      }
    );
  });
}

async function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    sql.query(`DELETE from order_item WHERE product_id = ${id}`, (err, res) => {
      if (err) {
        reject(err);
      } else {
        sql.query(
          `DELETE FROM godashop_k98.image_item WHERE product_id = ${id}`,
          (err1, res) => {
            if (err1) {
              reject(err1);
            } else {
              sql.query(
                `DELETE FROM godashop_k98.comment WHERE product_id = ${id}`,
                (err0, res) => {
                  if (err0) {
                    reject(err0);
                  } else {
                    sql.query(
                      `DELETE FROM godashop_k98.product WHERE id = ${id}`,
                      (err2, res) => {
                        if (err2) {
                          reject(err2);
                        } else {
                          resolve(true);
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    });
  });
}

async function deleteMoreThanOne(proList) {
  return new Promise((resolve, reject) => {
    sql.query(
      `DELETE from order_item WHERE product_id in (${proList})`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          sql.query(
            `DELETE FROM godashop_k98.image_item WHERE product_id in (${proList})`,
            (err1, res) => {
              if (err1) {
                reject(err1);
              } else {
                sql.query(
                  `DELETE FROM godashop_k98.comment WHERE product_id in (${proList})`,
                  (err0, res) => {
                    if (err0) {
                      reject(err0);
                    } else {
                      sql.query(
                        `DELETE FROM godashop_k98.product WHERE id in (${proList})`,
                        (err2, res) => {
                          if (err2) {
                            reject(err2);
                          } else {
                            resolve(true);
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });
}

async function addNewProduct(name, price, qty, cate_id, isFeat, img, descript) {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT godashop_k98.product.barcode from godashop_k98.product ORDER BY barcode DESC LIMIT 1`,
      (err1, res1) => {
        if (err1) {
          reject(err1);
        } else {
          const barcodeData = JSON.parse(JSON.stringify(res1));
          const lastestBarcode = Number(barcodeData[0].barcode);
          const nextBarcode = lastestBarcode + 1;
          var curDate = new Date();
          curDate = format(curDate, "yyyy-MM-dd HH:mm:ss");
          sql.query(
            `INSERT INTO godashop_k98.product (barcode, sku, name, price, discount_percentage, discount_from_date , discount_to_date, featured_image , inventory_qty, category_id, brand_id, created_date, description, star, featured) VALUES ('${nextBarcode}', '', '${name}', ${price}, 0, '${curDate}', '${curDate}', '${img}', ${qty}, ${cate_id}, 1, '${curDate}', '${descript}', 0, ${isFeat})`,
            (err2, res2) => {
              if (err2) {
                reject(err2);
              } else {
                sql.query(
                  `SELECT godashop_k98.product.id from godashop_k98.product WHERE godashop_k98.product.barcode = '${nextBarcode}' `,
                  (err3, res3) => {
                    if (err3) {
                      reject(err3);
                    } else {
                      const dataID = JSON.parse(JSON.stringify(res3));
                      const id = dataID[0].id;
                      resolve(id);
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });
}

async function editProduct(
  id_pro,
  name,
  price,
  qty,
  cate_id,
  isFeat,
  img,
  descript,
  hasImg
) {
  return new Promise((resolve, reject) => {
    if (hasImg) {
      sql.query(
        `UPDATE godashop_k98.product set name = '${name}', price = ${price}, inventory_qty = ${qty}, category_id = ${cate_id}, featured = ${isFeat}, description = '${descript}', featured_image = '${img}' WHERE godashop_k98.product.id = ${id_pro}`,
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    } else {
      sql.query(
        `UPDATE godashop_k98.product set name = '${name}', price = ${price}, inventory_qty = ${qty}, category_id = ${cate_id}, featured = ${isFeat}, description = "${descript}" WHERE godashop_k98.product.id = ${id_pro}`,
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    }
  });
}

module.exports = [
  getAllProduct,
  getProductByID,
  deleteProduct,
  deleteMoreThanOne,
  addNewProduct,
  editProduct,
];
