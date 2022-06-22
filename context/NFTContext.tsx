import React, { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';

const defaultValues = {
  nftCurrency: 'ETH',
  connectWallet: () => {},
  currentAccount: '',
};

export const NFTContext = React.createContext(defaultValues);

export const NFTProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const nftCurrency = 'ETH';
  const [currentAccount, setCurrentAccount] = useState('');

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

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
