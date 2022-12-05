import PropTypes from 'prop-types';

// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';
import FollowButton from '../../../components/follow-button';

//
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';







// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  // post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

const label = { inputProps: { 'aria-label': 'Checkbox' } };

export default function BlogPostCard({ post, index, modalToggle,loading }) {
  

  
  
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const POST_INFO = [
    { number: post ? post.commentCount : 0, icon: 'eva:message-circle-fill',name: "comment" },
    { number: post ? post.likeCount : 0, icon: 'eva:heart-outline', name: "like" },
  ];
 
 

  const handleClick = (e) => {
     console.log(e.target.dataset)
     return;
  }

 


  return (
    <Grid 
      item xs={12} 
      sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}
      
    >
      
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          { post ? <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
              ...((latestPostLarge || latestPost) && { display: 'none' }),
            }}
          /> : (
            <Skeleton variant='circular' sx={{
              width: 36,
              height: 36,
              zIndex: 9,
              left: 24,
              bottom: -15,
              position: 'absolute',
              ...((latestPostLarge || latestPost) && { display: 'none' }),
            }} />
          ) }
          
          {
            post ? (
              <div>
                <StyledAvatar
                  alt={post.author.username}
                  src={`/assets/images/avatars/${post.author.avatar}`}
                  sx={{
                  ...((latestPostLarge || latestPost) && {
                  zIndex: 9,
                  top: 24,
                  left: 24,
                  width: 40,
                  height: 40,
                  }),
                  }}
                /> 
                <FollowButton user={post.author}/>
              </div>
           
              ) 
              : (
                <Skeleton variant="circular" sx={{
                  ...((latestPostLarge || latestPost) && {
                    position: 'absolute',
                    zIndex: 9,
                    top: 24,
                    left: 24,
                    width: 40,
                    height: 40,
                  }),
                  ...((!latestPost && !latestPostLarge) && {
                    display: "none"
                  })
                }} />
              ) 
            
          }

          
         

           {post && <StyledCover alt={post.title} src={`/assets/images/covers/${post.coverPhoto}`}/>}
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          { post ? (
            <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {post.createdAt}
          </Typography>
          ) : (
            <Skeleton variant="rectangular" width="60%" height="5"  />
          )
        
        }

         {
          post ? (
            <StyledTitle
              color="inherit"
              variant="subtitle2"
              underline="hover"
              sx={{
                ...(latestPostLarge && { typography: 'h5', height: 60 }),
                ...((latestPostLarge || latestPost) && {
                  color: 'common.white',
                }),
                cursor: "pointer"
              }}
              onClick={() => modalToggle(post._id)}
            >
              {post.title}
            </StyledTitle>
          ) : (
            <Skeleton width="100%" variant="rectangular"
            sx={{
              mt: 0.5
            }}   
          />
          )
         }

          <StyledInfo>
            {post ? POST_INFO.map((info, index) => (
              <Box
                data-name={info.name}
                key={index}
                sx={{
                  "&:hover":{
                      color: 'blue'
                  },
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500',
                  }), 
                }}
              >
                { info.name === 'like' ? 
                 (<Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />}/>)
                 : (<Iconify icon={info.icon} sx={{ width: 24, height: 24, mr: 0.5 }} />)
                }
                
                <Typography variant="caption">{fShortenNumber(info.number) || 0}</Typography>
              </Box>
            )) : (
              <Box key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                ml: index === 0 ? 0 : 1.5,
              }}> 
                <Skeleton variant="circular" sx={{ width: 20, height: 20, mr: 0.5 }} />
                <Skeleton variant="circular"  sx={{ width: 20, height: 20, mr: 0.5 }} />
              </Box>
            )
          
          }

          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
}
