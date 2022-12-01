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

