import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
// components
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import FollowButton from '../components/toggle-button'
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock--currently being fed into the list function filteredUsers
import USERLIST from '../_mock/user';
import { QUERY_SOCIAL } from '../utils/queries';
// query user to get [followings]
// then list usernames based on the ids within [followings]

// pseudo code:
// add toggle between Followers/Following
// based on the toggle populate list with userIds(pull associated usernames and baskets) from 
// from following list; option to unfollow (pull user id from following array)
// from followers list; cannot delete follower (dont normally delete followers anyway) FUTURE DIRECTIONS? maybe block? and then run a "validator" to check if the id exists in [blocked]
// in the following/follower list there will be a link to a basketpage. Should be similar to Basket page of the context.user but for the follower or following.
// in follower/following page, add follow button. once clicked set to unfollow button
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'followingBasket', label: 'See how they\'re baskets are doing.', alignRight: false },
  // { id: 'company', label: 'Company', alignRight: false },
  // { id: 'role', label: 'Role', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [toggleSelected, setToggleSelected] = React.useState(false);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // for toggling following/follower list:
  const [social, setSocial] = useState('following')
  
  // for toggling follow or unfollow option under Followers page
  const [follow, setFollow] = useState('')
  // querying and unpacking data from user query [following] or [follower]:
  
    // const { id: userId } = useParams();
    
  const { loading, data } = useQuery(QUERY_SOCIAL, {
    variables: { username: 'Johann_Rutherford'}
  })

  const users = data?.user || {}

  const userFollowers = users.followers
  const userFollowings = users.followings 

  // -----------------for toggle button-----------------------//

  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  // ---------------------------- //
  const handleFollowToggle = (event) => {
    console.log('toggle clicked', event.target.getAttribute('id'))
  }
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  // const filteredUsers = applySortFilter(userSocial, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  let userList
  if (social === 'following') {
    // const userlist = userSocial.followings
    console.log(userFollowings)
    userList = userFollowings
  } else {
    // const userlist = userSocial.followers
    console.log(userFollowers)
    userList = userFollowers
  }

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
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="web" onClick={()=>{setSocial('following')}}  >Following</ToggleButton>
            <ToggleButton value="android" onClick={()=>{setSocial('follower')}}  >Follower</ToggleButton>
          </ToggleButtonGroup>
          {/* <Typography variant="h4" gutterBottom>
            Following
          </Typography> */}
          {/* <Button variant="contained" */}
          {/* feature not required, this page is for friends of user already */}
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Friend
          </Button> */}
        </Stack>

        <Card>
          {/* Filter friends list by name; match the name */}
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {/* filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, status, company, avatarUrl, isVerified } = row;
                    const selectedUser = selected.indexOf(name) !== -1; */

                    userList.map( ( user, index) => {
                      
                      const id = user._id
                      const name = user.username
                      const selectedUser = selected.indexOf(name) !== -1
                      const avatarUrl = 'avatar'                  
                    
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        {/* Where name is being fed into
                          TODO: feed usernames from [friends] of context.user
                        */}
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

                        <FollowButton user = {user} />
                        {/* <TableCell align="left">{company}</TableCell> */}

                        {/* <TableCell align="left">{role}</TableCell> */}

                        {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell> */}

                        {/* <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={social==='following' ? userFollowings.length : userFollowers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        
        {/* <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem> */}

        {/* vertical ellipses with popover for deleting from list 
            TODO: add functionality to 'Remove Friend'
        */}
        { social === 'following'?
         <MenuItem sx={{ color: 'error.main' }} onClick={()=> 
          console.log('unfollow clicked')}
          >
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Unfollow
         </MenuItem> :
         <MenuItem name={`${follow}`} onClick={(event)=>
         console.log(event.target.parentElement.parentElement) }
         >
          <Iconify/>
          {follow}
         </MenuItem>
        }
        
      </Popover>
    </>
  );
}
