// server/models/Person.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true},
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  dateOfDeath: { type: Date, required: true },
  gender: { type: String, required: true },
  birthPlace: { type: String, required: true },
  burialSite: { type: String, required: true }

});

module.exports = mongoose.model('Person', PersonSchema);
