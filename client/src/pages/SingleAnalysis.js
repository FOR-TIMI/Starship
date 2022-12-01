import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
// @mui functions
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { BAR_DATA_QUERY } from '../utils/queries';
// components
import Iconify from '../components/iconify';
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';


// {  "symbol": "AAPL",
//   "timeframe": "1Min",  "limit": 50,
//   "days": 5
// }

export default function SingleAnalysis() {
    const theme = useTheme();
    // let { symbol } = useParams(); 
    // const [barDataQuery, { data, loading, error }] = useQuery(BAR_DATA_QUERY);
    // symbol = symbol.toUpperCase();


  const vars = {
    symbol: "AAPL",
    timeframe: "1Min",
    limit: 50,
    days: 5
}
// {"data":{"barDataQuery":[{"ClosePrice"
  const {data} = useQuery(BAR_DATA_QUERY, { variables: vars } );
if(data){
  
  data.barDataQuery.forEach(element => {
    console.log(element.ClosePrice);
  });
  
}
  
    
    return (
      <>
        <Helmet>
          <title> Single Analysis | Starship </title>
        </Helmet>
  
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Search for this stock:-  
          </Typography>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Timestamp" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Volume" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="High Price" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Low Price" total={234} color="error" icon={'ant-design:bug-filled'} />
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
  