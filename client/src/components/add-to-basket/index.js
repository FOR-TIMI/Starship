

import{Modal, Box, ToggleButtonGroup, ToggleButton, Button, TextField} from '@mui/material'
import { useEffect, useState} from 'react';
import { GET_BASKETS } from '../../utils/queries';
import { useQuery} from '@apollo/client';
import { useMutation } from '@apollo/client';

import { useParams } from 'react-router-dom';
import { ADD_TICKER } from '../../utils/mutations';
import { indexOf } from 'lodash';

const style = {
    
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  

function ChildModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(!open);
    };
    function handleSubmit() {
// query to save basket in backend and show error if error
     setOpen(!open);
    }
    
  
    return (
      <>
        <Button sx={{p:2, mb:2}} variant="contained" onClick={handleOpen}>Create New Basket</Button>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleOpen}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style }}>
            <h2 id="child-modal-title">Give a name to the basket</h2>
            <TextField id="standard-basic" label="Basket Name" variant="standard" /><br></br>
            <Button sx={{p:2, my:2}} variant="contained" onClick={handleSubmit}>Submit</Button>
            <Button sx={{p:2, my:2}} variant="contained" onClick={handleOpen}>Close</Button>

          </Box>
        </Modal>
      </>
    );
  }

  function Addb({basket, index}) {
    let { symbol } = useParams();
  // add ticker mutation
  const [addTicker, { error }] = useMutation(ADD_TICKER);

    const handleChange = () => {
     
      console.log(basket._id,symbol);
      // query add to basket the ticker 
      // 
      
    };

    return   <ToggleButton value="module" aria-label="module" onClick={handleChange}>
       {(basket.basketName === null) ?  (`Basket ${index+1}`):(basket.basketName) }
     </ToggleButton>
    
  }


export default function AddToBasket(props) {
    const [isToggled, setIsToggled] = useState(false);
    const { modalOpen, handleOpen } = props;
    
    // adding get query for all baskets
  
    const { data }  = useQuery(GET_BASKETS);
  let baskets = [];

    if( data){
      baskets = data.baskets
      console.log("data : " , data)
    }
     

      const [view, setView] = useState('list');
    

    return (
        <Modal
  open={modalOpen}
  onClose={handleOpen}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{...style, display: 'flex',
    justifyContent: 'center'}}>
  <ToggleButtonGroup
      orientation="vertical"
      value={view}
      exclusive
      
    >
      
      <ChildModal />
      
      {baskets.map((basket,i) => {
        console.log(basket._id)
        return <Addb basket={basket} index={i}/>
      } )}
    
    </ToggleButtonGroup>
  </Box>
</Modal>
    )
};