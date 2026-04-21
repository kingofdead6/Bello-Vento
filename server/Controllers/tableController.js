import Table from "../Models/Table.js";
import Reservation from "../Models/Reservation.js";
import asyncHandler from "express-async-handler";

export const addTable = asyncHandler(async (req, res) => {
  const table = await Table.create(req.body);
  res.status(201).json(table);
});

export const getTables = asyncHandler(async (req, res) => {
  const tables = await Table.find();
  res.json(tables);
});

// Check availability for User Side
export const checkAvailability = asyncHandler(async (req, res) => {
  const { date, time, guests } = req.query;
  
  // Find tables that fit the guest count
  const suitableTables = await Table.find({ capacity: { $gte: guests }, isActive: true });
  
  // Find reservations for that specific slot
  const bookings = await Reservation.find({ date, time });
  const bookedTableIds = bookings.map(b => b.table.toString());

  // Filter out booked tables
  const availableTables = suitableTables.filter(t => !bookedTableIds.includes(t._id.toString()));
  
  res.json(availableTables);
});