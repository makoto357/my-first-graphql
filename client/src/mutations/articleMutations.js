import {gql} from '@apollo/client';

const ADD_ARTICLE = gql`
  mutation AddArticle(
    $content: String!
    $coverImage: String!
    $summary: String!
    $tag: ArticleStatus!
    $title: String!
    $authorId: ID!
  ) {
    addArticle(
      content: $content
      coverImage: $coverImage
      summary: $summary
      tag: $tag
      title: $title
      authorId: $authorId
    ) {
      id
      content
      coverImage
      summary
      tag
      title
      author {
        id
        name
        email
      }
    }
  }
`;

const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      id
    }
  }
`;

export {ADD_ARTICLE, DELETE_ARTICLE};
