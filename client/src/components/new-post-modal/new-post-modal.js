import React,{ useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import Checkbox from '@mui/material/Checkbox';


import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { FormControlLabel, Radio, RadioGroup,FormLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

//Form Elements
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';


//Icons
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const formStyle = {
  width: '90%',
  margin: '0 auto'
}

// const coverPhotoList = [
//   'cover_1.jpg','cover_2.jpg','cover_3.jpg','cover_4.jpg','cover_5.jpg','cover_6.jpg',
//   'cover_7.jpg','cover_8.jpg','cover_9.jpg','cover_10.jpg','cover_11.jpg','cover_12.jpg',
//   'cover_13.jpg','cover_14.jpg','cover_15.jpg','cover_16.jpg','cover_17.jpg','cover_18.jpg',
//   'cover_19.jpg','cover_20.jpg','cover_21.jpg','cover_22.jpg','cover_23.jpg','cover_24.jpg'
// ]


// const randomCoverPhotoSet = () => {
//     const coverPhotos = []
//     for(let i =0; i < 8; i++ ){
//         const coverPhotoListIndex = Math.floor(Math.random() * coverPhotoList.length)
//         if(!(coverPhotos.includes(coverPhotoList[coverPhotoListIndex]))){
//           coverPhotos.push(coverPhotoList[coverPhotoListIndex])
//         } else{
//           i--
//         }
//     }
// }


export default function NewPostModal({open,setOpen}) {


  const [title, setTitle] = useState()
  const [basket,setBasket] = useState()
  const [error, setError] = useState(null)
  const [coverPhoto,setCoverPhoto] = useState('')

  // const handleS = (event: React.ChangeEvent<HTMLInputElement>) => {

  // }
  console.log({title, basket,coverPhoto})
  
  // const coverPhotos = randomCoverPhotoSet();
  // console.log(coverPhotos)
  
  const handleBasketChange = (e) => {
    setBasket(e.target.basket)
  }
  const handleCoverPhotoChange = (e) => {
     setCoverPhoto(e.target.coverPhoto)
  }
        
   

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (e) => {
    console.log(e.target.value)
      setName(e.target.value)
  }

  const handleSubmit = (e) => {
     if(error){

     }
  }
  
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          <form action="" style={formStyle} onSubmit={handleSubmit}>
          <h2>New Post</h2>
              <FormControl required fullWidth label="fullWidth" id="fullWidth">
                <InputLabel htmlFor="component-outlined">Title</InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  value={title}
                  onChange={handleChange}
                  label="Title"
                />
               {error && <FormHelperText>You must add a Title</FormHelperText>}

              </FormControl>

              {/* <FormControlLabel
                  control={
                      <Checkbox checked={false} />
                  }
                  label={
                      <React.Fragment>
                          <img src='/assets/images/covers/cover_1.jpg' className="profile-img" width="60px" height="60px" style={{ marginRight: "5px" }} />
                          My text
                      </React.Fragment>
                  }
               /> */}
            <FormControl>
              <FormLabel id='cover-label'>
                Select a cover
              </FormLabel>
              <RadioGroup
                name='cover'
                value={coverPhoto}
                onChange={handleCoverPhotoChange}
                aria-labelledby='cover-label'
              />
                <FormControlLabel control={<Radio/>} label='1' value='1' />
                <FormControlLabel control={<Radio/>} label='2' value='2' />
                <FormControlLabel control={<Radio/>} label='3' value='3' />
              <RadioGroup/>
            </FormControl>


            <p>Share a basket</p>
            <FormControl sx={{ minWidth: 120, width:"100%" }} size="small">
              <InputLabel id="demo-select-small">Basket</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={basket}
                label="Basket"
                onChange={handleBasketChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <Button type='submit' sx={{float: "right", marginTop: "20px"}} variant="contained" endIcon={<AddIcon />}>
              Post
            </Button>
            
            
 

          </form>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <FormControlLabel
            control={
                <Checkbox checked={false} />
            }
            label={
                <React.Fragment>
                    <img src='/assets/images/covers/cover_1.jpg' className="profile-img" width="40px" height="auto" style={{ marginRight: "5px" }} />
                    My text
                </React.Fragment>
            }
        /> */}
        </Box>
      </Modal>
    </div>
  );
}

