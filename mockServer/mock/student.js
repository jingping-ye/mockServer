const Mock = require('mockjs');
let list = [];
const count = 100;

for (let i = 0; i < count; i++) {
  list.push(
    Mock.mock({
      id: '@increment',
      stuNo: 20220000 + parseInt(`${i + 1}`),
      stuName: '@cname',
      stuGender: '@integer(0,1)',
      stuPhone: /^1[0-9]{10}$/,
      stuBirthday: '@date("yyyy-MM-dd")',
      classNo: '@integer(201901,201912)'
    })
  );
}

//  增加学生
exports.add = (req, res) => {
  const { classNo, stuBirthday, stuGender, stuName, stuPhone } = req.body;
  list.push({
    id: list[list.length - 1].id + 1,
    stuNo: list[list.length - 1].stuNo + 1,
    classNo: classNo,
    stuBirthday: stuBirthday,
    stuGender: stuGender,
    stuName: stuName,
    stuPhone: stuPhone
  });
  let msg = {
    code: 20000,
    data: {
      listNum: list.length,
      message: '添加成功!'
    }
  };
  res.status(200).json(msg);
};

//  删除学生
exports.delete = (req, res) => {
  const id = req.params.id;

  //  判断id是否存在
  let flag = list.some(item => {
    if (item.id == id) {
      return true;
    }
  });

  if (flag) {
    // id 存在
    list = list.filter(item => item.id !== parseInt(id));
    const msg = {
      code: 20000,
      data: {
        listNum: list.length,
        message: '删除成功!'
      }
    };
    res.status(200).json(msg);
  } else {
    //  id不存在
    const msg = {
      code: 40000,
      data: {
        msg: 'id不存在!'
      }
    };
    res.status(500).json(msg);
  }
};
//  更新学生信息
exports.update = (req, res) => {
  const { id, classNo, stuBirthday, stuGender, stuName, stuPhone } = req.body;

  //  判断id是否存在
  let flag = list.some(item => {
    if (item.id == id) {
      return true;
    }
  });

  if (flag) {
    //  id存在
    list.some(item => {
      if (item.id === id) {
        item.classNo = classNo;
        item.stuBirthday = stuBirthday;
        item.stuGender = stuGender;
        item.stuName = stuName;
        item.stuPhone = stuPhone;
      }
    });
    let msg = {
      code: 20000,
      data: {
        message: '更新成功!'
      }
    };
    res.status(200).json(msg);
  } else {
    //  id不存在
    const msg = {
      code: 40000,
      data: {
        msg: 'id不存在!'
      }
    };
    res.status(500).json(msg);
  }
};
//  查询学生信息
exports.find = (req, res) => {
  let { queryStr, page = 1, limit = 10 } = req.body;
  //  根据学生姓名查询学生或者返回所有学生信息

  const mockList = queryStr && queryStr.length > 0 ? list.filter(item => item.stuName.includes(queryStr)) : list;
  //  数据分页
  const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
  let msg = {
    code: 20000,
    count: mockList.length,
    data: pageList
  };
  res.status(200).json(msg);
};

//  根据id返回学生信息
exports.findById = (req, res) => {
  const id = req.query.id;
  const pageList = list.filter(item => item.id == id);
  const msg = {
    code: 20000,
    data: pageList
  };
  res.status(200).json(msg);
};
