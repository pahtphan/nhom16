const sql = require("../config/connectMysql");

async function getAllStaff() {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT staff.id, role.name as role, staff.name, staff.mobile, staff.username, staff.password, staff.email, staff.is_active from staff join role on staff.role_id = role.id;`,
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

async function getStaffById(id) {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT * FROM godashop_k98.staff WHERE id = ${id}`,
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

async function DeleteStaff(id) {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT id from godashop_k98.order where staff_id = ${id}`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          const dataJson = JSON.parse(JSON.stringify(res));
          if (dataJson.length > 0) {
            console.log("have order");
            var dataArr = [];
            for (eachData of dataJson) {
              dataArr.push(eachData.id);
            }
            const dataStr = dataArr.join(", ");
            sql.query(
              `SELECT * FROM godashop_k98.staff WHERE id != ${id}`,
              (err2, res2) => {
                if (err2) {
                  reject(err2);
                } else {
                  const StafData = JSON.parse(JSON.stringify(res2));
                  const dataReturn = JSON.parse(
                    JSON.stringify({
                      error: true,
                      dataOrder: dataStr,
                      staffdata: StafData,
                    })
                  );
                  resolve(dataReturn);
                }
              }
            );
          } else {
            console.log("non order");
            sql.query(`DELETE FROM staff WHERE id = ${id}`, (err1) => {
              if (err1) {
                reject(err1);
              } else {
                const dataReturn = JSON.parse(JSON.stringify({ error: false }));
                resolve(dataReturn);
              }
            });
          }
        }
      }
    );
  });
}

async function TransferOrder(idstaff, orderStr) {
  return new Promise((resolve, reject) => {
    sql.query(
      `UPDATE godashop_k98.order set staff_id = ${idstaff} WHERE id in (${orderStr})`,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
}

async function NewStaff(name, usname, pass, phone, email, role) {
  return new Promise((resolve, reject) => {
    sql.query(
      `INSERT INTO godashop_k98.staff (role_id, name, mobile, username, password, email, is_active) VALUES(${role}, '${name}', '${phone}', '${usname}', '${pass}', '${email}', 1)`,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
}

async function EditStaff(id, name, usname, phone, email, role) {
  return new Promise((resolve, reject) => {
    sql.query(
      `UPDATE godashop_k98.staff set role_id = ${role}, name = '${name}', mobile = '${phone}', username = '${usname}', email = '${email}' WHERE id = ${id}`,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
}

module.exports = [
  getAllStaff,
  getStaffById,
  DeleteStaff,
  TransferOrder,
  NewStaff,
  EditStaff,
];
