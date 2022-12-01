import {  useState } from 'react';
// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

const moment = require("moment");

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

FearGreedSummary.propTypes = {
  color: PropTypes.string,
  sx: PropTypes.object,
};

export default function FearGreedSummary({ color = 'primary', sx, ...other }) {
  
  const [fearGreedRating, setFearGreedRating] = useState("----");
  const [fearGreedScore, setFearGreedScore] = useState(null);
  const [icon, setIcon] = useState("line-md:loading-alt-loop"); 

  // https://production.dataviz.cnn.io/index/fearandgreed/graphdata/2022-12-01
  let day = moment().format().split('T')[0];
  fetch(`https://production.dataviz.cnn.io/index/fearandgreed/graphdata/${day}`)
    .then((response) => response.json())
    .then((data) => {

      let{score,rating}= data.fear_and_greed;
       score = Math.floor(score);
       rating = rating[0].toUpperCase() + rating.substring(1);
       setFearGreedRating(rating);
       setFearGreedScore(score);
      
switch (true) {
    case (fearGreedScore < 25):
      setIcon("fluent-emoji:fearful-face");
        break;
    case (fearGreedScore < 45):
      setIcon("fluent-emoji:grimacing-face");
        break;
    case (fearGreedScore < 55):
      setIcon("fluent-emoji:neutral-face");
        break;
        case (fearGreedScore < 75):
      setIcon("fluent-emoji:money-mouth-face");
        break;
        case (fearGreedScore <= 100):
      setIcon("emojione:money-with-wings");
        break;
    default:
      setIcon("fluent-emoji:neutral-face");
        break;
}

    });

  return (
    <Card
      sx={{
        py: 2,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={40} height={40} />
      </StyledIcon>
      
      <Typography variant="subtitle2" >
        Fear & Greed Index
      </Typography>

      <Typography variant="h3">{fShortenNumber(fearGreedScore)}</Typography>

      

      <Typography variant="subtitle2" sx={{ pt:1, opacity: 0.72 }}>
        {fearGreedRating} is driving <br></br>
        the US market
      </Typography>
    </Card>
  );
}
