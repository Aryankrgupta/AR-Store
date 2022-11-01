import React from 'react';
import Link from 'next/link';
import { BsBagCheckFill, BsFillBadgeArFill } from 'react-icons/bs';
import { useStateContext } from '../context/StateContext';
import { fireworks } from '../lib/utils';

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
    
    React.useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        fireworks();
    },[]);

  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsFillBadgeArFill size={100} />
            </p>
            <p className='icon'>
            <BsBagCheckFill />
            </p>
            <h2>Thank you for your Order!</h2>
            <p className='email-msg'>Check your email for the order confirmation</p>
            <p className='description'>
                If you have any query, Feel free to contact us
                <a className='email' href='mailto:order@AR_enterprises.com'>order@AR_enterprises.com</a>
            </p>
            <Link href="/">
                <button 
                    type='button'
                    className='btn'
                >
                    Continue Shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success