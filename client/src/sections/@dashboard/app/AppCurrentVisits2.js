import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { useState, useEffect } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { useChart } from '../../../components/chart';
import { GET_BASKETS, GET_BASKET } from '../../../utils/queries';
import { useQuery } from '@apollo/client';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

AppCurrentVisits2.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColors: PropTypes.arrayOf(PropTypes.string),
  chartData: PropTypes.array,
};

export default function AppCurrentVisits2({ basketId, title, subheader, chartColors, ...other }) {
  const theme = useTheme();
  const [theData, setTheData] = useState();
  const [chartSeries, setChartSeries] = useState();
  const [chartLabels, setChartLabels] = useState();
  const variables = {
    id: basketId,
  };
  // console.log(variables);
  const { loading, error, data } = useQuery(GET_BASKET, {
    variables: variables,
  });
  if (error) {
    // console.log(error);
  }
  if (data) {
    // console.log(data, 'THE DAATA');
  }

  useEffect(() => {
    if (data && !theData) {
      sortTickers(data.basket.tickers);
    }
    if (theData) {
      let chl = theData.map((i) => i.label);
      setChartLabels(chl);
      let chs = theData.map((i) => i.value);
      setChartSeries(chs);
      // console.log(chs, 'CHS');
    }
  }, [data, theData]);

  const chartOptions = useChart({
    colors: chartColors,
    labels: chartLabels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  function sortTickers(tickers) {
    if (tickers) {
      let d = [];
      for (let i = 0; i < tickers.length; i++) {
        let each = {};
        each['label'] = tickers[i].symbol;
        each['value'] = 100;
        d.push(each);
        // console.log(each, 'EACG');
        if (i === tickers.length - 1) {
          setTheData(d);
          // console.log(d, 'DDDD');

          // console.log(theData, 'DAAATA');
        }
      }
    }
  }

  if (chartSeries) {
    return (
      <Card {...other}>
        <CardHeader title={title} subheader={subheader} />

        <StyledChartWrapper dir="ltr">
          <ReactApexChart type="pie" series={chartSeries} options={chartOptions} height={280} />
        </StyledChartWrapper>
      </Card>
    );
  }
}
