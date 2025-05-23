const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  formationId: { type: Number, required: true },
  userId: { type: Number, required: true },
  comment: { type: String, required: true },
  note: { type: Number, required: true, min: 1, max: 5 },
  dateReview: { type: Date, default: Date.now }
});

module.exports = model('Review', reviewSchema);
