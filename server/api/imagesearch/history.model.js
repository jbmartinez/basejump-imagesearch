'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    mongoose.Promise = global.Promise;

var HistorySchema = new Schema({
  term: String
},
{
  timestamps: true,
  capped: { size: 262144, max: 50, autoIndexId: true }
});

module.exports = mongoose.model('History', HistorySchema);
