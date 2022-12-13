import mongoose from 'mongoose';

/**
 * Define the note's database schema
 */
const noteSchema = new mongoose.Schema();

/**
 * Define the 'Note' model with the Schema
 */
export const Note = mongoose.model('Note', noteSchema);

export default Note;
