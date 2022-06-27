import type { NextPage } from 'next';
import { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Banner, CreatorCard, Loader, NFTCard, SearchBar } from '../components';
import images from '../../assets';
import { NFTContext } from '../../context/NFTContext';
import { nftType } from '../../context/types';
import { getCreators } from '../utils/getTopCreators';
import { shortenAddress } from '../utils/shortenAddress';

const Home: NextPage = () => {
  const { fetchNFTs } = useContext(NFTContext);

  const [hideButtons, setHideButtons] = useState<boolean>(false);
  const [nfts, setNfts] = useState<nftType[]>([]);
  const [nftsCopy, setNftsCopy] = useState<nftType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSelect, setActiveSelect] = useState<string>('Recently Added');

  const scrollRef = useRef<HTMLElement>(null);
  const parentRef = useRef<HTMLElement>(null);

  const { theme } = useTheme();

  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items.reverse());
      setNftsCopy(items);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case 'Price (low to high)':
        setNfts(sortedNfts.sort((a, b) => +a.price - +b.price));
        break;
      case 'Price (high to low)':
        setNfts(sortedNfts.sort((a, b) => +b.price - +a.price));
        break;
      case 'Recently added':
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);

  const onHandleSearch = (value: string) => {
    const filteredNfts = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNfts.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNfts);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

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

  const creators = getCreators(nfts);

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
        {!isLoading && !nfts.length ? (
          <h1 className='font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0'>
            That&apos;s weird... No NFTs for sale!
          </h1>
        ) : isLoading ? (
          <Loader />
        ) : (
          <>
            <div>
              <h1 className='font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0'>
                Best Creators
              </h1>
              <div
                className='relative flex-1 max-w-full flex mt-3'
                // @ts-ignore: ref type
                ref={parentRef}
              >
                <div
                  className='flex flex-row w-max overflow-x-scroll no-scrollbar select-none'
                  // @ts-ignore: ref type
                  ref={scrollRef}
                >
                  {creators.map((creator, i) => (
                    <CreatorCard
                      key={creator.seller}
                      rank={i + 1}
                      creatorImage={
                        images[`creator${i + 1}` as keyof typeof images]
                      }
                      creatorName={shortenAddress(creator.seller)}
                      creatorEths={creator.sumall}
                    />
                  ))}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <CreatorCard
                      key={`creator-${i}`}
                      rank={creators.length + i}
                      creatorImage={
                        images[`creator${i}` as keyof typeof images]
                      }
                      creatorName={`John Doe`}
                      creatorEths={10 - i * 0.534}
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
            <div className='mt-10'>
              <div className='flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start'>
                <h1 className='flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4'>
                  Hot Bids
                </h1>
                <div className='flex-2 sm:w-full flex flex-row sm:flex-col'>
                  <SearchBar
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    handleSearch={onHandleSearch}
                    clearSearch={onClearSearch}
                  />
                </div>
              </div>
              <div className='mt-3 w-full flex flex-wrap justify-start md:justify-center'>
                {nfts.map((nft) => (
                  <NFTCard key={nft.tokenId} nft={nft} />
                ))}
                {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <NFTCard
                    key={`nft-${i}`}
                    nft={{
                      i,
                      name: `Nifty NFT ${i}`,
                      price: (10 - i * 0.534).toFixed(2),
                      seller: `0xsfwsgwrtvtg}`,
                      owner: `0xsfwsgwrtvtg}`,
                      description: 'Cool NFT on Sale',
                    }}
                  />
                ))} */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
