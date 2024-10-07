// server/models/Person.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  dateOfDeath: { type: Date },
  gender: { type: String, required: true },
  birthPlace: { type: String, required: true },
  burialSite: { type: String },
  motherId: { type: Schema.Types.ObjectId, ref: 'Person' }, // Reference to another Person document
  fatherId: { type: Schema.Types.ObjectId, ref: 'Person' }, // Reference to another Person document
}, {
  timestamps: true
});

// Create an index on firstName and lastName for efficient searching
PersonSchema.index({ firstName: 1, lastName: 1 });

module.exports = mongoose.model('Person', PersonSchema);
