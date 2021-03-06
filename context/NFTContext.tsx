import React, { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { BigNumber, ethers } from 'ethers';
import axios from 'axios';

import {
  MarketAddress,
  MarketAddressABI,
  nftContextDefaultValues,
} from './constants';
import { nftType } from './types';

const fetchContract = (
  signerOrProvider:
    | ethers.providers.JsonRpcSigner
    | ethers.providers.JsonRpcProvider
) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const NFTContext = React.createContext(nftContextDefaultValues);

export const NFTProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const nftCurrency = 'MATIC';
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [isLoadingNFT, setIsLoadingNFT] = useState<boolean>(false);

  const checkIfWalletIsConnect = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found');
    }

    // console.log(accounts);
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  const createSale = async (
    url: string,
    formInputPrice: string,
    isReselling?: boolean,
    id?: string
  ) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice, 'ether');
    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();

    const transaction = !isReselling
      ? await contract.createToken(url, price, {
          value: listingPrice.toString(),
        })
      : await contract.resellToken(id, price, {
          value: listingPrice.toString(),
        });

    setIsLoadingNFT(true);
    await transaction.wait();
  };

  const fetchNFTs = async () => {
    setIsLoadingNFT(false);
    const provider = new ethers.providers.JsonRpcProvider(
      'https://rpc-mumbai.maticvigil.com'
    );
    const contract = fetchContract(provider);

    const data = await contract.fetchMarketItems();

    // console.log(data);

    const items: nftType[] = await Promise.all(
      data.map(
        async ({
          tokenId,
          seller,
          owner,
          price: unformattedPrice,
        }: {
          tokenId: BigNumber;
          seller: string;
          owner: string;
          price: BigNumber;
        }) => {
          const tokenURI = await contract.tokenURI(tokenId);
          const {
            data: { image, name, description },
          } = await axios.get(tokenURI);
          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            'ether'
          );

          return {
            price,
            tokenId: tokenId.toNumber(),
            id: tokenId.toNumber(),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
          };
        }
      )
    );

    return items;
  };

  const fetchMyNFTsOrCreatedNFTs = async (type: string) => {
    setIsLoadingNFT(false);

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);
    const data =
      type === 'fetchItemsListed'
        ? await contract.fetchItemsListed()
        : await contract.fetchMyNFTs();

    const items: nftType[] = await Promise.all(
      data.map(
        async ({
          tokenId,
          seller,
          owner,
          price: unformattedPrice,
        }: {
          tokenId: BigNumber;
          seller: string;
          owner: string;
          price: BigNumber;
        }) => {
          const tokenURI = await contract.tokenURI(tokenId);
          const {
            data: { image, name, description },
          } = await axios.get(tokenURI);
          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            'ether'
          );

          return {
            price,
            tokenId: tokenId.toNumber(),
            id: tokenId.toNumber(),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
          };
        }
      )
    );

    return items;
  };

  const buyNft = async (nft: nftType) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      MarketAddress,
      MarketAddressABI,
      signer
    );

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });
    setIsLoadingNFT(true);
    await transaction.wait();
    setIsLoadingNFT(false);
  };

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
        createSale,
        fetchNFTs,
        fetchMyNFTsOrCreatedNFTs,
        isLoadingNFT,
        buyNft,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
