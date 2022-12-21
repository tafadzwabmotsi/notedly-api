export const User = {
  /**
   * Resolve the list of notes for a user when requested
   */
  notes: async (user, args, { models: { Note } }) => {
    return await Note.find({ author: user._id }).sort({ _id: -1 });
  },

  /**
   * Resolve the list of favorites for user when requested
   */
  favorites: async (user, args, { models: { Note } }) => {
    return await Note.find({ favoritedBy: user._id }).sort({ _id: -1 });
  }
};
