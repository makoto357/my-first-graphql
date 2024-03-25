import {gql} from '@apollo/client';

const ADD_ARTICLE = gql`
  mutation AddArticle(
    $content: String!
    $cover_image: String!
    $summary: String!
    $tag: ArticleStatus!
    $title: String!
    $authorId: ID!
  ) {
    addArticle(
      content: $content
      cover_image: $cover_image
      summary: $summary
      tag: $tag
      title: $title
      authorId: $authorId
    ) {
      id
      content
      cover_image
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

export {ADD_ARTICLE};
