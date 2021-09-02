const express = require("express");
const router = express.Router();
const {
  createTask,
  completeTask,
  getAllTasks,
  deleteTask,
} = require("../controller/todoController");
const catchAsync = require("../errorHandling/catchAsync");
router.get("/getTodos", catchAsync(getAllTasks));
router.post("/addTodo", catchAsync(createTask));
router.patch("/completeTodo/:id", catchAsync(completeTask));
router.delete("/deleteTodo/:id", catchAsync(deleteTask));
module.exports = router;
