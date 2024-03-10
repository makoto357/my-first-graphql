import {gql} from '@apollo/client';

const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      id
      content
      cover_image
      summary
      tag
      title
      author: {
        id
            name
            email
      }
    }
  }
`;

export {GET_ARTICLES};
