import mongoose from 'mongoose';

/**
 * Define the note's database schema
 */
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

/**
 * Define the 'Note' model with the Schema
 */
export const Note = mongoose.model('Note', noteSchema);

export default Note;
