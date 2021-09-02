const ApiError = require("../errorHandling/ApiError");
const { Task } = require("../model/Task");

module.exports.createTask = async (req, res, next) => {
  const checkUser = await Task.findOne({ name: req.body.name });
  if (checkUser) {
    next(ApiError.alreadyExist("this item already exist"));
    return;
  }

  const task = new Task({ name: req.body.name, completed: false });
  task.save((err, doc) => {
    if (err) {
      console.log("error", err);
      return res.json({ status: false, err });
    } else {
      return res.status(200).json({
        status: true,
        data: doc,
      });
    }
  });
};

// complete task
module.exports.completeTask = async (req, res, next) => {
  const update = await Task.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    { new: true }
  );
  res.json({ status: true, data: update });
};

// get all tasks
module.exports.getAllTasks = async (req, res, next) => {
  let query =
    req.query.filter == "remaining"
      ? { completed: false }
      : req.query.filter == "completed"
      ? { completed: true }
      : {};
  const tasks = await Task.find(query);
  if (!tasks) {
    res.json({ data: [] });
  }
  res.json({ data: tasks });
};
