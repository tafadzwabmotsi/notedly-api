import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import * as dotenv from 'dotenv';
import { gravatar } from '../util/gravatar.js';

export const Mutation = {
  /**
   * Create a new note
   */
  newNote: async (parent, args, { models: { Note } }) => {
    return await Note.create({
      content: args.content,
      author: `Adam Scott`
    });
  },

  /**
   * Delete a note with the given id
   */
  deleteNote: async (parent, { id }, { models: { Note } }) => {
    try {
      await Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },

  /**
   * Update a note with the given id
   */
  updateNote: async (parent, { content, id }, { models: { Note } }) => {
    return await Note.findOneAndUpdate(
      { _id: id },
      { $set: { content } },
      { new: true }
    );
  }
};
