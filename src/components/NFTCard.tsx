import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { NFTContext } from '../../context/NFTContext';

interface NFTCardProps {
  name: string;
  price: number;
  img: StaticImageData;
}

const NFTCard: React.FC<NFTCardProps> = ({ name, price, img }) => {
  const { nftCurrency } = useContext(NFTContext);

  return (
    <Link href={{ pathname: '/nft-details', query: `nft-${name}` }}>
      <div className='flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md'>
        <div className='relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden'>
          <Image src={img} layout='fill' objectFit='cover' alt='nft01' />
        </div>
        <div className='mt-3 flex flex-col'>
          <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl'>
            {name}
          </p>
          <div className='flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3'>
            <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg'>
              {price}
              <span className='font-normal'> {nftCurrency}</span>
            </p>
          </div>
          <div className='mt-1 minlg:mt-3 flexBetween flex-row' />
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
