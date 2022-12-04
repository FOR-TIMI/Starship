import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useEffect, useState } from 'react';
import { useChart } from '../../../components/chart';
import { BARS_DATA_QUERY, GET_DATA_FROM_BASKET } from '../../../utils/queries';
import { useQuery } from '@apollo/client';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};
// chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
// chartData: PropTypes.array.isRequired,

export default function AppWebsiteVisits({ basketId, data, title, subheader, ...other }) {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    let chartDataInput = {
      name: 'Basket A',
      type: 'line',
      fill: 'solid',
      data: [...data.getDataFromBasket.map((i) => i.VWAP.toFixed(2))],
    };
    let arr = [];
    arr.push(chartDataInput);
    setChartData(arr);
  }, []);

  const chartOptions = useChart({
    labels: [...data.getDataFromBasket.map((i) => i.Timestamp)],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });
  if (chartData) {
    return (
      <Card {...other}>
        <CardHeader title={title} subheader={subheader} />

        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
        </Box>
      </Card>
    );
  }
}
