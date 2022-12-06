import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_51MBqjLHEdP86gwE0jR1trMfpRanFypBHKE6y2GEf3Gmfn0VxPTAq2zTX3oa9PiNtO191bcOUdnMkVJzznkxhsMpy00icq41lks');
  }
  return stripePromise;
};

export default getStripe;