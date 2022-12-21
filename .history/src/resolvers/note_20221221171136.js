export const Note = {
  author: async ({ author }, args, { models: { User } }) => {
    return await User.findById(author);
  }
};
