
const express = require("express");
const cors = require("cors");

const bookingRoutes = require("./routes/bookingRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/bookings", bookingRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Uma Tours And Travel API is running!"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});