import {gql} from '@apollo/client';

const GET_ARTICLES = gql`
  query GetArticles {
    articles {
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

const GET_ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
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

export {GET_ARTICLES, GET_ARTICLE};
