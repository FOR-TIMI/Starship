import { Box, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { fShortenNumber } from '../../../utils/formatNumber';


let options = {
  legend: {
    show: false,
  },
  title: {
    text: 'Most Active Trades',
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
    },
    formatter: function (text, op) {
      return [text, fShortenNumber(op.value)];
    },
    offsetY: -4,
  },

  plotOptions: {
    treemap: {
      enableShades: true,
      shadeIntensity: 0.5,
      reverseNegativeShade: true,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 100,
            color: '#CD363A',
          },
          {
            from: 100.001,
            to: 300,
            color: '#52B12C',
          },
        ],
      },
    },
  },
};

export default function TreeMapChart({ color = 'primary', sx, ...other }) {

    // Initialize with dummy values and then update with latest values.
   let [value,setValue] = useState([
    {
      x: 'AAPL',
      y: 65537445,
    },
    {
      x: 'MSFT',
      y: 21528520,
    },
    {
      x: 'TSM',
      y: 10491845,
    },
    {
      x: 'NVDA',
      y: 37138858,
    },
    {
      x: 'ASML',
      y: 719750,
    },
    {
      x: 'ADBE',
      y: 2741993,
    },
    {
      x: 'ORCL',
      y: 4783119,
    },
  ]); 

  useEffect(()=>{fetch('https://production.dataviz.cnn.io/markets/stocks/aftermarket/actives/11/2')
  .then((res) => res.json())
  .then((data) => {
    let x = data.map((e)=>{
        return { x: e.symbol, y: e.market_volume}
    })
    setValue(x);
    
});
  },[])
  
  let series = [{data: value}];

  return (
    <Card>
    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
      <ReactApexChart type={'treemap'} series={series} options={options} height={364} />
    </Box>
    </Card>
  );
}
