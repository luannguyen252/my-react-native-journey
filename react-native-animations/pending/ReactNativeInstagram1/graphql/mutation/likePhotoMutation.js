import gql from 'graphql-tag';

export default gql`
  mutation likePhoto($photoId: ID!) {
    likePhoto(photoId: $photoId)
  }
`;
