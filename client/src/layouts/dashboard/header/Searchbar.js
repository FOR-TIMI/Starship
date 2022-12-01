import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
  Autocomplete,
  TextField,
  Popper,
  Slide,
  Button,
  IconButton,
  InputAdornment,
  ClickAwayListener,
} from '@mui/material';
import qqqsymbols from '../../../utils/Data/symbolsList';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));
const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: ' inherit !important',
});

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const navigate = useNavigate();
  
  const handleOpen = () => {
    setValue(null);
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
    
  };
  const handleSearch = () => {
    
    setOpen(false);
  //  console.log(value);

  // navigate link to single ticker analysis page
    navigate(`/dashboard/analysis/${value}`);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Autocomplete
              sx={{ mr: 2, fontWeight: 'fontWeightBold' }}
              fullWidth
              autoFocus
              autoHighlight
              popupIcon={null}
              PopperComponent={StyledPopper}
              getOptionLabel={(post) => post}
              options={qqqsymbols}
              value={value}
              onChange={(event,newValue)=> setValue(newValue)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search post..."
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify
                          icon={'eva:search-fill'}
                          sx={{ ml: 5, width: 20, height: 20, color: 'text.disabled' }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
