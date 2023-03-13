import React from 'react'
import { urlFor } from '../lib/client'
import { useStateContext } from '../context/StateContext'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose, AiOutlineDelete } from 'react-icons/ai'
import {BiShoppingBag} from 'react-icons/bi'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import getStripe from '../lib/getStripe'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router'

const Cart = () => {
  const cartRef = React.useRef();
  const { setShowCart, totalQuantities, cartItems, totalPrice, toggleCartItemQuanitity, onRemove } = useStateContext();
  const { user, error, isLoading } = useUser();
  const { push } = useRouter();
  if (isLoading) return <h1>Loading...</h1>;
  const handlelogin = () => push('/api/auth/login');
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id })
    
  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button 
        type='button'
        className='cart-heading'
        onClick={() => setShowCart(false)}>
          <AiOutlineClose />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <BiShoppingBag size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button className='btn' onClick={() => setShowCart(false)}>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
            {cartItems.length >= 1 && cartItems.map((item) => (
              <div className='product' key={item._id}>
                <img src={urlFor(item.image[0])} className="cart-product-image" />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>₹{item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>
                            <AiOutlineMinus />
                        </span>
                        <span className='num'>{ item.quantity }</span>
                        <span className='plus' onClick={() => toggleCartItemQuanitity(item._id, 'inc')}>
                            <AiOutlinePlus />
                        </span>
                    </p>
                    </div>
                    <button
                      type='button'
                      className='remove-item'
                      onClick={() => onRemove(item)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal</h3>
              <h3>{totalPrice}</h3>
            </div>
            
            <div className='btn-container'>
              <button type='button' className='btn' onClick={handleCheckout}>Place your order</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart