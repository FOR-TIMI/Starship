import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query SignedInUser {
    signedInUser {
      username
      _id
      avatar
      email
    }
  }
`;

export const QUERY_POSTS = gql`
    query{
      posts {
        _id
        title
        coverPhoto
        createdAt
        commentCount
        likeCount
        author {
          username
          avatar
        }
      }
    }
`;

export const QUERY_POST = gql`
query($id: ID!){
  post(_id: $id) {
    author {
      avatar
      username
    }
    title
    coverPhoto
    comments {
      commentText
      author {
        avatar
      }
    }
    likes {
      _id
      username
      avatar
    }
  }
}
`;

export const QUERY_SOCIAL = gql`
  query social($username: String!) {
    user(username: $username) {
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
`;

export const BAR_DATA_QUERY = gql`
  query BarDataQuery($symbol: String!, $timeframe: String!, $limit: Int!, $days: Int!) {
    barDataQuery(symbol: $symbol, timeframe: $timeframe, limit: $limit, days: $days) {
      ClosePrice
      HighPrice
      LowPrice
      OpenPrice
      Timestamp
      TradeCount
      VWAP
      Volume
    }
  }
`;

export const BARS_DATA_QUERY = gql`
  query Query($symbols: [String]!, $timeframe: String!, $limit: Int!, $days: Int!) {
    barsDataQuery(symbols: $symbols, timeframe: $timeframe, limit: $limit, days: $days) {
      Barsdata {
        ClosePrice
        HighPrice
        LowPrice
        OpenPrice
        Symbol
        Timestamp
        TradeCount
        VWAP
        Volume
      }
      Name
    }
  }
`;

export const GET_BASKETS = gql`
  query Query {
    baskets {
      _id
      createdAt
      tickers {
        market
        _id
        API
        symbol
      }
    }
  }
`;

export const GET_BASKET = gql`
  query Query($id: ID!) {
    basket(_id: $id) {
      _id
      createdAt
      tickers {
        API
        market
        symbol
        _id
      }
    }
  }
`;

export const GET_DATA_FROM_BASKET = gql`
  query Query($getDataFromBasketId: ID!, $timeframe: String!, $limit: Int!, $days: Int!) {
    getDataFromBasket(id: $getDataFromBasketId, timeframe: $timeframe, limit: $limit, days: $days) {
      VWAP
      Timestamp
    }
  }
`;

export const NEWS_QUERY = gql`
  query Query($ticker: String!) {
    getNews(ticker: $ticker) {
      title
      link
      pubDate
      content
      img
    }
  }
`;

export const GET_LARGE_TRADES = gql`
  query Query($ticker: String!) {
    getLargeTrades(ticker: $ticker) {
      Timestamp
      Exchange
      Price
      Size
      Conditions
      ID
      Tape
    }
  }
`;
