import mongoose from 'mongoose';

export const db = {
  connect: DB_HOST => {
    /**
     * Connect to the DB
     */
    mongoose.connect(DB_HOST);

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
