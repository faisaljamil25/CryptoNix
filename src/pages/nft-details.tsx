import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { shortenAddress } from '../utils/shortenAddress';
import { Button, Loader, Modal } from '../components';
import images from '../../assets';
import { initialNFTvalues } from '../../context/constants';
import { nftType } from '../../context/types';
import { NFTContext } from '../../context/NFTContext';

interface PaymentProps {
  nft: nftType;
  nftCurrency: string;
}

const PaymentBodyCmp: React.FC<PaymentProps> = ({ nft, nftCurrency }) => (
  <div className='flex flex-col'>
    <div className='flexBetween'>
      <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl'>
        Item
      </p>
      <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl'>
        Subtotal
      </p>
    </div>

    <div className='flexBetweenStart my-5'>
      <div className='flex-1 flexStartCenter'>
        <div className='relative w-28 h-28'>
          <Image
            src={nft.image || images[`nft${nft.id}` as keyof typeof images]}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='flexCenterStart flex-col ml-5'>
          <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl'>
            {shortenAddress(nft.seller)}
          </p>
          <p className='font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal'>
            {nft.name}
          </p>
        </div>
      </div>

      <div>
        <p className='font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal'>
          {nft.price} <span className='font-semibold'>{nftCurrency}</span>
        </p>
      </div>
    </div>

    <div className='flexBetween mt-10'>
      <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl'>
        Total
      </p>
      <p className='font-poppins dark:text-white text-nft-black-1 text-base minlg:text-xl font-normal'>
        {nft.price} <span className='font-semibold'>{nftCurrency}</span>
      </p>
    </div>
  </div>
);

const AssetDetails = () => {
  const { nftCurrency, currentAccount, buyNft, isLoadingNFT } =
    useContext(NFTContext);
  const [nft, setNft] = useState<nftType>(initialNFTvalues[0]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    // @ts-ignore
    setNft(router.query);

    setIsLoading(false);
  }, [router.isReady]);

  const checkout = async () => {
    await buyNft(nft);

    setPaymentModal(false);
    setSuccessModal(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className='relative flex justify-center md:flex-col min-h-screen'>
      <div className='relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1'>
        <div className='relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557 '>
          <Image
            src={nft.image || images[`nft${nft.id}` as keyof typeof images]}
            objectFit='cover'
            className=' rounded-xl shadow-lg'
            layout='fill'
          />
        </div>
      </div>

      <div className='flex-1 justify-start sm:px-4 p-12 sm:pb-4'>
        <div className='flex flex-row sm:flex-col'>
          <h2 className='font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl'>
            {nft.name}
          </h2>
        </div>

        <div className='mt-10'>
          <p className='font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal'>
            Creator
          </p>
          <div className='flex flex-row items-center mt-3'>
            <div className='relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2'>
              <Image
                src={images.creator1}
                objectFit='cover'
                className='rounded-full'
              />
            </div>
            <p className='font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-lg font-semibold'>
              {shortenAddress(nft.seller)}
            </p>
          </div>
        </div>

        <div className='mt-10 flex flex-col'>
          <div className='w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row'>
            <p className='font-poppins dark:text-white text-nft-black-1 font-medium text-base mb-2'>
              Details
            </p>
          </div>
          <div className='mt-3'>
            <p className='font-poppins dark:text-white text-nft-black-1 font-normal text-base'>
              {nft.description}
            </p>
          </div>
        </div>
        <div className='flex flex-row sm:flex-col mt-10'>
          {currentAccount === nft.seller.toLowerCase() ? (
            <p className='font-poppins dark:text-white text-nft-black-1 font-normal text-base border border-gray p-2'>
              You cannot buy your own NFT
            </p>
          ) : currentAccount === nft.owner.toLowerCase() ? (
            <Button
              btnName='List on Marketplace'
              btnType='primary'
              classStyles='mr-5 sm:mr-0 sm:mb-5 rounded-xl'
              handleClick={() =>
                router.push(
                  `/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`
                )
              }
            />
          ) : (
            <Button
              btnName={`Buy for ${nft.price} ${nftCurrency}`}
              btnType='primary'
              classStyles='mr-5 sm:mr-0 sm:mb-5 rounded-xl'
              handleClick={() => setPaymentModal(true)}
            />
          )}
        </div>
      </div>

      {paymentModal && (
        <Modal
          header='Check Out'
          body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
          footer={
            <div className='flex flex-row sm:flex-col'>
              <Button
                btnName='Checkout'
                btnType='primary'
                classStyles='mr-5 sm:mr-0 sm:mb-5 rounded-xl'
                handleClick={checkout}
              />
              <Button
                btnName='Cancel'
                btnType='outline'
                classStyles='rounded-lg'
                handleClick={() => setPaymentModal(false)}
              />
            </div>
          }
          handleClose={() => setPaymentModal(false)}
        />
      )}

      {successModal && (
        <Modal
          header='Payment Successful'
          body={
            <div
              className='flexCenter flex-col text-center'
              onClick={() => setSuccessModal(false)}
            >
              <div className='relative w-52 h-52'>
                <Image
                  src={
                    nft.image || images[`nft${nft.id}` as keyof typeof images]
                  }
                  objectFit='cover'
                  layout='fill'
                />
              </div>
              <p className='font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal mt-10'>
                {' '}
                You successfully purchased{' '}
                <span className='font-semibold'>{nft.name}</span> from{' '}
                <span className='font-semibold'>
                  {shortenAddress(nft.seller)}
                </span>
                .
              </p>
            </div>
          }
          footer={
            <div className='flexCenter flex-col'>
              <Button
                btnName='Check it out'
                btnType='primary'
                classStyles='sm:mr-0 sm:mb-5 rounded-xl'
                handleClick={() => router.push('/my-nfts')}
              />
            </div>
          }
          handleClose={() => setSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default AssetDetails;
