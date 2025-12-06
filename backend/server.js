const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoClient = require('./assets/database/MongoDB').mongoConnect;

const userRouter = require("./routes/userRoutes");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

//Routes

app.use("/user", userRouter);

mongoClient(() => {
    console.log("MongoDB Connected");
app.listen(PORT, () => 
  console.log(`Server started on https://localhost:${PORT}`)
);
})


