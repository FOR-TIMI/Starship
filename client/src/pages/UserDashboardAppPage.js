import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useParams } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { useQuery } from '@apollo/client';
import { BARS_DATA_QUERY, GET_BASKET, GET_DATA_AND_BASKET } from '../utils/queries';

import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate2,
  AppOrderTimeline2,
  AppCurrentVisits2,
  AppWebsiteVisits2,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary2,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// import { dataToBasket } from '../utils/dataToBasket';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [dailyChange, setDailyChange] = useState();
  const [weeklyChange, setWeeklyChange] = useState();
  const [monthlyChange, setMonthlyChange] = useState();
  const [yearlyChange, setYearlyChange] = useState();
  let { basketId } = useParams();

  const theme = useTheme();
  const vars = {
    getDataFromBasketId: basketId,
    timeframe: '1D',
    limit: 365,
    days: 365,
    id: basketId,
  };

  const { loading, error, data } = useQuery(GET_DATA_AND_BASKET, {
    variables: vars,
  });

  // if (data) {
  // daily change
  useEffect(() => {
    if (data) {
      let dc =
        data.getDataFromBasket[data.getDataFromBasket.length - 1].VWAP -
        data.getDataFromBasket[data.getDataFromBasket.length - 2].VWAP;
      setDailyChange((dc / data.getDataFromBasket[data.getDataFromBasket.length - 2].VWAP) * 100);

      // weekly change
      let wc =
        data.getDataFromBasket[data.getDataFromBasket.length - 1].VWAP -
        data.getDataFromBasket[data.getDataFromBasket.length - 7].VWAP;
      setWeeklyChange((wc / data.getDataFromBasket[data.getDataFromBasket.length - 7].VWAP) * 100);

      // monthly change
      let mc =
        data.getDataFromBasket[data.getDataFromBasket.length - 1].VWAP -
        data.getDataFromBasket[data.getDataFromBasket.length - 30].VWAP;
      setMonthlyChange((mc / data.getDataFromBasket[data.getDataFromBasket.length - 30].VWAP) * 100);

      // yearly change
      let yc = data.getDataFromBasket[data.getDataFromBasket.length - 1].VWAP - data.getDataFromBasket[0].VWAP;
      setYearlyChange((yc / data.getDataFromBasket[0].VWAP) * 100);
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title> Dashboard | Starship </title>
      </Helmet>

      <Container maxWidth="xl">
        {data ? (
          <Typography variant="h4" sx={{ mb: 5 }}>
            {data.basket.basketName}
          </Typography>
        ) : (
          <></>
        )}

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
          {yearlyChange ? (
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits2
                title={data.basket.basketName}
                basketId={basketId}
                data={data}
                subheader={yearlyChange.toFixed(2) + '% over the last year'}
              />
            </Grid>
          ) : (
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits
                title="Basket A"
                basketId={basketId}
                chartData={[
                  {
                    name: 'Team A',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  {
                    name: 'Team B',
                    type: 'area',
                    fill: 'gradient',
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: 'Team C',
                    type: 'line',
                    fill: 'solid',
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ]}
              />
            </Grid>
          )}
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits2
              title="Basket Makeup"
              basketId={basketId}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate2
              basketId={basketId}
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
            <AppOrderTimeline2
              title="Largest Trades"
              basketId={basketId}
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
