import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { gravatar } from '../util/gravatar.js';
import mongoose from 'mongoose';

/***
 * Errors
 */
const mustSignInError = new GraphQLError(
  'You must be signed in to create a note',
  {
    extensions: {
      code: 'UNAUTHENTICATED'
    }
  }
);

export const Mutation = {
  /**
   * Create a new note
   */
  newNote: async (parent, args, { models: { Note }, user }) => {
    /**
     * If there is no user on the context, throw an authentication error
     */
    if (!user) {
      throw mustSignInError;
    }

    return await Note.create({
      content: args.content,

      /**
       * Reference the author's mongo id
       */
      author: mongoose.Types.ObjectId(user.id)
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
  },

  /**
   * Sign up the user
   */
  signUp: async (
    parent,
    { username, email, password },
    { models: { User } }
  ) => {
    /**
     * Normalize email address
     */
    const normalizeEmail = email.trim().toLowerCase();

    /**
     * Hash the password
     */
    const hashedPassword = await bcrypt.hash(password, 10);

    /**
     * Create the gravatar url
     */
    const avatar = gravatar(email);

    /**
     * Attempt to create a user
     */
    try {
      const user = await User.create({
        username,
        email: normalizeEmail,
        avatar,
        password: hashedPassword
      });

      /**
       * Create and return the json web token
       */
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      throw new Error('Error creating user account');
    }
  },

  /**
   * Sign in the user
   */
  signIn: async (
    parent,
    { username, email, password },
    { models: { User } }
  ) => {
    if (email) {
      /**
       * Normalize email address
       */
      email = email.trim().toLowerCase();
    }

    /**
     * Find the user the given username and email
     */
    const user = await User.findOne({ $or: [{ email }, { username }] });

    /**
     * If no user is found throw an authentication error
     */
    if (!user) {
      throw new GraphQLError('Error signing in', {
        extensions: {
          code: 'UNAUTHENTICATED'
        }
      });
    }

    /**
     * If passwords don't match, throw an authentication error
     */
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new GraphQLError('Error signing in', {
        extensions: {
          code: 'UNAUTHENTICATED'
        }
      });
    }

    /**
     * Create and return the json web token
     */
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  }
};
