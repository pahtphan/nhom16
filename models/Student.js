const { query } = require("express");
const db = require("./db");
const collection = db.collection("students");
const { format } = require("date-fns");
const { student_id } = require("./Register");
class Student {
  constructor(id, name, birthday, gender) {
    this.id = id;
    this.name = name;
    this.birthday = birthday;
    this.gender = gender;
  }
  buildLimit = (page = null, item_per_page = null) => {
    let limit = "";
    if (page && item_per_page) {
      const row_index = (page - 1) * item_per_page;
      limit = `LIMIT ${row_index},${item_per_page}`;
      // Trang 1 : LIMIT 0,4
      // Trang 2 : LIMIT 4,4
      // Trang 3 : LIMIT 8,4
    }
    return limit;
  };
  all = async (page = null, item_per_page = null) => {
    try {
      // Xây dựng phân trang
      let rows = [];
      if (page && item_per_page) {
        const skip_number = (page - 1) * item_per_page;
        rows = await collection
          .find()
          .skip(skip_number)
          .limit(item_per_page)
          .toArray();
      } else {
        rows = await collection.find().toArray();
      }

      const students = rows.map((row) => this.convertToObject(row));
      return students;
    } catch (error) {
      throw new Error(error);
    }
  };
  getByPattern = async (pattern, page = null, item_per_page = null) => {
    try {
      // const conga = `/${pattern}/i`;
      // console.log(conga);
      // const query = { name: { $regex: new RegExp(pattern, 'i')} };
      // Tìm kiếm chính xác là viết đúng tên trên mongodb
      // Tức là tìm Tý thì viết đủ Tý
      // const query = {name:pattern};
      const query = { name: { $regex: pattern, $options: "i" } };
      // Xây dựng phân trang
      let rows = [];
      if (page && item_per_page) {
        const skip_number = (page - 1) * item_per_page;
        rows = await collection
          .find(query)
          .skip(skip_number)
          .limit(item_per_page)
          .toArray();
      } else {
        rows = await collection.find().toArray();
      }

      const students = rows.map((row) => this.convertToObject(row));
      return students;
    } catch (error) {
      throw new Error(error);
    }
  };
  save = async (data) => {
    // Sắp xếp theo student_id giảm dần , lấy student_id của thằng đầu tiên cộng thêm 1 => newInsertId
    //{} là tìm hết
    // -1 là giảm dần
    // findOne không có toArray() bởi vì find(query) là lấy nhiều thằng nên cần mảng
    // Còn findOne() là lấy 1 tg nên không cần toArray()
    const row = await collection.findOne({},{sort:{student_id: -1}});
    const newInsertId =row ? row.student_id + 1 : 1;

    await collection.insertOne({
      student_id: newInsertId ,
      name : data.name,
      birthday : data.birthday,
      gender :data.gender
    });
    // insertId là mã tự động tăng của database
    return newInsertId;
  };

  // Chuyển 1 dòng dữ liệu thô thành 1 đối tượng student
  convertToObject = (row) => {
    const standardBirthday = format(new Date(row.birthday), "yyyy-MM-dd");
    //=> '2014-02-11'
    return new Student(row.student_id, row.name, standardBirthday, row.gender);
  };
  // Trả về 1 đối tượng Student dựa vào mã sinh viên
  find = async (id) => {
    try {
      const query = {student_id:Number(id)};
      const row = await collection.findOne(query);

      const students =this.convertToObject(row);
      return students;
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async () => {
    try {
      const query = {student_id:this.id};//where
      const set = {
        $set:{
          name: this.name,
          birthday: this.birthday,
          gender: this.gender
        }
      };
      await collection.updateOne(query,set);
      return true;
    }
     catch (error) {
      throw new Error(error);
    }
  };

  destroy = async () => {
    try {
      const query = {student_id:this.id};
      await collection.deleteOne(query);
      return true;
    }
     catch (error) {
      throw new Error(error);
    }
  };
}
module.exports = new Student();
