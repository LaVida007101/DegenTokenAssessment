require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");


module.exports = {
    solidity: "0.8.27",
    networks: {
        fuji: {
            url: process.env.AVALANCHE_FUJI_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
        },
    },
    etherscan: {
      apiKey: process.env.PRIVATE_KEY,
  },
};
