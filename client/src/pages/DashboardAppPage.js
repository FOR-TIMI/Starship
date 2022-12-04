import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import moment from 'moment';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BAR_DATA_QUERY } from '../utils/queries';
import {useQuery} from "@apollo/client"
import {useState,useEffect} from "react"
// sections
import {
  AppTasks,
  AppNewsUpdate,
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

  let closeP = { x: moment(), y: 0 };

  const vars = {
    symbol: 'SPY',
    timeframe: '1D',
    limit: 365,
    days: 365,
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

  if(error){
    console.log(error)
  }
  if (loading) {
    return <div>Loading</div>;
  }
  if (data) {
    console.log(data,"DATASA");
    
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
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <PriceLineChart
            title = {'Market Overview'}
            chartData ={[
              {
              name: 'SP500', 
              data: closeP
              }
            ]} 
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
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
