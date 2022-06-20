import type { NextPage } from 'next';

import { Banner, CreatorCard, NFTCard } from '../components';
import images from '../../assets';

const Home: NextPage = () => {
  return (
    <div className='flex justify-center sm:px-4 p-12'>
      <div className='w-full minmd:w-4/5'>
        <Banner
          name={
            <>
              Discover, collect, and sell <br /> extraordinary NFTs
            </>
          }
          childStyles='md:text-4xl sm:text-2xl xs:text-xl text-left'
          parentStyle='justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl'
        />

        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CreatorCard
            key={`creator-${i}`}
            rank={i}
            creatorImage={images[`creator${i}` as keyof typeof images]}
            creatorName={`John Doe`}
            creatorEths={10}
          />
        ))}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <NFTCard
            key={i}
            name='John Doe'
            price={1000}
            img={images[`nft${i}` as keyof typeof images]}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
