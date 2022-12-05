

import{Modal, Box, ToggleButtonGroup, ToggleButton, Button, TextField} from '@mui/material'
import { useEffect, useState} from 'react';
import { GET_BASKETS } from '../../utils/queries';
import { useQuery} from '@apollo/client';
import { useMutation } from '@apollo/client';

import { useParams } from 'react-router-dom';
import { ADD_TICKER, ADD_BASKET } from '../../utils/mutations';
import { indexOf } from 'lodash';
import { symbol } from 'prop-types';

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
  
  function SuccessModal({ handleSuccess, open}) {
  
    
  
    return (

        <Modal
          hideBackdrop
          open={open}
          onClose={handleSuccess}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style,  bgcolor: 'lightgreen', display: 'flex',flexDirection: 'column' , justifyContent: 'center' }}>
            <h2 id="child-modal-title">Successfully added !</h2>
            <Button sx={{p:2, my:2}} variant="contained" onClick={handleSuccess}>Close</Button>
          </Box>
        </Modal>
    );
  }



function ChildModal({refetch}) {
    const [open, setOpen] = useState(false);
    const [value , setValue] = useState("");
    const [addBasket, { error }] = useMutation(ADD_BASKET);
    let { symbol } = useParams();
    const handleOpen = () => {
      setOpen(!open);
    };
    
   async function handleSubmit() {
// query to save basket in backend and show error if error
      
try {
          await addBasket({
          variables: { tickers: symbol, basketName: value}
        });
        handleOpen();
        refetch();
        // handleSuccess();
        } catch (e) {
        // handleOpen();
        console.error(e);
        }
            // setOpen(!open);
            };
            
          
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
            <TextField id="standard-basic" label="Basket Name" variant="standard" onChange={(e)=>{ setValue(e.target.value);}} /><br></br>
            <Button sx={{p:2, my:2}} variant="contained" onClick={handleSubmit}>Submit</Button>
            <Button sx={{p:2, my:2}} variant="contained" onClick={handleOpen}>Close</Button>

          </Box>
        </Modal>
      </>
    );
  }

  function Addb({basket, index, handleOpen, handleSuccess}) {
    let { symbol } = useParams();
  // add ticker mutation
  const [addTicker, { error }] = useMutation(ADD_TICKER);

    const handleChange = async () => {
     
      
      try {
         await addTicker({
          variables: { basketId: basket._id, ticker:symbol },
        });
        handleOpen();
        handleSuccess();
        

      } catch (e) {
        handleOpen();
        console.error(e);
      }
      //query add to basket the ticker 
      
    };

    return   <ToggleButton value="module" aria-label="module" onClick={handleChange}>
       {(basket.basketName === null) ?  (`Basket ${index+1}`):(basket.basketName) }
     </ToggleButton>
    
  }


export default function AddToBasket(props) {
    const { modalOpen, handleOpen } = props;
    const [open, setOpen] = useState(false);
    
    const handleSuccess = () => {
      setOpen(!open);
    };
    
    // adding get query for all baskets
  
    const { data, refetch }  = useQuery(GET_BASKETS);
    let baskets = [];

    if( data){
      baskets = data.baskets
      
    }
     
      const [view, setView] = useState('list');
    
    return (
      <>
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
      
      <ChildModal refetch={refetch} />
     { (baskets) ? 
      (baskets.map((basket,i) => {
        return <Addb key={`${basket.basketId}${i}`} handleSuccess = {handleSuccess} basket={basket} index={i} handleOpen = {handleOpen} />
      } )) : (<div>No baskets found</div>)}
    
    </ToggleButtonGroup>
  </Box>
</Modal>
<SuccessModal handleSuccess = {handleSuccess} open = {open}  />
</>
    )
};