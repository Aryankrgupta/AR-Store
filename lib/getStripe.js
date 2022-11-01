import {loadStripe} from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
    if(!stripePromise) {
        stripePromise = loadStripe('pk_test_51LysOWSBlFswJyj8TRFNLbJivh0FBi7JXBzxaZueaVV4Jp2Mf1Hbxf1uDPK4uNZJrZ5ia4Ftz5qU22yCVBr0C2ku00rC39wVvl');
    }

    return stripePromise;
}

export default getStripe;