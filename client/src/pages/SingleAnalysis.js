import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import { faker } from '@faker-js/faker';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
// @mui functions
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button } from '@mui/material';
import { BAR_DATA_QUERY } from '../utils/queries';
import AddToBasket from '../components/add-to-basket/index';
// components
import Iconify from '../components/iconify';
import {
  AppNewsUpdate,
  AppOrderTimeline3,
  AppWidgetSummary,
  AppCurrentSubject,
  FearGreedSummary,
  CandleStick,
  PriceLineChart,
} from '../sections/@dashboard/app';
import AppNewsUpdate3 from '../sections/@dashboard/app/AppNewsUpdate3';

export default function SingleAnalysis() {
  const theme = useTheme();
  let [modalOpen, setModalOpen] = useState(false);
  function handleOpen() {
    setModalOpen(!modalOpen);
  }

  // SetStates to use dropdwon menu for 'days' and 'time'

  const [dayState, setDayState] = useState(30);
  const [timeState, setTimeState] = useState('1D');

  let { symbol } = useParams();
  symbol = symbol.toUpperCase();

  const vars = {
    symbol: symbol,
    timeframe: timeState,
    limit: 500,
    days: dayState,
  };
  const { data } = useQuery(BAR_DATA_QUERY, { variables: vars });

  // initialising with hard-code data
  let candleData = { x: moment(), y: [0, 0, 0, 0] };
  let closeP = { x: moment(), y: 0 };
  let diff = 0;
  let currentOpenPrice = 0;
  let currentVolume = 0;
  if (data) {
    // function for all 3

    const finalPrice = data.barDataQuery[data.barDataQuery.length - 1].ClosePrice;
    const initialPrice = data.barDataQuery[0].ClosePrice;
    diff = parseInt((finalPrice - initialPrice).toFixed(2));

    currentOpenPrice = data.barDataQuery[data.barDataQuery.length - 1].OpenPrice;
    currentVolume = data.barDataQuery[data.barDataQuery.length - 1].Volume;

    // functions end
    closeP = data.barDataQuery.map((e) => {
      return {
        x: e.Timestamp,
        y: e.ClosePrice,
      };
    });

    candleData = data.barDataQuery.map((e) => {
      return {
        x: e.Timestamp,
        y: [e.OpenPrice, e.HighPrice, e.LowPrice, e.ClosePrice],
      };
    });
  }

  return (
    <>
      <Helmet>
        <title> Single Analysis | Starship </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5, display: 'flex', justifyContent: 'space-around' }}>
          {symbol} Summary
          <Button
            onClick={() => {
              handleOpen();
            }}
            sx={{ ml: 1 }}
            variant="contained"
          >
            <Typography variant="title2" sx={{ color: 'white' }}>
              Add to Basket
            </Typography>
          </Button>
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <FearGreedSummary />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Close Price Difference" total={diff} color="info" icon={'ri:stock-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Current Open Price"
              total={currentOpenPrice}
              color="warning"
              icon={'ic:baseline-open-in-browser'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Volume" total={currentVolume} color="success" icon={'tabler:brand-cashapp'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <PriceLineChart
              title={symbol}
              chartData={[
                {
                  name: 'Close Price',
                  data: closeP,
                },
              ]}
              setDayState={setDayState}
              setTimeState={setTimeState}
              dayState={dayState}
              timeState={timeState}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline3 title="Large Trades" ticker={symbol} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <CandleStick
              chartData={[
                {
                  data: candleData,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate3
              title="News"
              ticker={symbol}
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>
        </Grid>
        <AddToBasket modalOpen={modalOpen} handleOpen={handleOpen} />
      </Container>
    </>
  );
}
