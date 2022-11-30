import { gql } from '@apollo/client';

export const QUERY_SOCIAL = gql `
    query social ($username: String!) {
        user (username: $username) {
            _id
            username
            followers {
                _id
                username
                baskets {
                    _id
                }
            }
            followings {
                _id
                username
                baskets {
                    _id
                }
            }
        }
    }
`