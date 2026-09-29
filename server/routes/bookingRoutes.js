
const express = require("express");
const router = express.Router();
const db = require("../database");

// Get all bookings for admin
router.get("/", (req, res) => {
  db.all(
    "SELECT * FROM bookings ORDER BY id DESC",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch bookings",
        });
      }

      res.json({
        success: true,
        bookings: rows,
      });
    }
  );
});

// Create a new booking
router.post("/", (req, res) => {
  const {
    full_name,
    email,
    phone,
    destination,
    travel_date,
    guests,
  } = req.body;

  if (
    !full_name?.trim() ||
    !email?.trim() ||
    !phone?.trim() ||
    !destination ||
    !travel_date ||
    !Number.isInteger(guests) ||
    guests < 1 ||
    guests > 50
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid booking details.",
    });
  }

  const sql = `
    INSERT INTO bookings
    (full_name, email, phone, destination, travel_date, guests)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      full_name.trim(),
      email.trim(),
      phone.trim(),
      destination,
      travel_date,
      guests,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to save booking.",
        });
      }

      res.status(201).json({
        success: true,
        message: "Booking saved successfully!",
        bookingId: this.lastID,
      });
    }
  );
});

module.exports = router;