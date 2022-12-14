export const Query = {
  notes: async (parent, args, { models }) => await models.Note.find(),
  note: async (parent, args) => await models.Note.findById(args.id)
};
