// @mui
import PropTypes from 'prop-types';
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';
import { GET_BASKET, GET_LARGE_TRADES } from '../../../utils/queries';
import { useQuery } from '@apollo/client';
// ----------------------------------------------------------------------

export default function AppOrderTimeline3({ ticker, title, subheader, list }) {
  return <OrderTimeline title={title} subheader={subheader} list={list} symbol={ticker} />;
}

function OrderTimeline({ symbol, title, subheader, list }) {
  const variables = {
    ticker: 'SPY',
  };
  const { loading, error, data } = useQuery(GET_LARGE_TRADES, {
    variables: variables,
  });
  if (error) {
    console.log(error);
  }
  if (data) {
    return (
      <Card>
        <CardHeader title={title} subheader={subheader} />

        <CardContent
          sx={{
            '& .MuiTimelineItem-missingOppositeContent:before': {
              display: 'none',
            },
          }}
        >
          <Timeline>
            {data.getLargeTrades.map((item, index) => (
              <OrderItem key={item.ID} item={item} symbol={symbol} isLast={index === data.getLargeTrades.length - 1} />
            ))}
          </Timeline>
        </CardContent>
      </Card>
    );
  }
}
// ----------------------------------------------------------------------

function OrderItem({ item, isLast, symbol }) {
  // console.log(symbol);
  const { Timestamp, Exchange, Price, Size, Conditions, ID, Tape } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color={'success'} />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{Size.toString() + ' ' + symbol}</Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(Timestamp)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
