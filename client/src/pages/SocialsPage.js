import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Stack,
  Container,
  Typography,
  TableContainer,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
// components
import { useQuery } from '@apollo/client';
import FollowingTable from '../components/following-table'
import FollowerTable from '../components/follower-table';
import Scrollbar from '../components/scrollbar';
//from utils
import { QUERY_SOCIAL } from '../utils/queries';
import { QUERY_ME } from '../utils/queries'

// ----------------------------------------------------------------------

export default function UserPage() {
  
  // for toggling following/follower list:
  const [social, setSocial] = useState('following')
  const [toggle, setToggle] = useState(true)
  const [alignment, setAlignment] = useState('following');
    
  const {data: signedInData} = useQuery(QUERY_ME)
  const signedInUser = signedInData?.signedInUser || {}
  const myUser = signedInUser.username

  // querying and unpacking data from user query [following] or [follower]:
  const { loading, data, refetch } = useQuery(QUERY_SOCIAL, {
      variables: {username: myUser}
    },
    {
      // The query will not execute until the userId exists
      enabled: !!myUser,
    }
  )
    
  const users = data?.user || {}
  const userFollowers = users.followers
  const userFollowings = users.followings

  useEffect(()=>{
    refetch()
  }, [social,toggle])
  

  let userList
  if (social === 'following') {
    userList = userFollowings
  } else {
    userList = userFollowers
  }

  const handleSocial = (socialString) =>
  {
    setSocial(socialString)
  }
  const handleToggle = () => {
    setToggle(!toggle)
  }

  const handleChangeSocial = (newAlignment) => {
    setAlignment(newAlignment);
  };
  
  
  if (loading) {
    return <div> Loading... </div>
  }

  return (
    <>
      <Helmet>
        <title> Socials | StarShip </title>
      </Helmet>

      <Container>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

          <Typography variant="h3" gutterBottom>
             Socials: {social==='following'? 'Following': 'Followers'}
          </Typography>

          <ToggleButtonGroup
            
            value={alignment}
            exclusive
            onChange={handleChangeSocial}
            aria-label="Platform"
          >
            <ToggleButton value='following' onClick={()=>{handleSocial('following')}}>Following</ToggleButton>
            <ToggleButton value='follower' onClick={()=>{handleSocial('follower')}}>Follower</ToggleButton>
          </ToggleButtonGroup>
          
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              {social === 'following'? 
                <FollowingTable handleToggle={handleToggle} userFollowings={userFollowings}/>:
                <FollowerTable handleToggle={handleToggle} userFollowers={userFollowers}/>}
            </TableContainer>
          </Scrollbar>
        </Card>

      </Container>
    </>
  );
}
