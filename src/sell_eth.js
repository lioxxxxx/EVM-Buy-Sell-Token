const Web3 = require("web3");
const {sellTokenETH, getBalanceTokenETH} = require("@marketmaker/sdk");
const listPrivate = require("./../privateKeys");
const { logger, formatAddress, sleep, randomIntFromInterval } = require("./utils/index.js");
const { LIST_RPC_NODES_ETH } = require("./configs/index.js");

// configs
const tokenAddress = ""; // contract token
const amountFrom = 100;  //  amount want to sell from
const amountTo = 110  // amount want to sell to
const secondFrom = 5 //   5 second
const secondto = 10 //   10 second

async function botSell() {
  logger.info(`Runing BOT SELL`)
  logger.info('----------------------------------------')
  logger.info('Bot is running! Press CTRL + C to stop it.')
  logger.info('----------------------------------------')
  while (true) {
    const randomPK = Math.floor(Math.random() * listPrivate.length);
    const privateKey = listPrivate[randomPK];

    const randomRPCs = Math.floor(Math.random() * LIST_RPC_NODES_ETH.length);
    const rpc = LIST_RPC_NODES_ETH[randomRPCs];
    const web3 = new Web3(rpc);

    const amountSell = randomIntFromInterval(amountFrom, amountTo);
    const second = randomIntFromInterval(secondFrom, secondto);

    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const walletAddress = account.address;
    const balanceToken = await getBalanceTokenETH(tokenAddress,privateKey );
    const balance = await web3.eth.getBalance(walletAddress);
    const balanceBNB = web3.utils.fromWei(balance, "ether");

    try {
      if (balanceBNB > 0.002 && Number(balanceToken) > amountSell) {
        logger.info(`Wallet SELL: ${formatAddress(walletAddress, 6, 5)} | Sell amount: ${amountSell} Token`)
        await sellTokenETH(privateKey, amountSell, tokenAddress);
        await sleep(second);
      } else {
        logger.warn(`Wallet ${formatAddress(walletAddress, 4, 5)} Insufficient balance | Sell amount: ${amountSell} | Current balance: ${balanceToken} Token`)
      }
    } catch (error) {
      logger.info('--------------------ERROR-------------------')
      logger.error(`SELL ERROR: ${error}`)
      logger.info('----------------------------------------')
    //   return true;
    }
  }
}

botSell();
