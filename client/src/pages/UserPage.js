import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState, useReducer } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
// components
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import UnfollowButton from '../components/unfollow-button'
import FollowButton from '../components/follow-button'
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead} from '../sections/@dashboard/user';
//query
import { QUERY_SOCIAL } from '../utils/queries';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'followingBasket', label: 'See how their baskets are doing.', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------


export default function UserPage() {
  
  // for toggling following/follower list:
  const [social, setSocial] = useState('following')
  
  // querying and unpacking data from user query [following] or [follower]:
      
  const { loading, data } = useQuery(QUERY_SOCIAL, {
    variables: { username: 'Justen40'}
  })

  const users = data?.user || {}

  const userFollowers = users.followers
  const userFollowings = users.followings 

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

  const handleChangeSocial = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  // ---------------------------- //
  
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Helmet>
        <title> Following | StarShip </title>
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
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                />
                <TableBody>
                  {userList.map( ( user, index) => {
                      
                      const id = user._id
                      const name = user.username
                      const avatarUrl = `/assets/images/avatars/${user.avatar}` 
                      
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" >
                        
                        <TableCell padding="checkbox"/>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">
                          <Link to="/">
                            Click to view {name}'s basket
                          </Link>
                        </TableCell>

                        
                          {social==='following'? <UnfollowButton user= {user} />: 
                          <FollowButton  user = {user} />}
                        

                          
 
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          
        </Card>
      </Container>
    </>
  );
}
