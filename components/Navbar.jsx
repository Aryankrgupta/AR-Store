import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import Cart from './Cart'
import {useStateContext} from '../context/StateContext'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router'
import Fab from '@mui/material/Fab';
import LoginIcon from '@mui/icons-material/Login';
import { Dropdown, Avatar, Text, Grid, User } from "@nextui-org/react";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const { user, error, isLoading } = useUser();  
  console.log(showCart);
  const { push } = useRouter();
  if (isLoading) return <h1>Loading...</h1>;
  const handlelogin = () => push('/api/auth/login');
  const handlelogout = () => push('/api/auth/logout');

  return (
    <div className='navbar-container'>
      {/* <p className='logo'>
        <Link href="/">AR Store</Link>
      </p> */}

      <div className="logo-container">
      <div className="logo-holder logo-9">
        <a href="/">
          <span><i className="fas fa-bell"></i></span>
          <h3>AR Store</h3>
        </a>
      </div>
      </div>

      <div className='login'>

      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
      {!showCart && <AiOutlineShopping />}
        <span className={totalQuantities > 0 && 'cart-item-qty'}>{totalQuantities >= 1 && totalQuantities}</span>
      </button>
      {user ? (
        <>
      <Grid.Container justify="flex-start" margin="20px">
      <Grid>
        <Dropdown placement="bottom-left">
          <Dropdown.Trigger>
            <User
              bordered
              as="button"
              size="lg"
              color="primary"
              name={user.name}
              src={user.picture}
            />
          </Dropdown.Trigger>
          <Dropdown.Menu color="primary" aria-label="User Actions">
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
              {user.email}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="logout" color="error" withDivider>
            <a href="/api/auth/logout">Logout</a>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
    </Grid.Container>
        </>
      ) : (
            <Fab variant="extended" onClick={handlelogin}>
              <LoginIcon sx={{ mr: 1 }} />
                Login
            </Fab>
      )}
      </div>
      
      { showCart && <Cart /> }

    </div>
  )
}

export default Navbar