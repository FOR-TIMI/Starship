import { useMutation } from '@apollo/client';
import { VERIFY_USER } from '../../utils/mutations';


export default function StripeSuccess() {
    const [verify, { data, loading, error }] = useMutation(VERIFY_USER);
    verify();
    window.location.assign('/dashboard/app');

  return <h1>successful</h1>;
}
