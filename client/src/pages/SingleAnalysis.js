import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import { faker } from '@faker-js/faker';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
// @mui functions
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { BAR_DATA_QUERY } from '../utils/queries';
// components
import Iconify from '../components/iconify';
import {
  AppNewsUpdate,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppCurrentSubject,
  FearGreedSummary,
  CandleStick,
  PriceLineChart,
} from '../sections/@dashboard/app';

export default function SingleAnalysis() {
  const theme = useTheme();

  let { symbol } = useParams();
  symbol = symbol.toUpperCase();

  const vars = {
    symbol: symbol,
    timeframe: '1Day',
    limit: 1000,
    days: 50,
  };
  const { data } = useQuery(BAR_DATA_QUERY, { variables: vars });

  // {  "symbol": "AAPL",
  //   "timeframe": "1Min",  "limit": 50,
  //   "days": 5
  // }
  // initialising with hard-code data
  let candleData = { x: moment(), y: [0, 0, 0, 0] };
  let closeP= { x: moment(), y: 0 };

  if (data) {
    console.log(data.barDataQuery);
    // function for all 3
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

    //console.log( closeP);
  }

  return (
    <>
      <Helmet>
        <title> Single Analysis | Starship </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5 }}>
          {symbol} Summary
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <FearGreedSummary />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Max Close" total={1352831} color="info" icon={'cryptocurrency:aave'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="High Price" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Low Price" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <PriceLineChart
              title={symbol}
              subheader="Close price"
              chartData={[
                {
                  name: 'Close Price',
                  data: closeP,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
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
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
