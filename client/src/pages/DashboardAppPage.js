import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import moment from 'moment';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BAR_DATA_QUERY } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

// sections
import {
  AppNewsUpdate3,
  AppOrderTimeline3,
  AppWebsiteVisits3,
  AppWidgetSummary2,
  TreeMapChart,
  FearGreedSummary,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [dailyChange, setDailyChange] = useState();
  const [weeklyChange, setWeeklyChange] = useState();
  const [monthlyChange, setMonthlyChange] = useState();
  const [yearlyChange, setYearlyChange] = useState();
  const [quote, setQuote] = useState('Super Quote Incoming');

  let closeP = { x: moment(), y: 0 };

  const vars = {
    symbol: 'SPY',
    timeframe: '1D',
    limit: 365,
    days: 365,
  };
  const { loading, error, data } = useQuery(BAR_DATA_QUERY, { variables: vars });

  useEffect(() => {
    let quotes = [
      '"Rule No. 1: Never lose money. Rule No. 2: Never forget rule No.1"- Warren Buffet',
      '“If you aren’t willing to own a stock for 10 years, don’t even think about owning it for 10 minutes.”- Warren Buffet',
      '“Price is what you pay, value is what you get.”- Warren Buffet',
      '“Risk comes from not knowing what you are doing.”- Warren Buffet',
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  useEffect(() => {
    if (data) {
      let dc =
        data.barDataQuery[data.barDataQuery.length - 1].ClosePrice -
        data.barDataQuery[data.barDataQuery.length - 2].ClosePrice;
      setDailyChange((dc / data.barDataQuery[data.barDataQuery.length - 2].ClosePrice) * 100);

      // weekly change
      let wc =
        data.barDataQuery[data.barDataQuery.length - 1].ClosePrice -
        data.barDataQuery[data.barDataQuery.length - 7].ClosePrice;
      setWeeklyChange((wc / data.barDataQuery[data.barDataQuery.length - 7].ClosePrice) * 100);

      // monthly change
      let mc =
        data.barDataQuery[data.barDataQuery.length - 1].ClosePrice -
        data.barDataQuery[data.barDataQuery.length - 30].ClosePrice;
      setMonthlyChange((mc / data.barDataQuery[data.barDataQuery.length - 30].ClosePrice) * 100);

      // yearly change
      let yc = data.barDataQuery[data.barDataQuery.length - 1].ClosePrice - data.barDataQuery[0].ClosePrice;
      setYearlyChange((yc / data.barDataQuery[0].ClosePrice) * 100);
    }
  }, [data]);

  if (error) {
    console.log(error);
  }
  if (loading) {
    return <div>Loading</div>;
  }
  if (data) {
    // console.log(data, 'DATASA');

    closeP = data.barDataQuery.map((e) => {
      return {
        x: e.Timestamp,
        y: e.ClosePrice,
      };
    });
    // const newData = dataToBasket(data.barsDataQuery);
    // setParsedData(newData);
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | Starship </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {quote}
        </Typography>

        <Grid container spacing={3}  justifyContent="space-evenly"
  alignItems="strech" >
          {dailyChange ? (
            <>
              {dailyChange > 0 ? (
                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary2
                    title="Daily Change"
                    total={dailyChange}
                    color="info"
                    icon={'fluent-mdl2:stock-up'}
                  />
                </Grid>
              ) : (
                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary2
                    title="Daily Change"
                    total={dailyChange}
                    color="error"
                    icon={'fluent-mdl2:stock-down'}
                  />
                </Grid>
              )}

              {weeklyChange > 0 ? (
                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary2
                    title="Weekly Change"
                    total={weeklyChange}
                    color="info"
                    icon={'fluent-mdl2:stock-up'}
                  />
                </Grid>
              ) : (
                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary2
                    title="Weekly Change"
                    total={weeklyChange}
                    color="error"
                    icon={'fluent-mdl2:stock-down'}
                  />
                </Grid>
              )}
              {monthlyChange > 0 ? (
                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary2
                    title="Montly Change"
                    total={monthlyChange}
                    color="info"
                    icon={'fluent-mdl2:stock-up'}
                  />
                </Grid>
              ) : (
                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary2
                    title="Montly Change"
                    total={monthlyChange}
                    color="error"
                    icon={'fluent-mdl2:stock-down'}
                  />
                </Grid>
              )}
              {yearlyChange > 0 ? (
                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary2
                    title="Yearly Change"
                    total={yearlyChange}
                    color="info"
                    icon={'fluent-mdl2:stock-up'}
                  />
                </Grid>
              ) : (
                <Grid item xs={12} sm={6} md={3}>
                  <AppWidgetSummary2
                    title="Yearly Change"
                    total={yearlyChange}
                    color="error"
                    icon={'fluent-mdl2:stock-down'}
                  />
                </Grid>
              )}
            </>
          ) : (
            <></>
          )}

          <Grid item xs={12} md={8} lg={8}>
            <AppWebsiteVisits3 title="SPY" data={data} />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <AppOrderTimeline3 title="Large Trades" ticker="SPY" />
          </Grid>

          <Grid item xs={12} md={8} lg={8}>
            <TreeMapChart />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <FearGreedSummary sx={{height: '100%'}}/>
          </Grid>


          <Grid item xs={12} md={12} lg={12}>
            <AppNewsUpdate3
              ticker={'SPY'}
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
        </Grid>
      </Container>
    </>
  );
}
