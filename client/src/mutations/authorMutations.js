import {gql} from '@apollo/client';

const ADD_AUTHOR = gql`
  mutation AddAuthor($name: String!, $email: String!) {
    addAuthor(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

// type of id = ID
const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
      email
    }
  }
`;

export {ADD_AUTHOR, DELETE_AUTHOR};
