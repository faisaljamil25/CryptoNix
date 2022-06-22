import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Script from 'next/script';

import { Footer, Navbar } from '../components';
import '../../styles/globals.css';
import { NFTProvider } from '../../context/NFTContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NFTProvider>
      <ThemeProvider attribute='class'>
        <div className='dark:bg-nft-dark bg-white min-h-screen'>
          <Navbar />
          <div className='pt-65'>
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>

        <Script
          src='https://kit.fontawesome.com/d45b25ceeb.js'
          crossOrigin='anonymous'
        />
      </ThemeProvider>
    </NFTProvider>
  );
};

export default MyApp;
