import asyncHandler from "express-async-handler";
import Reservation from "../Models/Reservation.js";

export const createReservation = asyncHandler(async (req, res) => {
  const { name, email, phone, guests, date, time, tableNumber } = req.body;

  // 1. Validation
  if (!name || !email || !date || !time || !tableNumber) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // 2. One-Week Restriction Logic
  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(today.getDate() + 7);

  if (bookingDate < today || bookingDate > oneWeekFromNow) {
    res.status(400);
    throw new Error("Reservations are only open for the upcoming 7 days.");
  }

  // 3. Check for double-booking
  const alreadyBooked = await Reservation.findOne({ date, time, tableNumber });
  if (alreadyBooked) {
    res.status(400);
    throw new Error("This table is already reserved for this time slot.");
  }

  const reservation = await Reservation.create({
    name, email, phone, guests, date, time, tableNumber
  });

  res.status(201).json(reservation);
});

export const getReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find().sort({ date: 1, time: 1 });
  res.status(200).json(reservations);
});