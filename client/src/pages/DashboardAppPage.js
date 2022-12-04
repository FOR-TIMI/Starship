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
  AppTasks,
  AppNewsUpdate3,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary2,
  AppCurrentSubject,
  AppConversionRates,
  PriceLineChart,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [dailyChange, setDailyChange] = useState();
  const [weeklyChange, setWeeklyChange] = useState();
  const [monthlyChange, setMonthlyChange] = useState();
  const [yearlyChange, setYearlyChange] = useState();

  const [dayState, setDayState] = useState(30);
  const [timeState, setTimeState] = useState('1D');

  let closeP = { x: moment(), y: 0 };

  const vars = {
    symbol: 'SPY',
    timeframe: timeState,
    limit: 500,
    days: dayState,
  };
  const { loading, error, data } = useQuery(BAR_DATA_QUERY, { variables: vars });

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
    console.log(data, 'DATASA');

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
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
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

          <Grid item xs={12} md={6} lg={8}>
            <PriceLineChart
              title={'Market Overview'}
              chartData={[
                {
                  name: 'SP500',
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

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
