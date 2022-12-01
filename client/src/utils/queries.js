import { gql } from '@apollo/client'

export const QUERY_POSTS = gql`
    query posts{
        posts {
            _id
            title
            likeCount
            commentCount
        }
    }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
        _id
        title
        userId
        username
        comments {
          commentText
          createdAt
          username
        } 
        likes {
          _id
          username
        }
      }
  }
`;
