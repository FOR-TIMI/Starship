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
      <Box sx={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-evenly' }}>
        <CardHeader title={title} subheader={subheader} />
        
        <CardActionArea sx={{ display:'flex'}}>
          <InputLabel sx={{ display: 'inline', justifyContent: 'space-evenly' }} id="demo-simple-select-label">
            Days
          </InputLabel>
          <Select
            sx={{ backgroundColor: 'white', justifyContent: 'space-evenly', width: '25%' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={age}
            label="Age"
            //onChange={handleChange}
          >
            <MenuItem value={1}>1Day</MenuItem>
            <MenuItem value={23}>3Days</MenuItem>
            <MenuItem value={5}>5Days</MenuItem>
            <MenuItem value={30}>1Month</MenuItem>
            <MenuItem value={90}>3Month</MenuItem>
            <MenuItem value={180}>6Month</MenuItem>
            <MenuItem value={365}>1Year</MenuItem>
            <MenuItem value={730}>2Year</MenuItem>
            <MenuItem value={1095}>3Year</MenuItem>
            <MenuItem value={1460}>4Year</MenuItem>
            <MenuItem value={1825}>5Year</MenuItem>
          </Select>
        </CardActionArea>
        <CardActionArea sx={{ display: 'inline' }}>
          <InputLabel sx={{ display: 'inline', justifyContent: 'space-evenly' }} id="demo-simple-select-label">
            Time
          </InputLabel>
          <Select
            sx={{ backgroundColor: 'white', justifyContent: 'space-evenly', width: '25%' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={age}
            label="Age"
            //onChange={handleChange}
          >
            <MenuItem value={'1Min'}>1Min</MenuItem>
            <MenuItem value={'5Min'}>5Min</MenuItem>
            <MenuItem value={'15Min'}>15Min</MenuItem>
            <MenuItem value={'1H'}>1Hour</MenuItem>
            <MenuItem value={'1D'}>1Day</MenuItem>
          </Select>
        </CardActionArea>
        
      </Box>

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
