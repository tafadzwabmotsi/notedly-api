import mongoose from 'mongoose';

export const db = {
  connect: DB_HOST => {
    /**
     * User the Mongo driver's updated URL string parser
     */
    mongoose.set('useNewUrlParser', true);

    /**
     * Connect to the DB
     */
    mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    /**
     * Log an error if we fail to connect
     */
    mongoose.connection.on('error', err => {
      console.error(err);
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running.'
      );
      process.exit();
    });
  },
  close: () => {
    mongoose.connection.close();
  }
};

export default db;
