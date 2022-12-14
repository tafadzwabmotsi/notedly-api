import { models } from '../models/index.js';

export const Mutation = {
  newNote: async (parent, args) => {
    return await models.Note.create({
      content: args.content,
      author: `Adam Scott`
    });
  },
  deleteNote: async (parent, { id }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  }
};
