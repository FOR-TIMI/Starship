import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import { useTheme } from '@mui/material/styles';
import { AppCurrentVisits3 } from '../../@dashboard/app';
import { useState } from 'react';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ setThedata, basketId, basket, basketKey }) {
  const [data, setData] = useState();
  const { _id, createdAt, tickers, basketName } = basket;
  const theme = useTheme();

  useEffect(() => {
    sortTickers(tickers);
  }, []);

  function sortTickers(tickers) {
    if (tickers) {
      let theData = [];
      for (let i = 0; i < tickers.length; i++) {
        let each = {};
        each['label'] = tickers[i].symbol;
        each['value'] = 100;
        theData.push(each);
        if (i === tickers.length - 1) {
          setData(theData);
        }
      }
    }
  }

  if (data) {
    return (
      <Card>
        <Grid>
          <AppCurrentVisits3
            setThedata={setThedata}
            basketId={basketId}
            title={basketName}
            chartData={data}
            id={_id}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.info.main,
              theme.palette.warning.main,
              theme.palette.error.main,
            ]}
          />
        </Grid>
      </Card>
    );
  }
}
