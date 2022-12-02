import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { InputLabel, Select, Card, CardHeader, Box, MenuItem, TextField, CardActionArea } from '@mui/material';
// components
import { useChart } from '../../../components/chart';
// ----------------------------------------------------------------------

PriceLineChart.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

// labels: chartLabels,
// xaxis: { type: 'datetime' },

// },

export default function PriceLineChart({ title, subheader, chartData }) {
  const chartOptions = {
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `$${y} `;
          }
          return y;
        },
      },
    },
  };

  let options = [1, 2, 3];

  return (
    <Card>
      <Box  sx={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-evenly' }}>
        <CardHeader title={title} subheader={subheader} />
        <CardActionArea>
        <InputLabel id="demo-simple-select-label">Limits</InputLabel>
        <Select  sx={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-evenly', width: '15%' }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //value={age}
          label="Age"
          //onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </CardActionArea>
      </Box>

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
