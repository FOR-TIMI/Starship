import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, SocialProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_SOCIAL_BASKETS } from '../utils/queries'

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const {username} = useParams()

  const {loading, error, data} = useQuery(GET_SOCIAL_BASKETS, {
    variables: {username: username}
  })

  

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>
      
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {`${username}'s Baskets`}
        </Typography>
        
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        {data?<SocialProductList baskets={data.socialBaskets} />: null}

        <ProductCartWidget />
        
      </Container>
    </>
  );
}
