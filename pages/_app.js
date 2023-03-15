import '../styles/globals.css'
import {Layout} from '../components'
import { StateContext } from '../context/StateContext'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <UserProvider>
    <Layout>
      <Toaster />
        <Component {...pageProps} />
        <Analytics />
    </Layout>
      </UserProvider>
    </StateContext>
    )
}

export default MyApp
