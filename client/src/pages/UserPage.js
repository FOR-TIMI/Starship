import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Stack,
  Container,
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




// ----------------------------------------------------------------------


export default function UserPage() {
  
  // for toggling following/follower list:
  const [social, setSocial] = useState('following')
  const [toggle, setToggle] = useState(true)

    
  // querying and unpacking data from user query [following] or [follower]:
      
  const { loading, data, refetch } = useQuery(QUERY_SOCIAL, {
    variables: { username: 'Justen40'}
  })
    
  const users = data?.user || {}
  const userFollowers = users.followers
  const userFollowings = users.followings

  useEffect(()=>{
    refetch()
  }, [social,toggle])
  

  let userList
  if (social === 'following') {
    console.log(userFollowings)
    userList = userFollowings
  } else {
    console.log(userFollowers)
    userList = userFollowers
  }

  // -----------------for toggle button-----------------------//

  const [alignment, setAlignment] = React.useState('following');

  
  const handleToggle = () => {
    setToggle(!toggle)
  }

  const handleChangeSocial = (event, newAlignment, id) => {
    setAlignment(newAlignment);
    
  };
  // ---------------------------- //
  
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Helmet>
        <title> Socials | StarShip </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChangeSocial}
            aria-label="Platform"
          >
            <ToggleButton value='following' onClick={()=>{setSocial('following')}}>Following</ToggleButton>
            <ToggleButton value='follower' onClick={()=>{setSocial('follower')}}>Follower</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Card>
          
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              {social === 'following'? <FollowingTable handleToggle={handleToggle} userFollowings={userFollowings}/>:<FollowerTable handleToggle={handleToggle} userFollowers={userFollowers}/>}
            </TableContainer>
          </Scrollbar>

        </Card>
      </Container>
    </>
  );
}
