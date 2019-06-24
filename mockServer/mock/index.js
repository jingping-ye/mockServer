module.exports = function(app) {
  const student = require('./student');

  //  新增学生
  app.post('/student/add', student.add);

  //  删除学生
  app.delete('/student/delete/:id', student.delete);

  //  更新学生信息
  app.put('/student/update', student.update);

  //  查询学生信息
  app.post('/student/list', student.find);

  //  查询单个学生接口
  app.get('/student', student.findById);
};
