import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config()

console.log('test', process.env.SEED_PHRASE)
const config: HardhatUserConfig = {
  solidity: "0.8.28",
  // networks: {
  //   hardhat: {
  //     accounts: {
  //       mnemonic: process.env.SEED_PHRASE,
  //     },
  //     chainId: 31337,
  //   },
  // },
};

export default config;
