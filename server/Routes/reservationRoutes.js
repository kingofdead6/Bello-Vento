import express from 'express';
const router = express.Router();
import { createReservation, getReservations } from '../controllers/reservationController.js';

router.route('/').post(createReservation).get(getReservations);

export default router;