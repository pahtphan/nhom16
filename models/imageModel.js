const path = require("path");
const sql = require("../config/connectMysql");
const fs = require("fs");

async function getAllImg() {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM godashop_k98.image_item`, (err, res) => {
      if (err) {
        reject(err);
      } else {
        const dataImage = JSON.parse(JSON.stringify(res));
        resolve(dataImage);
      }
    });
  });
}

async function addNewImg(img, productID) {
  return new Promise((resolve, reject) => {
    sql.query(
      `INSERT INTO godashop_k98.image_item (product_id, name) VALUE (${productID},'${img}')`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
}

async function UpdateImg(img, productID) {
  return new Promise((resolve, reject) => {
    sql.query(
      `DELETE FROM godashop_k98.image_item WHERE product_id = ${productID}`,
      (er, re) => {
        if (er) {
          reject(er);
        } else {
          sql.query(
            `INSERT INTO godashop_k98.image_item (name, product_id) values ('${img}', ${productID})`,
            (err, res) => {
              if (err) {
                reject(err);
              } else {
                sql.query(
                  `UPDATE godashop_k98.product set featured_image = '${img}' WHERE id = ${productID}`,
                  (err, res) => {
                    if (err) {
                      reject(err);
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
  });
}

async function deleteImage(id_img) {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT name from godashop_k98.image_item WHERE id = ${id_img}`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          const pat = path.join(__dirname, "../public/images");
          const dataImg = JSON.parse(JSON.stringify(res));
          console.log(pat + "/" + dataImg[0].name);
          try {
            fs.unlinkSync(pat + "/" + dataImg[0].name);
          } catch (error) {}
          sql.query(
            `DELETE FROM godashop_k98.image_item WHERE id = ${id_img}`,
            (err1, res1) => {
              if (err1) {
                reject(err1);
              } else {
                resolve(true);
              }
            }
          );
        }
      }
    );
  });
}

async function deleteMoreImg(idList) {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT name from godashop_k98.image_item WHERE id in (${idList})`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          const pat = path.join(__dirname, "../public/images");
          const dataImg = JSON.parse(JSON.stringify(res));

          for (data of dataImg) {
            try {
              fs.unlinkSync(pat + "/" + data.name);
            } catch (error) {}
          }

          sql.query(
            `DELETE FROM godashop_k98.image_item WHERE id in (${idList})`,
            (err1, res1) => {
              if (err1) {
                reject(err1);
              } else {
                resolve(true);
              }
            }
          );
        }
      }
    );
  });
}

module.exports.getAllImg = getAllImg;
module.exports.addNewImg = addNewImg;
module.exports.UpdateImg = UpdateImg;
module.exports.deleteImage = deleteImage;
module.exports.deleteMoreImg = deleteMoreImg;
