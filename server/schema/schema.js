const Article = require("../models/Article");
const Media = require("../models/Media");
const Author = require("../models/Author");

const {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

// data Type, mongoose model wrapped in graphQL (實際拿回的資料格式)
const ArticleType = new GraphQLObjectType({
  // stored in this mongoDB collection?
  name: "Article",
  fields: () => ({
    id: { type: GraphQLID },
    // how to get timestamps?
    content: { type: GraphQLString },
    summary: { type: GraphQLString },
    tag: { type: GraphQLString },
    title: { type: GraphQLString },
    // supply authorId to mongoose while querying for author info, see /models
    author: {
      type: AuthorType,
      // find id from the parent
      resolve(parent) {
        return Author.findById(parent.authorId);
      },
    },
    medium: {
      type: MediaType,
      // find id from the parent
      resolve(parent) {
        return Media.findById(parent.mediaId);
      },
    },
  }),
});

const MediaType = new GraphQLObjectType({
  name: "Media",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    videoUrls: { type: new GraphQLList(GraphQLString) },
    images: { type: new GraphQLList(GraphQLString) },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// queries: get object data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    articles: {
      type: new GraphQLList(ArticleType),
      resolve() {
        return Article.find();
      },
    },
    article: {
      type: ArticleType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Article.findById(args.id);
      },
    },
    media: {
      type: new GraphQLList(MediaType),
      resolve() {
        return Media.find();
      },
    },
    medium: {
      type: MediaType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Media.findById(args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return Author.find();
      },
    },
    // to fetch author data
    author: {
      type: AuthorType,
      // specify which data to fetch
      args: { id: { type: GraphQLID } },
      // what to return
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
  },
});

// mutations: add, change or delete
const Mutation = new GraphQLObjectType({
  name: "MutationType",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        const arthur = Author({
          name: args.name,
          email: args.email,
        });
        return arthur.save();
      },
    },
    deleteAuthor: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Author.findByIdAndDelete(args.id);
      },
    },
    addArticle: {
      type: ArticleType,
      args: {
        content: { type: GraphQLString },
        summary: { type: GraphQLString },
        tag: {
          type: new GraphQLEnumType({
            // name needs to be unique for each mutation
            name: "ArticleStatus",
            values: {
              art: { value: "Art" },
              art_market: { value: "Art Market" },
            },
          }),
          defaultValue: "Art",
        },
        title: { type: GraphQLString },
        authorId: { type: GraphQLID },
        mediaId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const article = new Article({
          content: args.content,
          summary: args.summary,
          tag: args.tag,
          title: args.title,
          authorId: args.authorId,
          mediaId: args.mediaId,
        });
        return article.save();
      },
    },
    deleteArticle: {
      type: ArticleType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Article.findByIdAndDelete(args.id);
      },
    },
    updateArticle: {
      type: ArticleType,
      args: {
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        summary: { type: GraphQLString },
        tag: {
          type: new GraphQLEnumType({
            name: "UpdateArticleStatus",
            values: {
              art: { value: "Art" },
              art_market: { value: "Art Market" },
            },
          }),
          defaultValue: "Art",
        },
        title: { type: GraphQLString },
      },

      resolve(parent, args) {
        return Article.findByIdAndUpdate(
          args.id,
          {
            $set: {
              content: args.content,
              summary: args.summary,
              tag: args.tag,
              title: args.title,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
