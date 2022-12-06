import getStripe from '../../utils/stripe/index';
import { Button } from '@mui/material';




async function handleCheckout() {
    const stripe = await getStripe();
    try{
    await stripe.redirectToCheckout({
      lineItems: [
        {
          //custom price key for our premium plan
          price: 'price_1MBqpSHEdP86gwE03axcUHnd',
          quantity: 1,
        },
      ],
      mode: 'payment',
      //will need to implement payment routes if necessary, good enough for demo 
      successUrl: `http://localhost:3000/dashboard/app`,
      cancelUrl: `http://localhost:3000/dashboard/app`,
      customerEmail: 'customer@email.com',
    });
    //if successful make a call to server to verfiy user (user update)
}
catch(error){
    console.error(error); 
    //if error no blue check mark sad Elon noises (FUTURE DEVELOPMENTS)
}
  }
  export default function StripeButton () {
    return(
        
        <Button variant="contained" sx={{mr: 2.5}}onClick= {handleCheckout}> Donate </Button>
    
    )
  }
