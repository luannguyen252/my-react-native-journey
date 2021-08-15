import gql from 'graphql-tag';

export const FeedPhotoFragment = gql`
  fragment FeedPhoto on Photo {
    id
    caption
    imageUrl
    insertedAt
    viewerLike
  }
`;
