import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <title>CryptoNix</title>
          <meta charSet='UTF-8' />
          <meta name='keywords' content='crypto nft etherium nft-marketplace' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <link rel='icon' type='image/svg+xml' href='/logo.png' />
          <link rel='alternate icon' href='/logo.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
