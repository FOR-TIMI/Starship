import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import Auth from '../../utils/auth';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  
  const loggedIn = Auth.loggedIn();
  if (!loggedIn) {
    return (
      <Box {...other}>
        <List disablePadding sx={{ p: 1 }}>
          {data
            .filter((item) => item.title === 'dashboard')
            .map((filteredItem) => (
              <NavItem key={filteredItem.title} item={filteredItem} />
            ))}
        </List>
      </Box>
    );
  } else {
    return (
      <Box {...other}>
        <List disablePadding sx={{ p: 1 }}>
          {data.map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
        </List>
      </Box>
    );
  }
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
