const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password')
            };

            return userData;
        },
    },

    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { user, token };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError(
                    'Email or Password is incorrect. Please try again.'
                );
            }
            
            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError(
                    'Email or Password is incorrect. Please try again.'
                );
            }

            const token = signToken(user);
            return { user, token };
        },
        saveBook: async (parent, { saveBook }, context) => {
            if (context.user) {
                const userData = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: saveBook } },
                    { new: true }
                );

                return userData;
            }
        },
        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const userData = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return userData;
            }
        },
    },
};

module.exports = resolvers;