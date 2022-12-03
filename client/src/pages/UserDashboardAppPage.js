import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useParams } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { useQuery } from '@apollo/client';
import { BARS_DATA_QUERY, GET_BASKET, GET_DATA_FROM_BASKET } from '../utils/queries';
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate2,
  AppOrderTimeline,
  AppCurrentVisits2,
  AppWebsiteVisits2,
  AppTrafficBySite,
  AppWidgetSummary2,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// import { dataToBasket } from '../utils/dataToBasket';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [parsedData, setParsedData] = useState();
  const [chartLabels, setChartLabels] = useState();
  const [timestamps, setTimestamps] = useState();
  // const [weeklyChange, setWeeklyChange] = useState(0);
  let { basketId } = useParams();
  // const vars2 = {
  //   id: basketId,
  // };
  // const { loading2, error2, data2 } = useQuery(GET_BASKET, {
  //   variables: vars2,
  // });
  // if (loading2) {
  //   console.log('LOADING');
  // }
  // if (data2) {
  //   console.log(data2, 'DATA 2');
  // }

  const theme = useTheme();
  const vars = {
    getDataFromBasketId: basketId,
    timeframe: '1D',
    limit: 365,
    days: 365,
  };

  const { loading, error, data } = useQuery(GET_DATA_FROM_BASKET, {
    variables: vars,
  });

  if (data) {
    // daily change
    let dailyChange =
      data.getDataFromBasket[data.getDataFromBasket.length - 1].VWAP -
      data.getDataFromBasket[data.getDataFromBasket.length - 2].VWAP;
    dailyChange = (dailyChange / data.getDataFromBasket[data.getDataFromBasket.length - 2].VWAP) * 100;

    // weekly change
    let weeklyChange =
      data.getDataFromBasket[data.getDataFromBasket.length - 1].VWAP -
      data.getDataFromBasket[data.getDataFromBasket.length - 7].VWAP;
    weeklyChange = (weeklyChange / data.getDataFromBasket[data.getDataFromBasket.length - 7].VWAP) * 100;

    // monthly change
    let monthlyChange =
      data.getDataFromBasket[data.getDataFromBasket.length - 1].VWAP -
      data.getDataFromBasket[data.getDataFromBasket.length - 30].VWAP;
    monthlyChange = (monthlyChange / data.getDataFromBasket[data.getDataFromBasket.length - 30].VWAP) * 100;

    // yearly change
    let yearlyChange = data.getDataFromBasket[data.getDataFromBasket.length - 1].VWAP - data.getDataFromBasket[0].VWAP;
    yearlyChange = (yearlyChange / data.getDataFromBasket[0].VWAP) * 100;

    return (
      <>
        <Helmet>
          <title> Dashboard | Starship </title>
        </Helmet>

        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Basket A
          </Typography>

          <Grid container spacing={3}>
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

            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits2
                title="Basket A"
                basketId={basketId}
                data={data}
                subheader={yearlyChange.toFixed(2) + '% over the last year'}
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
            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits2
                title="Basket Makeup"
                basketId={basketId}
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
            <Grid item xs={12} md={6} lg={8}>
              <AppConversionRates
                title="Conversion Rates"
                subheader="(+43%) than last year"
                chartData={[
                  { label: 'Italy', value: 400 },
                  { label: 'Japan', value: 430 },
                  { label: 'China', value: 448 },
                  { label: 'Canada', value: 470 },
                  { label: 'France', value: 540 },
                  { label: 'Germany', value: 580 },
                  { label: 'South Korea', value: 690 },
                  { label: 'Netherlands', value: 1100 },
                  { label: 'United States', value: 1200 },
                  { label: 'United Kingdom', value: 1380 },
                ]}
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
            <Grid item xs={12} md={6} lg={4}>
              <AppTrafficBySite
                title="Traffic by Site"
                list={[
                  {
                    name: 'FaceBook',
                    value: 323234,
                    icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                  },
                  {
                    name: 'Google',
                    value: 341212,
                    icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                  },
                  {
                    name: 'Linkedin',
                    value: 411213,
                    icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                  },
                  {
                    name: 'Twitter',
                    value: 443232,
                    icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <AppTasks
                title="Tasks"
                list={[
                  { id: '1', label: 'Create FireStone Logo' },
                  { id: '2', label: 'Add SCSS and JS files if required' },
                  { id: '3', label: 'Stakeholder Meeting' },
                  { id: '4', label: 'Scoping & Estimations' },
                  { id: '5', label: 'Sprint Showcase' },
                ]}
              />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
  // }
}
