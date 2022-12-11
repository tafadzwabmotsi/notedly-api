// Require the mongoose library
const mongoose = require('mongoose');

module.exports = {
  connect: DB_HOST => {
    /**
     * User the Mongo driver's updated URL string parser
     */
    mongoose.set('useNewUrlParser', true);

    /**
     * Use findOneAndUpdate in place of findAndModify
     */
    mongoose.set('useFindAndModify', false);

    /**
     * Use createIndex() in place of ensureIndex()
     */
    mongoose.set('useCreateIndex', true);
  }
};
