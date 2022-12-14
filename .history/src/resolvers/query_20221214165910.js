export const Query = {
  notes: async (parent, args, { models: { Note } }) => {
    return await Note.find();
  },
  note: async (parent, args, { models: { Note } }) =>
    await Note.findById(args.id)
};
