import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { models } from '../models/index.js';
import * as dotenv from 'dotenv';
import { gravatar } from '../util/gravatar.js';

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
  },
  updateNote: async (parent, { content, id }) => {
    return await models.Note.findOneAndUpdate(
      { _id: id },
      { $set: { content } },
      { new: true }
    );
  }
};
