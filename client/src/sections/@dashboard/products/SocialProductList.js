import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

SocialProductList.propTypes = {
  baskets: PropTypes.array.isRequired,
};



export default function SocialProductList({ baskets, ...other }) {
  
  const navigate = useNavigate();

  function handleClick(id) {
    navigate('/dashboard/user/' + id);
  }

    return (
      <Grid container spacing={3} {...other}>
        {baskets.map((basket, key) => (
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
