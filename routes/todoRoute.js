const express = require("express");
const router = express.Router();
const {
  createTask,
  completeTask,
  getAllTasks,
} = require("../controller/todoController");
const catchAsync = require("../errorHandling/catchAsync");
router.get("/getTasks", catchAsync(getAllTasks));
router.post("/addTodo", catchAsync(createTask));
router.patch("/completeTodo/:id", catchAsync(completeTask));
module.exports = router;
