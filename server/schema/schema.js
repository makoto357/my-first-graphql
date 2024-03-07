const Article = require('../models/Article');
const Author = require('../models/Author');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

// data Type
const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: {type: GraphQLID},
    content: {type: GraphQLString},
    cover_image: {type: GraphQLString},
    created_at: {type: GraphQLString},
    status: {type: GraphQLString},
    summary: {type: GraphQLString},
    tag: {type: GraphQLString},
    title: {type: GraphQLString},
    updated_at: {type: GraphQLString},
    author: {
      type: AuthorType,
      // find id from the parent
      resolve(parent) {
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
  }),
});

// get object data with queries
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    articles: {
      type: new GraphQLList(ArticleType),
      resolve() {
        return Article.find();
      },
    },
    article: {
      type: ArticleType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Article.findById(args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return Author.find();
      },
    },
    // to fetch client data
    client: {
      type: AuthorType,
      // specify which data to fetch
      args: {id: {type: GraphQLID}},
      // what to return
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
