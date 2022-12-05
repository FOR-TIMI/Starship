import PropTypes from 'prop-types';
import { useState } from 'react';
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
  const [thedata, setThedata] = useState();
  const [clicked, setClicked] = useState(false);

  if (data && !thedata) {
    setThedata(data);
  }
  if (thedata) {
    return (
      <Grid container spacing={3} {...other}>
        {thedata.baskets.map((basket, key) => (
          <Grid key={basket._id} item xs={12} sm={6} md={3}>
            <ShopProductCard setThedata={setThedata} basket={basket} basketId={basket._id} basketKey={key + 1} />
          </Grid>
        ))}
      </Grid>
    );
  }
}
