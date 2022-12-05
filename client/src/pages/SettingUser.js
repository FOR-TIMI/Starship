import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { useMutation } from '@apollo/client';
import { validateEmail } from '../utils/helpers';
import { UPDATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';




const theme = createTheme();

export default function SettingUser() {
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isModal, setIsModal] = React.useState(false);
 
  

  function handleModalOpen() {
    setIsModal(!isModal);
  }


 async function handleClick(e) {
    const vars = {
    avatar: `avatar_${e.target.accessKey}.jpg`
    };
    try{
    const response = updateUser({
    variables: vars,
    });
    await response;
    window.location.reload();
  }
  catch(e){
    console.log(e);
  }

  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexWrap: 'wrap',
  };



 

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ width: 100, height: 100, m: 1, bgcolor: 'secondary.main' }}>
            
          </Avatar>
          <Typography component="h1" variant="h5">
           Edit Avatar
          </Typography>
          <Box  sx={{ mt: 1 }}>
           
           
            <Button onClick={handleModalOpen} fullWidth  sx={{ mt: 3, mb: 2, border:2,  borderRadius: 50 }}>
              Select New Avatar
            </Button>
          </Box>
        </Box>
        <Modal
        open={isModal}
        onClose={handleModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
       { [...Array(24)].map((e,i)=>{
          return (<Box
          onClick={handleClick}
          component="img"
          key={i}
          accessKey={i+1}
          src={`/assets/images/avatars/avatar_${i+1}.jpg`}
          sx={{
            borderRadius: 50,
            width: 75,
            p: 1,
            cursor: "pointer"
          }}
        />)
        }) }
        </Box>
      </Modal>
      </Container>
    </ThemeProvider>
  );
}
