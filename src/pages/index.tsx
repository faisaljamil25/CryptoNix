import type { NextPage } from 'next';

const Home: NextPage = () => {
  const title: string = 'CryptoNix';
  console.log(title);

  return (
    <div>
      <h1 className='text-3xl font-bold underline'>CryptoNix</h1>
    </div>
  );
};

export default Home;
