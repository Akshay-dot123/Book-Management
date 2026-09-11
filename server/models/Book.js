const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, index: true },
  author: { type: String, required: true, trim: true, index: true },
  description: { type: String, required: true },
  category: { type: String, required: true, lowercase: true, trim: true, index: true },
  ISBN: { type: String, required: true, unique: true, trim: true, index: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  stock: { type: Number, required: true, min: 0, default: 0 },
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

bookSchema.index({ title: 'text', author: 'text', category: 'text', ISBN: 'text' });

module.exports = mongoose.model('Book', bookSchema);