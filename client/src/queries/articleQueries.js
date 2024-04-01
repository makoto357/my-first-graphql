import {gql} from '@apollo/client';

const GET_ARTICLES = gql`
  query GetArticles {
    articles {
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

const GET_ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
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

export {GET_ARTICLES, GET_ARTICLE};
