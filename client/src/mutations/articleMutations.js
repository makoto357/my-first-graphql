import { gql } from "@apollo/client";

const ADD_ARTICLE = gql`
  mutation AddArticle(
    $content: String!
    $summary: String!
    $tag: ArticleStatus!
    $title: String!
    $authorId: ID!
    $mediaId: ID!
  ) {
    addArticle(
      content: $content
      summary: $summary
      tag: $tag
      title: $title
      authorId: $authorId
      mediaId: $mediaId
    ) {
      id
      content
      summary
      tag
      title
      author {
        id
        name
        email
      }
      medium {
        id
        title
        videoUrls
        images
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

export { ADD_ARTICLE, DELETE_ARTICLE };
