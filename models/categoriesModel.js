const sql = require("../config/connectMysql");

async function getAllCate() {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM godashop_k98.category`, (err, res) => {
      if (err) {
        reject(err);
      } else {
        const dataJson = JSON.parse(JSON.stringify(res));
        resolve(dataJson);
      }
    });
  });
}

async function deleteCate(id_cate) {
  return new Promise((resolve, reject) => {
    sql.query("SET FOREIGN_KEY_CHECKS = 0;");
    sql.query(
      `DELETE FROM godashop_k98.category WHERE id in (${id_cate})`,
      (err8, res8) => {
        if (err8) {
          reject(err8);
        } else {
          resolve(true);
        }
      }
    );
  });
}

async function CreateCate(Cate_name) {
  return new Promise((resolve, reject) => {
    sql.query(
      `INSERT INTO godashop_k98.category (name) VALUE('${Cate_name}')`,
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

async function getCateId(id) {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT * from godashop_k98.category where id = ${id}`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          const data = JSON.parse(JSON.stringify(res));
          resolve(data[0]);
        }
      }
    );
  });
}

async function updateCate(id, name) {
  return new Promise((resolve, reject) => {
    sql.query(
      `UPDATE godashop_k98.category set name = '${name}' WHERE id = ${id}`,
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

module.exports.getAllCate = getAllCate;
module.exports.deleteCate = deleteCate;
module.exports.CreateCate = CreateCate;
module.exports.getCateId = getCateId;
module.exports.updateCate = updateCate;
