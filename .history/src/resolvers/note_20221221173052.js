export const Note = {
  /**
   * Resolve the author info for a note when requested
   */
  author: async (user, args, { models: { User } }) => {
    return await User.findById(user.author);
  },

  /**
   * Resolve the favoritedBy info for a note when requested
   */
  favoritedBy: async ({ favoritedBy }, args, { models: { User } }) => {
    return await User.find({ _id: { $in: favoritedBy } });
  }
};
