import { models } from '../models/index.js';

export const Query = {
  notes: async (parent, args, context) => await models.Note.find(),
  note: async (parent, args) => await models.Note.findById(args.id)
};
