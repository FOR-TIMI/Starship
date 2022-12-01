import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import {  Typography } from '@mui/material';



export default function SingleAnalysis() {
    let { symbol } = useParams(); 
    symbol = symbol.toUpperCase();
  
    return (
      <>
        <Helmet>
          <title> Single Analysis | Starship </title>
        </Helmet>
  

        <Typography variant="h4" sx={{ mb: 5 }}>
          Search for this stock:-  {symbol}
        </Typography>
       
      </>
    );
  }
  