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
<<<<<<< HEAD
  motherId: { type: Schema.Types.ObjectId, ref: 'Person' }, // Reference to another Person document
  fatherId: { type: Schema.Types.ObjectId, ref: 'Person' }, // Reference to another Person document
  img: {type: String }
=======
  motherId: { type: Schema.Types.ObjectId, ref: 'Person' },
  fatherId: { type: Schema.Types.ObjectId, ref: 'Person' },
  pids: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
  children: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
>>>>>>> c6d3f25d3b101dec71b54d6afabbfa62a1359718
}, {
  timestamps: true
});

// Create an index on firstName and lastName for efficient searching
PersonSchema.index({ firstName: 1, lastName: 1 });

<<<<<<< HEAD
module.exports = mongoose.model('Person', PersonSchema);
=======
// Method to get the full name of the person
PersonSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.middleName} ${this.lastName}`;
};

// Method to get the age of the person
PersonSchema.methods.getAge = function() {
  const today = new Date();
  let age = today.getFullYear() - this.dateOfBirth.getFullYear();
  const monthDifference = today.getMonth() - this.dateOfBirth.getMonth();
  
  // Adjust age if the birthday has not occurred this year
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < this.dateOfBirth.getDate())) {
    age--;
  }
  
  return age;
};

module.exports = mongoose.model('Person', PersonSchema);
>>>>>>> c6d3f25d3b101dec71b54d6afabbfa62a1359718
