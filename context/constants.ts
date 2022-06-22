import marketAbi from './NFTMarketplace.json';

export const MarketAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
export const MarketAddressABI = marketAbi.abi;

export const nftContextDefaultValues = {
  nftCurrency: 'ETH',
  connectWallet: async () => {},
  currentAccount: '',
  createSale: async (url: string, formInputPrice: string) => {},
  fetchNFTs: async () => [
    {
      price: '',
      tokenId: 0,
      id: 0,
      seller: '',
      owner: '',
      image: '',
      name: '',
      description: '',
      tokenURI: '',
    },
  ],
};
