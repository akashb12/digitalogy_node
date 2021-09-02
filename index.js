const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/key");
const mongoose = require("mongoose");
const apiErrorHandler = require("./errorHandling/errorHandler");
const app = express();

const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/todos", require("./routes/todoRoute"));
app.use(apiErrorHandler);
const port = config.port;
app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
