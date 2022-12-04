import PropTypes from 'prop-types';
import { useState } from 'react';
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import { Navigate, useNavigate } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { GET_BASKETS } from '../../../utils/queries';
// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ baskets, ...other }) {
  const { loading, error, data } = useQuery(GET_BASKETS);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  function handleClick(id) {
    console.log('hello');
    navigate('/dashboard/user/' + id);
  }

  if (loading) {
    console.log('loading');
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data, 'THIS DATA BASKETS');

    return (
      <Grid container spacing={3} {...other}>
        {data.baskets.map((basket, key) => (
          <Grid
            key={basket._id}
            onClick={() => {
              handleClick(basket._id);
            }}
            item
            xs={12}
            sm={6}
            md={3}
          >
            <ShopProductCard basket={basket} basketKey={key + 1} />
          </Grid>
        ))}
      </Grid>
    );
  }
}
