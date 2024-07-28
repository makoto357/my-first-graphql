import {gql} from '@apollo/client';

const GET_MEDIA = gql`
  query GetMedia {
    media {
      id
      title
      videoUrls
      images
    }
  }
`;

const GET_MEDIUM = gql`
  query GetMedium($id: ID!) {
    medium(id: $id) {
      id
      title
      videoUrls
      images
    }
  }
`;

export {GET_MEDIA, GET_MEDIUM};
