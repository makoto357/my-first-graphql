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

const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
    author(id: $id) {
      id
      name
      email
    }
  }
`;

export {GET_AUTHORS, GET_AUTHOR};
