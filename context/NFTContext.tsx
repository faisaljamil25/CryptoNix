import React, { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { MarketAddress, MarketAddressABI } from './constants';

const fetchContract = (signerOrProvider: ethers.providers.JsonRpcSigner) =>
  new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

const defaultValues = {
  nftCurrency: 'ETH',
  connectWallet: () => {},
  currentAccount: '',
  createSale: (url: string, formInputPrice: string) => {},
};

export const NFTContext = React.createContext(defaultValues);

export const NFTProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const nftCurrency = 'ETH';
  const [currentAccount, setCurrentAccount] = useState<string>('');

  const checkIfWalletIsConnect = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found');
    }

    console.log(accounts);
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

  const createSale = async (url: string, formInputPrice: string) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice, 'ether');
    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();

    const transaction = await contract.createToken(url, price, {
      value: listingPrice.toString(),
    });

    await transaction.wait();
  };

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
        createSale,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
