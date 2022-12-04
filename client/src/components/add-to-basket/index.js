
import{Modal, Box, ToggleButtonGroup, ToggleButton, Button, TextField} from '@mui/material'
import { useEffect, useState } from 'react';


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



export default function AddToBasket(props) {
    const [isToggled, setIsToggled] = useState(false);
    const { modalOpen, handleOpen } = props;

   
    
      const [view, setView] = useState('list');
    
      const handleChange = (event, nextView) => {
        setView(nextView);
      };
    
     

    //add code to setIsToggled  to True if 'user._id' is in [following]

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
      onChange={handleChange}
    >
      
      <ChildModal />
      
      <ToggleButton value="module" aria-label="module">
        basket 1
      </ToggleButton>
      <ToggleButton value="quilt" aria-label="quilt">
        basket 2
      </ToggleButton>
    </ToggleButtonGroup>
  </Box>
</Modal>
    )
};
