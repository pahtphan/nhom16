const db = require("./db");
const collection = db.collection("registers");
class Register {
  constructor(id, student_id, subject_id, score, student_name, subject_name) {
    this.id = id;
    this.student_id = student_id;
    this.subject_id = subject_id;
    this.score = score;
    this.student_name = student_name;
    this.subject_name = subject_name;
  }

  // SELECT_ALL_QUERY = `
  // SELECT register.*, student.name AS student_name,subject.name
  // AS subject_name FROM register
  // JOIN student ON student.id =register.student_id
  // JOIN subject ON subject.id =register.subject_id`;
  // buildLimit = (page = null, item_per_page = null) => {
  //   let limit = "";
  //   if (page && item_per_page) {
  //     const row_index = (page - 1) * item_per_page;
  //     limit = `LIMIT ${row_index},${item_per_page}`;
  //     // Trang 1 : LIMIT 0,4
  //     // Trang 2 : LIMIT 4,4
  //     // Trang 3 : LIMIT 8,4
  //   }
  //   return limit;
  // };
  all = async (page = null, item_per_page = null) => {
    const pipeline = [
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "student_id",
          as: "student_info",
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subject_id",
          foreignField: "subject_id",
          as: "subject_info",
        },
      },
      {
        $project: {
          _id: 0,
          register_id: 1,
          student_id: 1,
          subject_id: 1,
          score: 1,
          "student_info.name": 1,
          "subject_info.name": 1,
        },
      },
    ];

    try {
      // Xây dựng phân trang
      let rows = [];
      if (page && item_per_page) {
        const skip_number = (page - 1) * item_per_page;
        rows = await collection
          .aggregate(pipeline)
          .skip(skip_number)
          .limit(item_per_page)
          .toArray();
      } else {
        rows = await collection.aggregate(pipeline).toArray();
      }

      const registers = rows.map((row) => this.convertToObject(row));
      return registers;
    } catch (error) {
      throw new Error(error);
    }
  };
  getByPattern = async (pattern, page = null, item_per_page = null) => {
    const pipeline = [
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "student_id",
          as: "student_info",
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subject_id",
          foreignField: "subject_id",
          as: "subject_info",
        },
      },
      {
        $project: {
          _id: 0,
          register_id: 1,
          student_id: 1,
          subject_id: 1,
          score: 1,
          "student_info.name": 1,
          "subject_info.name": 1,
        },
      },
      {
        $match: {
          $or: [
            { "student_info.name": { $regex: pattern, $options: "i" } },
            { "subject_info.name": { $regex: pattern, $options: "i" } },
          ],
        },
      },
    ];

    try {
      // Xây dựng phân trang
      let rows = [];
      if (page && item_per_page) {
        const skip_number = (page - 1) * item_per_page;
        rows = await collection
          .aggregate(pipeline)
          .skip(skip_number)
          .limit(item_per_page)
          .toArray();
      } else {
        rows = await collection.aggregate(pipeline).toArray();
      }
      const registers = rows.map((row) => this.convertToObject(row));
      return registers;
    } catch (error) {
      throw new Error(error);
    }
  };
  save = async (data) => {
    const row = await collection.findOne({}, { sort: { register_id: -1 } });
    const newInsertId = row ? row.register_id + 1 : 1;

    await collection.insertOne({
      register_id: newInsertId,
      student_id: Number(data.student_id),
      subject_id: Number(data.subject_id),
    });
    // insertId là mã tự động tăng của database
    return newInsertId;
  };

  // Chuyển 1 dòng dữ liệu thô thành 1 đối tượng register
  convertToObject = (row) => {
    return new Register(row.register_id,row.student_id,row.subject_id,
      row.score ? row.score.toFixed(2) : null,
      row.student_info[0].name,
      row.subject_info[0].name
    );
  };
  // Trả về 1 đối tượng Register dựa vào mã đăng ký môn học
  find = async (id) => {
    const pipeline = [
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "student_id",
          as: "student_info",
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subject_id",
          foreignField: "subject_id",
          as: "subject_info",
        },
      },
      {
        $project: {
          _id: 0,
          register_id: 1,
          student_id: 1,
          subject_id: 1,
          score: 1,
          "student_info.name": 1,
          "subject_info.name": 1,
        },
      },
      {
        $match: {
          register_id: Number(id),
        },
      },
    ];

    try {
      // Xây dựng phân trang
      const rows = await collection.aggregate(pipeline).toArray();
      const registers = rows.map((row) => this.convertToObject(row));
      const register = registers[0];
      return register;
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async () => {
    try {
      const query = { register_id: this.id }; //where
      const set = {
        $set: {
          score: Number(this.score),
        },
      };
      await collection.updateOne(query, set);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  };

  destroy = async () => {
    try {
      const query = {register_id:this.id};
      await collection.deleteOne(query);
      return true;
    }
     catch (error) {
      throw new Error(error);
    }
  };

  getNumberByStudentId = async (student_id) => {
    // // Xây dựng phân trang
    // const limit = this.buildLimit(page, item_per_page);
    // // query database
    // const [rows, files] = await pool.execute(
    //   `${this.SELECT_ALL_QUERY} WHERE student_id = ? ${limit}`,
    //   [student_id]
    // );
    // const registers = rows.map((row) => this.convertToObject(row));
    // return registers;
    
    const query = {student_id:Number(student_id)};
    try {
      // Xây dựng phân trang
      const num = await collection.countDocuments(query);
      return num;
    } catch (error) {
      throw new Error(error);
    }
  };
  getNumberBySubjectId = async (subject_id) => {
    const query = {subject_id:Number(subject_id)};
    try {
      // Xây dựng phân trang
      const num = await collection.countDocuments(query);
      return num;
    } catch (error) {
      throw new Error(error);
    }
  };
}
module.exports = new Register();
