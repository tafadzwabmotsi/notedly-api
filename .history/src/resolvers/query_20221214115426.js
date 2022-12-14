import { models } from '../models.js';

export const Query = {
  notes: async () => await models.Note.find(),
  note: async (parent, args) => await models.Note.findById(args.id)
};
