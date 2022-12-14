import { models } from '../models/index.js';

export const Mutation = {
  newNote: async (parent, args) => {
    return await models.Note.create({
      content: args.content,
      author: `Adam Scott`
    });
  }
};
