import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  guests: { type: Number, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  time: { type: String, required: true },
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed'], 
    default: 'pending' 
  },
  // If status is 'pending', this document will auto-delete after 1 hour
  // We handle this via a TTL index in the controller or a cron job.
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// TTL Index: Deletes document 1 hour after createdAt IF status is pending
// Note: You must enable this in MongoDB or handle via cron.
reservationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600, partialFilterExpression: { status: "pending" } });

export default mongoose.model('Reservation', reservationSchema);