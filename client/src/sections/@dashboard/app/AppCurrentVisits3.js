import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { useChart } from '../../../components/chart';
import Iconify from '../../../components/iconify';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import { DELETE_BASKET } from '../../../utils/mutations';
import { GET_BASKETS } from '../../../utils/queries';
import { Navigate, useNavigate } from 'react-router-dom';

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

AppCurrentVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColors: PropTypes.arrayOf(PropTypes.string),
  chartData: PropTypes.array,
};

export default function AppCurrentVisits({
  setThedata,
  basketId,
  id,
  title,
  subheader,
  chartColors,
  chartData,
  ...other
}) {
  const theme = useTheme();
  const [deleteBasket] = useMutation(DELETE_BASKET);
  const [getBaskets, { loading, error, data }] = useLazyQuery(GET_BASKETS, { fetchPolicy: 'network-only' });

  const navigate = useNavigate();

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

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

  async function deleteClicked() {
    await deleteBasket({ variables: { basketId: id } });
    getBaskets();
  }

  function handleClick(id) {
    navigate('/dashboard/user/' + id);
  }

  if (data) {
    console.log(data);
    setThedata(data);
  }

  return (
    <Card {...other} className="pointer">
      <div className="card-header">
        <CardHeader title={title} subheader={subheader} />
        <Iconify
          className="delete-button"
          icon={'material-symbols:delete-outline'}
          width={30}
          height={30}
          color={'#FF0000'}
          onClick={deleteClicked}
        />
      </div>

      <StyledChartWrapper
        dir="ltr"
        onClick={() => {
          handleClick(basketId);
        }}
      >
        <ReactApexChart type="pie" series={chartSeries} options={chartOptions} height={280} />
      </StyledChartWrapper>
    </Card>
  );
}
