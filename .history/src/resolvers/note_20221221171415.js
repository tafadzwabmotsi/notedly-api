export const Note = {
  /**
   * Resolve the author info for a note when requested
   */
  author: async ({ author }, args, { models: { User } }) => {
    return await User.findById(author);
  },

  /**
   * Resolve the favoritedBy info for a note when requested
   */
  favoritedBy: async ({ favoritedBy }, args, { models: { User } }) => {
    return await User.find({ _id: { $in: favoritedBy } });
  }
};
