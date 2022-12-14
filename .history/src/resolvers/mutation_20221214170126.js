import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import * as dotenv from 'dotenv';
import { gravatar } from '../util/gravatar.js';

export const Mutation = {
  newNote: async (parent, args, { models: { Note } }) => {
    return await Note.create({
      content: args.content,
      author: `Adam Scott`
    });
  },
  deleteNote: async (parent, { id }, { models: { Note } }) => {
    try {
      await Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, { content, id }, { models: { Note } }) => {
    return await models.Note.findOneAndUpdate(
      { _id: id },
      { $set: { content } },
      { new: true }
    );
  }
};
