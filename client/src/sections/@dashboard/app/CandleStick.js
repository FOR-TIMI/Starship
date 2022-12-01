import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, Box } from '@mui/material';
// components


// ----------------------------------------------------------------------

CandleStick.propTypes = {
 
  chartData: PropTypes.array.isRequired,
  
};

export default function CandleStick({ chartData }) {
  let chartOptions = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  }

  return (
    <Card >
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart  series={chartData}  options={chartOptions} type="candlestick" height={350} />
      </Box>
    </Card>
  );
}
