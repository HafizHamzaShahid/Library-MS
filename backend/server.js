const express = require("express");
const cors = require("cors");
const { connectFashionDb } = require("./fashionDb");
const fashionRouter = require("./routes/fashionRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/fashion", fashionRouter);

// Connect Mongoose and start server
(async () => {
  try {
    await connectFashionDb();
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();

