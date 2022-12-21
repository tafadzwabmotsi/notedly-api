export const User = {
  /**
   * Resolve the list of notes for a user when requested
   */
  notes: async (user, args, { models: { Note } }) => {
    return await Note.find({ author: user._id }).sort({ _id: -1 });
  }
};
