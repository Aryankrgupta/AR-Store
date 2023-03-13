import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import Cart from './Cart'
import {useStateContext} from '../context/StateContext'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router'
import Fab from '@mui/material/Fab';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const { user, error, isLoading } = useUser();  
  console.log(error);
  const { push } = useRouter();
  if (isLoading) return <h1>Loading...</h1>;
  const handlelogin = () => push('/api/auth/login');
  const handlelogout = () => push('/api/auth/logout');

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">AR Store</Link>
      </p>
      <div>

      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className={totalQuantities > 0 && 'cart-item-qty'}>{totalQuantities >= 1 && totalQuantities}</span>
      </button>
      {user ? (
        <>
        <h1>{user.name}</h1>
        <img src={user.picture} alt="" />
        <a href="/api/auth/logout">Logout</a>
        </>
      ) : (
            // <button onClick={handlelogin}>Login</button>
            // <AwesomeButton type="primary" onClick={handlelogin}>Login</AwesomeButton>
            <Fab variant="extended" onClick={handlelogin}>
              <LoginIcon sx={{ mr: 1 }} />
                Login
            </Fab>
      )}
      </div>
      
      

    </div>
  )
}

export default Navbar