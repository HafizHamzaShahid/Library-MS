const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoClient = require('./assets/database/MongoDB').mongoConnect;

// const userRouter = require("./routes/userRoutes"); // Commented out - single user, no multiple users
const bookRouter = require("./routes/bookRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes

// app.use("/user", userRouter); // Commented out - single user, no multiple users
app.use("/books", bookRouter);

mongoClient(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => 
      console.log(`Server started on http://localhost:${PORT}`)
    );
})


