const db = require("./db");
const collection = db.collection('subjects');
class Subject {
  constructor(id, name, number_of_credit) {
    this.id = id;
    this.name = name;
    this.number_of_credit = number_of_credit;
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

      const subjects = rows.map((row) => this.convertToObject(row));
      return subjects;
    } catch (error) {
      throw new Error(error);
    }
  };
  getByPattern = async (pattern, page = null, item_per_page = null) => {
    try {
      const query = { name: { $regex: pattern, $options: "i" } };
      // const conga = `/${pattern}/i`;
      // console.log(conga);
      // const query = { name: { $regex: new RegExp(pattern, 'i')} };
      // Tìm kiếm chính xác là viết đúng tên trên mongodb
      // Tức là tìm Tý thì viết đủ Tý
      // const query = {name:pattern};
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
        rows = await collection.find(query).toArray();
      }

      const subjects = rows.map((row) => this.convertToObject(row));
      return subjects;
    } catch (error) {
      throw new Error(error);
    }
  };

  save = async (data) => {
     // Sắp xếp theo student_id giảm dần , lấy subject_id của thằng đầu tiên cộng thêm 1 => newInsertId
    //{} là tìm hết
    // -1 là giảm dần
    // findOne không có toArray() bởi vì find(query) là lấy nhiều thằng nên cần mảng
    // Còn findOne() là lấy 1 tg nên không cần toArray()
    const row = await collection.findOne({},{sort:{subject_id: -1}});
    const newInsertId =row ? row.subject_id + 1 : 1;

    await collection.insertOne({
      subject_id: newInsertId ,
      name : data.name,
      number_of_credit : data.number_of_credit,
     
    });
    // insertId là mã tự động tăng của database
    return newInsertId;
  };

  // Chuyển 1 dòng dữ liệu thô thành 1 đối tượng subject
  convertToObject = (row) => {
    return new Subject(row.subject_id, row.name, row.number_of_credit);
  };
  // Trả về 1 đối tượng Subject dựa vào mã môn học
  find = async (id) => {
    try {
      const query = {subject_id:Number(id)};
      const row = await collection.findOne(query);

      const subjects =this.convertToObject(row);
      return subjects;
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async () => {
    try {
      const query = {subject_id:this.id};//where
      const set = {
        $set:{
          name: this.name,
          number_of_credit: this.number_of_credit,
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
      const query = {subject_id:this.id};
      await collection.deleteOne(query);
      return true;
    }
     catch (error) {
      throw new Error(error);
    }
  };
}
module.exports = new Subject();
