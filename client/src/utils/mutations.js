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
    mutation addFollowing($followingId: ID!) {
        addFollowing (followingId: $followingId) {
            _id
            username
        }
    }
`

export const REMOVE_FOLLOWING = gql `
    mutation removeFollowing($followingId: ID!) {
        removeFollowing (followingId: $followingId) {
            _id
            username
        }
    }
`

export const ADD_TICKER = gql `
    mutation AddTicker($basketId: ID!, $ticker: String!) {
        addTicker(basketId: $basketId, ticker: $ticker) {
        _id
        createdAt
        tickers {
            symbol
            _id
        }
        }
    }
`
export const ADD_BASKET = gql `
mutation Mutation($tickers: [String]!, $basketName: String) {
    addBasket(tickers: $tickers, basketName: $basketName) {
      _id
      createdAt
      basketName
      tickers {
        _id
        symbol
        market
        API
      }
    }
  }
`

export const UPDATE_USER = gql `
mutation Mutation( $avatar: String) {
    updateUser( avatar: $avatar) {
      avatar
      email
      username
    }
  }
`