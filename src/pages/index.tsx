import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Banner, CreatorCard, NFTCard } from '../components';
import images from '../../assets';

const Home: NextPage = () => {
  const { theme } = useTheme();
  const [hideButtons, setHideButtons] = useState<boolean>(false);
  const scrollRef = useRef<HTMLElement>(null);
  const parentRef = useRef<HTMLElement>(null);

  const handleScroll = (direction: string) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (!current) return;
    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  // check if scrollRef container is overfilling its parentRef container
  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (!current || !parent) return;

    if (current?.scrollWidth >= parent?.offsetWidth)
      return setHideButtons(false);
    return setHideButtons(true);
  };

  // if window is resized
  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  }, []);

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
        <div>
          <h1 className='font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0'>
            Best Creators
          </h1>
          {/*@ts-ignore: ref type*/}
          <div className='relative flex-1 max-w-full flex mt-3' ref={parentRef}>
            <div
              className='flex flex-row w-max overflow-x-scroll no-scrollbar select-none'
              // @ts-ignore: ref type
              ref={scrollRef}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={images[`creator${i}` as keyof typeof images]}
                  creatorName={`John Doe`}
                  creatorEths={10 - i * 0.5}
                />
              ))}
              {!hideButtons && (
                <>
                  <div
                    onClick={() => handleScroll('left')}
                    className='absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0'
                  >
                    <Image
                      src={images.left}
                      layout='fill'
                      objectFit='contain'
                      alt='left_arrow'
                      className={theme === 'light' ? 'filter invert' : ''}
                    />
                  </div>
                  <div
                    onClick={() => handleScroll('right')}
                    className='absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0'
                  >
                    <Image
                      src={images.right}
                      layout='fill'
                      objectFit='contain'
                      alt='left_arrow'
                      className={theme === 'light' ? 'filter invert' : ''}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
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
