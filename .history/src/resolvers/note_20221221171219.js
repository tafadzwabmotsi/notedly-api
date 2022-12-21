export const Note = {
  /**
   * Resolve the author info for a note when requested
   */
  author: async ({ author }, args, { models: { User } }) => {
    return await User.findById(author);
  }
};
