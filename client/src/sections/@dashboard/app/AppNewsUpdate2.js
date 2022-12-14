// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { useQuery } from '@apollo/client';
import { NEWS_QUERY, GET_BASKET } from '../../../utils/queries';
// ----------------------------------------------------------------------

AppNewsUpdate2.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppNewsUpdate2({ title, basketId, subheader, list, ...other }) {
  const vars = {
    id: basketId,
  };
  const { loading, error, data } = useQuery(GET_BASKET, {
    variables: vars,
  });

  if (data) {

    return (
      <Card {...other}>
        <CardHeader title={'News'} subheader={subheader} />

        <NewsContainer ticker={data.basket.tickers[0].symbol} />

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
            View all
          </Button>
        </Box>
      </Card>
    );
    // });
  }
}

// ----------------------------------------------------------------------

function NewsContainer({ ticker }) {
  let vars = {
    ticker: ticker,
  };
  const { loading, error, data } = useQuery(NEWS_QUERY, {
    variables: vars,
  });

  if (data) {


    return (
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {data.getNews.map((news) => (
            <NewsItem key={news.title} news={news} />
          ))}
        </Stack>
      </Scrollbar>
    );
  }
}

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),
};

function NewsItem({ news }) {
  const { title, pubDate, link, content, img } = news;
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box component="img" src={img} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" href={link} underline="hover" noWrap>
          {title.substr(0, 95) + '...'}
        </Link>

        <Typography variant="body2" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }} noWrap>
          {content.substr(0, 98) + '...'}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {pubDate}
      </Typography>
    </Stack>
  );
}
