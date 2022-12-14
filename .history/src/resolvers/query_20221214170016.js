export const Query = {
  /**
   * Query all the notes available in the database
   */
  notes: async (parent, args, { models: { Note } }) => {
    return await Note.find();
  },

  /**
   * Query a note with the given id
   */
  note: async (parent, args, { models: { Note } }) => {
    return await Note.findById(args.id);
  }
};
