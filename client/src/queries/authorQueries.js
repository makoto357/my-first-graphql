import {gql} from '@apollo/client';

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
      email
    }
  }
`;

export {GET_AUTHORS};
