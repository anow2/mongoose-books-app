var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  Character = require('./character');

var CharacterSchema = new Schema({
     name: String
});

var Character = mongoose.model('Character', CharacterSchema);
module.exports = Character;
