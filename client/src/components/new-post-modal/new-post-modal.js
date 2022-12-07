import React,{ useState } from 'react'

//Form Elements
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

// Modal
import Modal from '@mui/material/Modal';

//Apollo client
import { useMutation, useQuery } from '@apollo/client';

//Icons
import AddIcon from '@mui/icons-material/Add';

//graphQl queries
import { QUERY_ME, QUERY_POSTS, GET_BASKETS } from '../../utils/queries'

//graphQl Mutations
import { ADD_POST} from '../../utils/mutations'

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



export default function NewPostModal({open,setOpen}) {


  const [title, setTitle] = useState('')
  const [basketId,setBasketId] = useState('');
  const [basketName, setBasketName] = useState('');
  const [basketValue, setBasketValue] = useState('');

  const {loading,data } = useQuery(QUERY_ME)
  const {loading: basketLoading ,data: basketData } = useQuery(GET_BASKETS);
 
  const baskets = basketData?.baskets || []
  
  
  
  const handleBasketIdChange = (e) => {
    setBasketId(e.target.value._id)
    setBasketValue(e.target.value)
    setBasketName(e.target.value.basketName)
    
  }

 

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (e) => {
    setTitle(e.target.value)
  }


  // To add new posts to cache
  const [addPost, { error }] = useMutation(ADD_POST, {
      update(cache, { data: { addPost }}){
        // To handle errors
        try{
          // signed in user's cache
          const { signedInUser } = cache.readQuery({ query : QUERY_ME });
           //To add to cache
            cache.writeQuery({
              query: QUERY_ME,
              data: { signedInUser:{...signedInUser, posts: [...signedInUser.posts, addPost]}},
            });
        }catch (e) {
          console.warn("This is the signed in user's first post")
        }

         // update posts array's cache
         const { posts } = cache.readQuery({ query: QUERY_POSTS });
         cache.writeQuery({
           query: QUERY_POSTS,
           data: { posts: [addPost, ...posts] },
         });
      }
  });

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      await addPost({
        variables: { title, basketId, author: data.signedInUser, basketName}
      });

      //To clear the form
      setTitle('');
      setBasketId('');

      //To close modal
      setOpen(false);
    } catch(e){
      console.error(e);
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
          <p>Title</p>
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


        
            <FormControl sx={{ minWidth: 120, width:"100%", height:"50px", marginTop:"20px" }} size="small">
              <InputLabel   id="demo-select-small">{baskets.length ? 'Basket' : 'You have no baskets' }</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={basketValue}
                label="Basket"
                onChange={handleBasketIdChange}
                sx={{ height: "100%"}}
                disabled={!baskets.length ? true : false}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                  { 
                  baskets.length && baskets.map( b => (
                     <MenuItem key={b._id} value={b}>{b.basketName}</MenuItem>
                  )) 

                  }
              </Select>
            </FormControl>

            <Button type='submit' sx={{float: "right", marginTop: "20px"}} variant="contained" endIcon={<AddIcon />}>
              Post
            </Button>
            
            
 

          </form>

        </Box>
      </Modal>
    </div>
  );
}

