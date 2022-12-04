// @mui
import PropTypes from 'prop-types';
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';
import { GET_BASKET, GET_LARGE_TRADES } from '../../../utils/queries';
import { useQuery } from '@apollo/client';
// ----------------------------------------------------------------------

export default function AppOrderTimeline2({ basketId, title, subheader, list }) {
  const variables = {
    id: basketId,
  };
  console.log(variables, 'VAARSS');
  const { loading, error, data } = useQuery(GET_BASKET, {
    variables: variables,
  });
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data, 'THISDFOSDHJF');
    return <OrderTimeline title={title} subheader={subheader} list={list} symbol={data.basket.tickers[0].symbol} />;
  }
}

function OrderTimeline({ symbol, title, subheader, list }) {
  const variables = {
    ticker: symbol,
  };
  const { loading, error, data } = useQuery(GET_LARGE_TRADES, {
    variables: variables,
  });
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
              <OrderItem key={item.ID} item={item} isLast={index === list.length - 1} />
            ))}
          </Timeline>
        </CardContent>
      </Card>
    );
  }
}
// ----------------------------------------------------------------------

function OrderItem({ item, isLast }) {
  const { Timestamp, Exchange, Price, Size, Conditions, ID, Tape } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color={'success'} />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{Size}</Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(Timestamp)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
