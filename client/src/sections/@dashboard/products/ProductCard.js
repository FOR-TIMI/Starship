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
import { AppCurrentVisits } from '../../@dashboard/app';
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

export default function ShopProductCard({ basket, basketKey }) {
  const [data, setData] = useState();
  // const { name, cover, price, colors, status, priceSale } = basket;
  const { _id, createdAt, tickers } = basket;
  const theme = useTheme();
  // if (tickers) {
  // console.log(tickers.length, 'THIS TICKERS');
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
        console.log(each, 'EACG');
        if (i === tickers.length - 1) {
          setData(theData);
          // console.log(theData, 'DAAATA');
        }
      }
    }
  }

  if (data) {
    console.log(data, 'THISSS');
    return (
      <Card>
        <Grid>
          <AppCurrentVisits
            title={'Basket ' + basketKey.toString()}
            chartData={data}
            // chartData={[
            //   { label: 'America', value: 4344 },
            //   { label: 'Asia', value: 5435 },
            //   { label: 'Europe', value: 1443 },
            //   { label: 'Africa', value: 4443 },
            // ]}
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

// {
// /* <Stack spacing={2} sx={{ p: 3 }}>
//           <Link color="inherit" underline="hover">
//             <Typography variant="subtitle2" noWrap></Typography>
//           </Link>

//           <Stack direction="row" alignItems="center" justifyContent="space-between">
//             {/* <ColorPreview colors={colors} /> */
// }

//     <Typography variant="subtitle1">
//       <Typography
//         component="span"
//         variant="body1"
//         sx={{
//           color: 'text.disabled',
//           textDecoration: 'line-through',
//         }}
//       >
//         {/* {priceSale && fCurrency(priceSale)} */}
//       </Typography>
//       &nbsp;
//       {/* {fCurrency(price)} */}
//     </Typography>
//   </Stack> */}
// </Stack>
