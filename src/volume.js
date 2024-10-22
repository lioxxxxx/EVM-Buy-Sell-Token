const Web3 = require("web3");
const {autoMarketMakerBSC} = require("@marketmaker/sdk");
const listPrivate = require("./../privateKeys");
const { logger, formatAddress,sleep,randomIntFromInterval } = require("./utils/index.js");
const { LIST_RPC_NODES } = require("./configs/index.js");

// configs
const tokenAddress = "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"; // contract token CAKE
const secondFrom = 5 //   5 second
const secondto = 10 //   10 second
const amountFrom = 0.051171113031 // amount BNB want to buy From
const amountTo = 0.081854903195152 // amount BNB want to buy to



async function botVolume() {
  logger.info(`Runing BOT volume`)
  logger.info('----------------------------------------')
  logger.info('Bot is running! Press CTRL + C to stop it.')
  logger.info('----------------------------------------')

  while (true) {
    const randomPK = Math.floor(Math.random() * listPrivate.length);
    const privateKey = listPrivate[randomPK];
    const randomRPCs = Math.floor(Math.random() * LIST_RPC_NODES.length);
    const rpc = LIST_RPC_NODES[randomRPCs];
    const web3 = new Web3(rpc);
    const amountBuy = randomIntFromInterval(amountFrom, amountTo);
    const second = randomIntFromInterval(secondFrom, secondto);
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const walletAddress = account.address;
    const balance = await web3.eth.getBalance(walletAddress);
    const balanceBNB = web3.utils.fromWei(balance, "ether");

    try {
      if (balanceBNB > amountBuy) {
        logger.info(`Wallet AMM: ${formatAddress(walletAddress, 6, 5)} | Buy amount: ${amountBuy} BNB`)
        await autoMarketMakerBSC(privateKey, amountBuy, tokenAddress);
        await sleep(second);
      } else {
        logger.warn(`Wallet ${formatAddress(walletAddress, 4, 5)} Insufficient balance | Buy amount: ${amountBuy} BNB | Current balance: ${balanceBNB}`)
      }
    } catch (error) {
      logger.info('--------------------ERROR-------------------')
      logger.error(`AMM ERROR: ${error}`)
      logger.info('----------------------------------------')
      // return true;
    }
  }
}
botVolume();
