import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { gravatar } from '../util/gravatar.js';
import mongoose from 'mongoose';

/***
 * Errors
 */
const signInError = new GraphQLError('You must be signed in to create a note', {
  extensions: {
    code: 'UNAUTHENTICATED'
  }
});

const forbiddenError = new GraphQLError(
  `You don't have permissions to delete the note`,
  {
    extensions: {
      code: 'FORBIDDEN'
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
      throw signInError;
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
  deleteNote: async (parent, { id }, { models: { Note }, user }) => {
    /**
     * If not a user, throw an Authentication error
     */
    if (!user) {
      throw signInError;
    }

    /**
     * Find the note
     */
    const note = await Note.findById(id);

    /**
     * If the note owner and current user don't match,
     * throw a ForbiddenError
     */
    if (note && String(note.author) !== user.id) {
      throw forbiddenError;
    }

    try {
      /**
       * Everything checks out, remove the note
       */
      await note.remove();
      return true;
    } catch (err) {
      /**
       * If there's an error along the way, return false
       */
      return false;
    }
  },

  /**
   * Update a note with the given id
   */
  updateNote: async (parent, { content, id }, { models: { Note }, user }) => {
    /**
     * If not a user, throw an Authentication error
     */
    if (!user) {
      throw signInError;
    }

    /**
     * Find the note
     */
    const note = await Note.findById(id);

    /**
     * If the note and current user don't match, throw a forbidden error
     */
    if (note && String(note.author) !== user.id) {
      throw forbiddenError;
    }

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
  },

  /**
   * Toggle a favorite note
   */
  toggleFavorite: async (parent, { id }, { models: { Note }, user }) => {
    /**
     * If no user context is passed, throw auth error
     */
    if (!user) {
      throw new GraphQLError(`Error found in toggling favorite`, {
        extensions: {
          code: 'UNAUTHENTICATED'
        }
      });
    }

    /**
     * Check to see if the user has already favorited the note
     */
    let noteCheck = await Note.findById(id);
    const hasUser = noteCheck.favoritedBy.indexOf(user.id);

    /**
     * If the user exists in the list, pull them from the list
     * and reduce the favoriteCount by 1
     */
    if (hasUser >= 0) {
      return await Note.findByIdAndUpdate(id, {
        $pull: {
          favoritedBy: mongoose.Types.ObjectId(user.id)
        },
        $inc: {
          favoriteCount: -1
        },
        {
          /**
           * Set new to true to return the updated doc
          */
        }
      });
    }
  }
};
