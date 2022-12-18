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
  },

  /**
   * Query a user given their username
   */
  user: async (parent, { username }, { models: { User } }) => {
    return await User.findOne({ username });
  },

  /**
   * Query all users
   */
  users: async (parent, args, { models: { User } }) => {
    return await User.find({});
  },

  /**
   * Query a user given the current context
   */
  me: async (parent, args, { models: { User }, user: { id } }) => {
    return await User.findById(id);
  }
};
