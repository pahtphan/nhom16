const sql = require("../config/connectMysql");
const { subMonths, format } = require("date-fns");
const [getAllProduct, getProductByID] = require("../models/productModel");

async function getAllOrder() {
  return new Promise((resolve, reject) => {
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    var formattedDate = format(currentDate, "yyyy-MM-dd");
    var fmnextDate = format(nextDate, "yyyy-MM-dd");
    formattedDate = formattedDate + " 00:00:00";
    fmnextDate = fmnextDate + " 00:00:00";
    sql.query(
      `SELECT godashop_k98.order.id, godashop_k98.customer.name, godashop_k98.order.shipping_ward_id ,godashop_k98.customer.shipping_name , godashop_k98.customer.mobile, godashop_k98.customer.email, godashop_k98.order.order_status_id, godashop_k98.order.created_date, godashop_k98.order.payment_method, godashop_k98.order.shipping_mobile, godashop_k98.order.delivered_date, godashop_k98.order.shipping_fee , SUM(godashop_k98.order_item.total_price) as total, ( sum(godashop_k98.order_item.total_price) + godashop_k98.order.shipping_fee) as toltalwfee, godashop_k98.customer.housenumber_street, godashop_k98.staff.name as staffname from godashop_k98.order inner join godashop_k98.order_item on godashop_k98.order.id = godashop_k98.order_item.order_id inner join godashop_k98.customer on godashop_k98.order.customer_id = godashop_k98.customer.id inner join godashop_k98.staff on godashop_k98.order.staff_id = godashop_k98.staff.id GROUP BY godashop_k98.order_item.order_id ORDER BY godashop_k98.order.id DESC`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          const dataJson = JSON.parse(JSON.stringify(result));
          console.log(dataJson);
          resolve(dataJson);
        }
      }
    );
  });
}

function getOrderToday() {
  console.log("today");
  return new Promise((resolve, reject) => {
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    var formattedDate = format(currentDate, "yyyy-MM-dd");
    var fmnextDate = format(nextDate, "yyyy-MM-dd");
    formattedDate = formattedDate + " 00:00:00";
    fmnextDate = fmnextDate + " 00:00:00";
    sql.query(
      `SELECT godashop_k98.order.id, godashop_k98.customer.name, godashop_k98.order.shipping_ward_id ,godashop_k98.customer.shipping_name , godashop_k98.customer.mobile, godashop_k98.customer.email, godashop_k98.order.order_status_id, godashop_k98.order.created_date, godashop_k98.order.payment_method, godashop_k98.order.shipping_mobile, godashop_k98.order.delivered_date, godashop_k98.order.shipping_fee , SUM(godashop_k98.order_item.total_price) as total, ( sum(godashop_k98.order_item.total_price) + godashop_k98.order.shipping_fee) as toltalwfee, godashop_k98.customer.housenumber_street, godashop_k98.staff.name as staffname from godashop_k98.order inner join godashop_k98.order_item on godashop_k98.order.id = godashop_k98.order_item.order_id inner join godashop_k98.customer on godashop_k98.order.customer_id = godashop_k98.customer.id inner join godashop_k98.staff on godashop_k98.order.staff_id = godashop_k98.staff.id WHERE godashop_k98.order.created_date >= "${formattedDate}" AND godashop_k98.order.created_date < "${fmnextDate}" GROUP BY godashop_k98.order_item.order_id ORDER BY godashop_k98.order.id DESC`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          const dataJson = JSON.parse(JSON.stringify(result));
          resolve(dataJson);
        }
      }
    );
  });
}

async function getOrderYesterday() {
  return new Promise((resolve, reject) => {
    const currentDate = new Date();
    const preDate = new Date(currentDate);
    preDate.setDate(currentDate.getDate() + 1);
    var formattedDate = format(currentDate, "yyyy-MM-dd");
    var fmpreDate = format(preDate, "yyyy-MM-dd");
    formattedDate = formattedDate + " 00:00:00";
    fmpreDate = fmpreDate + " 00:00:00";
    sql.query(
      `SELECT godashop_k98.order.id, godashop_k98.customer.name, godashop_k98.order.shipping_ward_id ,godashop_k98.customer.shipping_name , godashop_k98.customer.mobile, godashop_k98.customer.email, godashop_k98.order.order_status_id, godashop_k98.order.created_date, godashop_k98.order.payment_method, godashop_k98.order.shipping_mobile, godashop_k98.order.delivered_date, godashop_k98.order.shipping_fee , SUM(godashop_k98.order_item.total_price) as total, ( sum(godashop_k98.order_item.total_price) + godashop_k98.order.shipping_fee) as toltalwfee, godashop_k98.customer.housenumber_street, godashop_k98.staff.name as staffname from godashop_k98.order inner join godashop_k98.order_item on godashop_k98.order.id = godashop_k98.order_item.order_id inner join godashop_k98.customer on godashop_k98.order.customer_id = godashop_k98.customer.id inner join godashop_k98.staff on godashop_k98.order.staff_id = godashop_k98.staff.id WHERE godashop_k98.order.created_date >= "${fmpreDate}" AND godashop_k98.order.created_date < "${formattedDate}" GROUP BY godashop_k98.order_item.order_id ORDER BY godashop_k98.order.id DESC`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          const dataJson = JSON.parse(JSON.stringify(res));
          console.log("success");
          resolve(dataJson);
        }
      }
    );
  });
}

async function getOrderMonth() {
  return new Promise((resolve, reject) => {
    const currentDate = new Date();
    var currentMonth = format(currentDate, "MM");
    var currentYear = format(currentDate, "yyyy");
    sql.query(
      `SELECT godashop_k98.order.id, godashop_k98.customer.name, godashop_k98.order.shipping_ward_id ,godashop_k98.customer.shipping_name , godashop_k98.customer.mobile, godashop_k98.customer.email, godashop_k98.order.order_status_id, godashop_k98.order.created_date, godashop_k98.order.payment_method, godashop_k98.order.shipping_mobile, godashop_k98.order.delivered_date, godashop_k98.order.shipping_fee , SUM(godashop_k98.order_item.total_price) as total, ( sum(godashop_k98.order_item.total_price) + godashop_k98.order.shipping_fee) as toltalwfee, godashop_k98.customer.housenumber_street, godashop_k98.staff.name as staffname from godashop_k98.order inner join godashop_k98.order_item on godashop_k98.order.id = godashop_k98.order_item.order_id inner join godashop_k98.customer on godashop_k98.order.customer_id = godashop_k98.customer.id inner join godashop_k98.staff on godashop_k98.order.staff_id = godashop_k98.staff.id WHERE YEAR(godashop_k98.order.created_date) = "${currentYear}" AND MONTH(godashop_k98.order.created_date) = "${currentMonth}" GROUP BY godashop_k98.order_item.order_id ORDER BY godashop_k98.order.id`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          const dataJson = JSON.parse(JSON.stringify(res));
          console.log(currentDate + " " + currentMonth + " " + currentYear);
          resolve(dataJson);
        }
      }
    );
  });
}

async function getOrderYear() {
  return new Promise((resolve, reject) => {
    const currentDate = new Date();
    var currentYear = format(currentDate, "yyyy");
    sql.query(
      `SELECT godashop_k98.order.id, godashop_k98.customer.name, godashop_k98.order.shipping_ward_id ,godashop_k98.customer.shipping_name , godashop_k98.customer.mobile, godashop_k98.customer.email, godashop_k98.order.order_status_id, godashop_k98.order.created_date, godashop_k98.order.payment_method, godashop_k98.order.shipping_mobile, godashop_k98.order.delivered_date, godashop_k98.order.shipping_fee , SUM(godashop_k98.order_item.total_price) as total, ( sum(godashop_k98.order_item.total_price) + godashop_k98.order.shipping_fee) as toltalwfee, godashop_k98.customer.housenumber_street, godashop_k98.staff.name as staffname from godashop_k98.order inner join godashop_k98.order_item on godashop_k98.order.id = godashop_k98.order_item.order_id inner join godashop_k98.customer on godashop_k98.order.customer_id = godashop_k98.customer.id inner join godashop_k98.staff on godashop_k98.order.staff_id = godashop_k98.staff.id WHERE YEAR(godashop_k98.order.created_date) = "${currentYear}" GROUP BY godashop_k98.order_item.order_id ORDER BY godashop_k98.order.id DESC`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          const dataJson = JSON.parse(JSON.stringify(res));
          console.log("success");
          resolve(dataJson);
        }
      }
    );
  });
}

async function getOrderWeek() {
  return new Promise((resolve, reject) => {
    console.log("week");
    const currentDate = new Date();
    var monday = new Date(currentDate);
    while (true) {
      if (monday.getDay() === 1) {
        break;
      } else {
        monday.setDate(monday.getDate() - 1);
      }
    }
    var nexDate = new Date(currentDate);
    nexDate.setDate(currentDate.getDate() + 1);
    var mondayFormat = format(monday, "yyyy-MM-dd 00:00:00");
    var nextdayFormat = format(nexDate, "yyyy-MM-dd 00:00:00");
    console.log(mondayFormat + " " + nextdayFormat);
    sql.query(
      `SELECT godashop_k98.order.id, godashop_k98.customer.name, godashop_k98.order.shipping_ward_id ,godashop_k98.customer.shipping_name , godashop_k98.customer.mobile, godashop_k98.customer.email, godashop_k98.order.order_status_id, godashop_k98.order.created_date, godashop_k98.order.payment_method, godashop_k98.order.shipping_mobile, godashop_k98.order.delivered_date, godashop_k98.order.shipping_fee , SUM(godashop_k98.order_item.total_price) as total, ( sum(godashop_k98.order_item.total_price) + godashop_k98.order.shipping_fee) as toltalwfee, godashop_k98.customer.housenumber_street, godashop_k98.staff.name as staffname from godashop_k98.order inner join godashop_k98.order_item on godashop_k98.order.id = godashop_k98.order_item.order_id inner join godashop_k98.customer on godashop_k98.order.customer_id = godashop_k98.customer.id inner join godashop_k98.staff on godashop_k98.order.staff_id = godashop_k98.staff.id WHERE godashop_k98.order.created_date >= "${mondayFormat}" AND godashop_k98.order.created_date < "${nextdayFormat}" GROUP BY godashop_k98.order_item.order_id ORDER BY godashop_k98.order.id DESC`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          const dataJson = JSON.parse(JSON.stringify(res));
          console.log("success");
          resolve(dataJson);
        }
      }
    );
  });
}

async function getpre3month() {
  return new Promise((resolve, reject) => {
    const curDate = new Date();
    const ThreeMonth = subMonths(curDate, 2);
    const nextDate = new Date(curDate);
    nextDate.setDate(curDate.getDate() + 1);
    const nextDateFor = format(nextDate, "yyyy-MM-dd 00:00:00");
    const threeFor = format(ThreeMonth, "yyyy-MM-dd 00:00:00");
    console.log(nextDateFor + " " + threeFor);
    sql.query(
      `SELECT godashop_k98.order.id, godashop_k98.customer.name, godashop_k98.order.shipping_ward_id ,godashop_k98.customer.shipping_name , godashop_k98.customer.mobile, godashop_k98.customer.email, godashop_k98.order.order_status_id, godashop_k98.order.created_date, godashop_k98.order.payment_method, godashop_k98.order.shipping_mobile, godashop_k98.order.delivered_date, godashop_k98.order.shipping_fee , SUM(godashop_k98.order_item.total_price) as total, ( sum(godashop_k98.order_item.total_price) + godashop_k98.order.shipping_fee) as toltalwfee, godashop_k98.customer.housenumber_street, godashop_k98.staff.name as staffname from godashop_k98.order inner join godashop_k98.order_item on godashop_k98.order.id = godashop_k98.order_item.order_id inner join godashop_k98.customer on godashop_k98.order.customer_id = godashop_k98.customer.id inner join godashop_k98.staff on godashop_k98.order.staff_id = godashop_k98.staff.id WHERE godashop_k98.order.created_date >= "${threeFor}" AND godashop_k98.order.created_date < "${nextDateFor}" GROUP BY godashop_k98.order_item.order_id ORDER BY godashop_k98.order.id DESC`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          const dataJson = JSON.parse(JSON.stringify(res));
          console.log("success");
          resolve(dataJson);
        }
      }
    );
  });
}

async function getOrderBySearch(from, to) {
  return new Promise((resolve, reject) => {
    const fromDate = from + " 00:00:00";
    var toDate = new Date(to);
    var nextDate = new Date(toDate);
    nextDate.setDate(toDate.getDate() + 1);
    var nextDate = format(nextDate, "yyyy-MM-dd 00:00:00");
    sql.query(
      `SELECT godashop_k98.order.id, godashop_k98.customer.name, godashop_k98.order.shipping_ward_id ,godashop_k98.customer.shipping_name , godashop_k98.customer.mobile, godashop_k98.customer.email, godashop_k98.order.order_status_id, godashop_k98.order.created_date, godashop_k98.order.payment_method, godashop_k98.order.shipping_mobile, godashop_k98.order.delivered_date, godashop_k98.order.shipping_fee , SUM(godashop_k98.order_item.total_price) as total, ( sum(godashop_k98.order_item.total_price) + godashop_k98.order.shipping_fee) as toltalwfee, godashop_k98.customer.housenumber_street, godashop_k98.staff.name as staffname from godashop_k98.order inner join godashop_k98.order_item on godashop_k98.order.id = godashop_k98.order_item.order_id inner join godashop_k98.customer on godashop_k98.order.customer_id = godashop_k98.customer.id inner join godashop_k98.staff on godashop_k98.order.staff_id = godashop_k98.staff.id WHERE godashop_k98.order.created_date >= "${fromDate}" AND godashop_k98.order.created_date < "${nextDate}" GROUP BY godashop_k98.order_item.order_id ORDER BY godashop_k98.order.id DESC`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          const dataJson = JSON.parse(JSON.stringify(res));
          console.log("by search");
          resolve(dataJson);
        }
      }
    );
  });
}

async function deleteOrder(id_order) {
  return new Promise((resolve, reject) => {
    sql.query(
      `DELETE FROM godashop_k98.order_item WHERE order_id = ${id_order}`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          sql.query(
            `DELETE FROM godashop_k98.order WHERE id = ${id_order};`,
            (err1, res) => {
              if (err) {
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

async function editOrder(
  orderID,
  status,
  receive_name,
  phone_recei,
  payment_med,
  ship_fee,
  address,
  ship_date,
  staff_id,
  ward_id,
  shipfee
) {
  return new Promise((resolve, reject) => {
    sql.query(
      `UPDATE godashop_k98.order set order_status_id = ${status} , staff_id = ${staff_id} ,shipping_fullname = '${receive_name}' , shipping_mobile = '${phone_recei}' , payment_method = ${payment_med} , shipping_fee = ${ship_fee} , shipping_housenumber_street = '${address}', delivered_date = '${ship_date}', shipping_ward_id = '${ward_id}' , shipping_fee=${shipfee} WHERE id = ${orderID} `,
      (err, res) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
}

async function getOrderById(id) {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT godashop_k98.order.customer_id, godashop_k98.order.id, godashop_k98.customer.name, godashop_k98.order.shipping_ward_id ,godashop_k98.customer.shipping_name , godashop_k98.customer.mobile, godashop_k98.customer.email, godashop_k98.order.order_status_id, godashop_k98.order.created_date, godashop_k98.order.payment_method, godashop_k98.order.shipping_mobile, godashop_k98.order.delivered_date, godashop_k98.order.shipping_fee , SUM(godashop_k98.order_item.total_price) as total, ( sum(godashop_k98.order_item.total_price) + godashop_k98.order.shipping_fee) as toltalwfee, godashop_k98.customer.housenumber_street, godashop_k98.order.staff_id from godashop_k98.order inner join godashop_k98.order_item on godashop_k98.order.id = godashop_k98.order_item.order_id inner join godashop_k98.customer on godashop_k98.order.customer_id = godashop_k98.customer.id WHERE godashop_k98.order.id = ${id} GROUP BY godashop_k98.order_item.order_id ORDER BY godashop_k98.order.id`,
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

async function getOrder_item(id_order) {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT godashop_k98.order.id as order_id ,godashop_k98.product.barcode,godashop_k98.product.name as product_name,product.name , product.id as product_id, product.featured_image, order_item.unit_price,order_item.qty, order_item.total_price from order_item inner join product on order_item.product_id = product.id inner join godashop_k98.order on order_item.order_id = godashop_k98.order.id WHERE order_item.order_id = ${id_order}`,
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

async function getItemOrder_byID(id_product, id_order) {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT godashop_k98.order.id as order_id , product.name , product.id as product_id, product.featured_image, order_item.unit_price,order_item.qty, order_item.total_price from order_item inner join product on order_item.product_id = product.id inner join godashop_k98.order on order_item.order_id = godashop_k98.order.id WHERE product_id = ${id_product} AND order_id = ${id_order}`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log("hello ");
          const dataJson = JSON.parse(JSON.stringify(res));
          console.log(dataJson);
          resolve(dataJson);
        }
      }
    );
  });
}

async function deleteOrder_item(idList, idOrder) {
  return new Promise((resolve, reject) => {
    sql.query(
      `DELETE FROM godashop_k98.order_item WHERE order_item.product_id IN (${idList}) and order_id = ${idOrder}`,
      (err, res) => {
        if (err) {
          reject(false);
        } else {
          sql.query(
            `SELECT COUNT(order_id) as count FROM godashop_k98.order_item WHERE order_id = ${idOrder}`,
            (err1, res1) => {
              if (err1) {
                reject(false);
              } else {
                const dataJson = JSON.parse(JSON.stringify(res1));
                const count = dataJson[0].count;
                console.log(count);
                if (count <= 0) {
                  console.log("finish");
                  sql.query(
                    "SELECT godashop_k98.product.id FROM godashop_k98.product WHERE godashop_k98.product.barcode = '0' and godashop_k98.product.name ='null' and godashop_k98.product.price = 0 ",
                    (err3, res3) => {
                      if (err3) {
                        console.log(err3);
                      } else {
                        const dataJSON = JSON.parse(JSON.stringify(res3));
                        const dataid = dataJSON[0].id;
                        console.log(dataJSON);
                        sql.query(
                          `INSERT INTO godashop_k98.order_item VALUES (${dataid},${idOrder},0,0,0)`,
                          (err4, res4) => {
                            if (err4) {
                              console.log(err4);
                            } else {
                              resolve(true);
                            }
                          }
                        );
                      }
                    }
                  );
                } else {
                  resolve(true);
                }
              }
            }
          );
        }
      }
    );
  });
}

async function addOrder_item(id_pro, idOrder) {
  return new Promise((resolve, reject) => {
    try {
      sql.query(
        `SELECT COUNT(product_id) as count FROM godashop_k98.order_item WHERE product_id = ${id_pro} AND order_id = ${idOrder}`,
        async (err, res) => {
          if (err) {
            reject([false, null]);
          } else {
            const data = JSON.parse(JSON.stringify(res));
            const count = data[0].count;
            if (count > 0) {
              sql.query(
                `SELECT * FROM godashop_k98.order_item WHERE product_id = ${id_pro} AND order_id = ${idOrder}`,
                (err0, res0) => {
                  if (err0) {
                    reject([false, null]);
                  } else {
                    const dataJson = JSON.parse(JSON.stringify(res0));
                    var unit_price = dataJson[0].unit_price;
                    var total_price = dataJson[0].total_price;
                    var qty = dataJson[0].qty;
                    total_price += unit_price;
                    qty += 1;
                    sql.query(
                      `UPDATE godashop_k98.order_item set qty = ${qty} , total_price = ${total_price} WHERE product_id = ${id_pro} AND order_id = ${idOrder}`,
                      (err1, res1) => {
                        if (err1) {
                          reject([false, null]);
                        } else {
                          resolve([true, "exist"]);
                        }
                      }
                    );
                  }
                }
              );
            } else {
              const dataProduct = await getProductByID(id_pro);
              var unit_price = dataProduct[0].price;
              var total_price = dataProduct[0].price;
              var qty = 1;
              sql.query(
                `INSERT INTO godashop_k98.order_item VALUES(${id_pro}, ${idOrder} , ${qty} , ${unit_price}, ${total_price})`,
                (err1, res1) => {
                  if (err1) {
                    reject([false, null]);
                  } else {
                    resolve([true, "non_exist"]);
                  }
                }
              );
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
}

async function Accpt_Order(id) {
  return new Promise((resolve, reject) => {
    sql.query("SET FOREIGN_KEY_CHECKS = 0;");
    sql.query(
      `UPDATE godashop_k98.order SET godashop_k98.order.order_status_id = 2 WHERE id = ${id}`,
      (err, res) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
}

async function CreateOrder(
  id_cus,
  shipname,
  shipphone,
  address,
  shipDate,
  id_status_order,
  id_staff,
  paymed,
  ward_id,
  shipfee
) {
  return new Promise((resolve, reject) => {
    const date = new Date();
    const currentDate = format(date, "yyyy-MM-dd HH:mm:ss");
    const curDateFor = format(date, "yyyy-MM-dd");
    const shipDateFor = format(shipDate, "yyyy-MM-dd");
    console.log(curDateFor + " " + shipDateFor);
    if (shipDateFor >= curDateFor) {
      sql.query(
        "SELECT godashop_k98.product.id FROM godashop_k98.product WHERE godashop_k98.product.barcode = '0' and godashop_k98.product.name ='null' and godashop_k98.product.price = 0 ",
        (err, res1) => {
          if (err) {
            reject(false);
          } else {
            const datajson = JSON.parse(JSON.stringify(res1));
            const dataid = datajson[0].id;
            console.log(dataid);
            console.log(ward_id);
            sql.query(
              `INSERT INTO godashop_k98.order (created_date, order_status_id, staff_id, customer_id, shipping_fullname, shipping_mobile, payment_method, shipping_ward_id, shipping_housenumber_street, shipping_fee, delivered_date) VALUES ('${currentDate}',${id_status_order},${id_staff},${id_cus},'${shipname}','${shipphone}',${paymed},'${ward_id}','${address}' , ${shipfee}, '${shipDateFor}')`,
              (err1, res) => {
                if (err1) {
                  console.log(err1);
                } else {
                  console.log("add finish");
                  sql.query(
                    `SELECT godashop_k98.order.id from godashop_k98.order WHERE godashop_k98.order.created_date = '${currentDate}'`,
                    (err2, res2) => {
                      if (err2) {
                        console.log(err2);
                        reject(err2);
                      } else {
                        console.log("select finish");
                        const datajson = JSON.parse(JSON.stringify(res2));
                        const data_order_id = datajson[0].id;
                        sql.query(
                          `INSERT INTO godashop_k98.order_item VALUES (${dataid},${data_order_id},0,0,0)`,
                          (err, res3) => {
                            if (err) {
                              reject(false);
                            } else {
                              console.log("select finish");
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
    } else {
      resolve("wrongDate");
    }
  });
}

async function deleteOrderList(orderList) {
  return new Promise((resolve, reject) => {
    sql.query(
      `DELETE FROM godashop_k98.order_item WHERE order_id in (${orderList})`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          sql.query(
            `DELETE FROM godashop_k98.order WHERE id in (${orderList});`,
            (err1, res) => {
              if (err) {
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

module.exports = [
  getAllOrder,
  getOrderToday,
  getOrderYesterday,
  getOrderYear,
  getOrderMonth,
  getOrderWeek,
  getpre3month,
  getOrderBySearch,
  deleteOrder,
  getOrderById,
  getOrder_item,
  deleteOrder_item,
  addOrder_item,
  getItemOrder_byID,
  editOrder,
  Accpt_Order,
  CreateOrder,
  deleteOrderList,
];
