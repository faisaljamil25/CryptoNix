import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '../../styles/globals.css';
import { Footer, Navbar } from '../components';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const title: string = 'CryptoNix';
  console.log(title);
  return (
    <ThemeProvider attribute='class'>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
};

export default MyApp;
