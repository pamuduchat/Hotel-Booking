require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();

const AuthRoute = require("./routes/auth");
const UsersRoute = require("./routes/users");
const HotelsRoute = require("./routes/hotels");
const RoomsRoute = require("./routes/rooms");

// middleware

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", AuthRoute);
app.use("/api/users", UsersRoute);
app.use("/api/hotels", HotelsRoute);
app.use("/api/rooms", RoomsRoute);

// error handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
    app.listen(8000, () => {
      console.log("Listening on port 8000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
