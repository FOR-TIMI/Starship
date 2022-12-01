import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

import { useQuery } from '@apollo/client';
import { GET_BASKETS } from '../../../utils/queries';
// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ baskets, ...other }) {
  const { loading, error, data } = useQuery(GET_BASKETS);

  if (loading) {
    console.log('loading');
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log('got data');
    console.log(data.baskets);

    // console.log(products);
    return (
      <Grid container spacing={3} {...other}>
        {data.baskets.map((basket, key) => (
          <Grid key={basket.id} item xs={12} sm={6} md={3}>
            <ShopProductCard basket={basket} basketKey={key + 1} />
          </Grid>
        ))}
      </Grid>
    );
  }
}
