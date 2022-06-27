import marketAbi from './NFTMarketplace.json';
import { nftType } from './types';

export const LocalMarketAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // localhost
export const MarketAddress =
  process.env.NEXT_PUBLIC_MARKET_ADDRESS || LocalMarketAddress; // deployed test network
export const MarketAddressABI = marketAbi.abi;

export const initialNFTvalues = [
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
];

export const nftContextDefaultValues = {
  nftCurrency: 'ETH',
  connectWallet: async () => {},
  currentAccount: '',
  createSale: async (
    url: string,
    formInputPrice: string,
    isReselling?: boolean,
    id?: string
  ) => {},
  fetchNFTs: async () => initialNFTvalues,
  fetchMyNFTsOrCreatedNFTs: async (type: string) => initialNFTvalues,
  isLoadingNFT: false,
  buyNft: async (nft: nftType) => {},
};
