import React from 'react';
import { 
    Table,
    Stack,
    Avatar,
    TableRow,
    TableBody,
    TableCell,
    Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import FollowButton from '../follow-button'
import NoFollower from '../noFollowers';
import { UserListHead } from '../../sections/@dashboard/user';
import Iconify from '../iconify/Iconify';

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'followingBasket', label: 'See how their baskets are doing.', alignRight: false },
    { id: 'FollowUnfollow', label: 'Follow or Unfollow', alignRight: false },
  ];

export default function FollowerTable (props) {
    const {userFollowers, handleToggle} = props


    return (
        <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                  rowCount={userFollowers.length}
                />
                <TableBody>
                  {!userFollowers.length? <NoFollower/> :
                  userFollowers.map((user) => {
                    const id = user._id
                    const name = user.username
                    const isVerified = user.isVerified
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
                          {isVerified?<Iconify icon={'icon-park:success'} width={20} />:null}
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Link to={`/dashboard/baskets/${name}`} >
                          Click to view {name}'s basket
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        <FollowButton styleProps={{width: 75}} user= {user} handleToggle={handleToggle} /> 
                      </TableCell>
                               
                    </TableRow>
                  );
                })
                  
                  }
                  
                </TableBody>
        </Table>
    )
}