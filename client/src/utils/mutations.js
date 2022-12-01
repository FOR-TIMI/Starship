import {gql} from '@apollo/client'

export const LOGIN = gql`
    mutation Login( $email:String!, $password:String!){
        login(email:$email, password:$password){
            token
            user{
                _id
                email
            }
        }
       
    }
`

export const ADD_USER = gql`
    mutation AddUser($username: String!, $email:String!, $password:String!){
       addUser(username:$username, email:$email, password:$password){
        token
        user{
            _id
            email
        }
       }
    }
`

export const ADD_FOLLOWING = gql `
    mutation addFollowing($id: ID!) {
        addFollowing (followingId: $id) {
            _id
            username
            following {
                _id
                username
            }
        }
    }
`

export const REMOVE_FOLLOWING = gql `
    mutation removeFollowing($id: ID!) {
        removeFollowing (followingId: $id) {
            _id
            username
            following {
                _id
                username
            }
        }
    }
`