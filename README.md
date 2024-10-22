# EVM-Buy-Sell-Token
This repository is designed to create automated buy/sell transactions running on Node.js, enabling automatic token trading systems on EVM-based decentralized exchanges (DEX) using Pancake Router V2. 
It includes features such as: 
+ Volume buy/sell - Anti MEV - Anti slippage 
+ Stop loss and take profit settings 
+ Deployment of trading strategies

## Prerequisites
- Applies to tokens that do not use TAX fee
- Node 18 or greater
- Private Keys. You can easily generate a list of private keys from the createWallet function declared in the source or
using with the Binance Wallet browser extension from [Chrome/Chromium-based browsers](https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/binance-chain/)
- Must have a native token balance and the balance must be greater than the amount of native tokens you want to buy.

## Setup
1)	Install all dependencies `yarn install or npm install`
2)  Configs : contractAddress, lpContract, slippages, targetHolder, targetHolder, secondto, amountFrom, amountTo, priceFrom, priceTo …. These parameters must be configured directly on the file you want to launch.
3)	Edit `configs/index.js` file with your node URL (or leave default), router address.
4)	Edit `privatekey.js` : You can configure and declare your privatekey list here.
5)	Run `yarn volume` start launching the BOT function according to the name of each file

## Configuration File - Note

Below are some notes for the configured parameters.

- **Node**: The node to use. By default it's set to the public node but I **_HIGHLY RECOMMEND using a private node_** such as [QuickNode](https://www.quicknode.com?tap_a=67226-09396e&tap_s=2709976-ea3298&utm_source=affiliate&utm_campaign=generic&utm_content=affiliate_landing_page&utm_medium=generic) in order to make much faster snipes and get an edge on the competition.

- **walletAddress**: your public BSC wallet address
- **walletPrivateKey**: the private key of your wallet address (Note: your private key is only stored securely locally)
- **secondFrom** = 10 (seconds, used to randomly select a delay in seconds from secondFrom to secondTo)
- **secondTo** = 20 (seconds, used to randomly select a delay in seconds from secondFrom to secondTo)
- **amountFrom** = 0.08051171113031 (BNB amount to buy, used to randomly select an amount of BNB from amountFrom to amountTo)
- **amountTo** = 0.22854903195152 (BNB amount to buy, used to randomly select an amount of BNB from amountFrom to amountTo)
- **priceFrom** = 0.001141 (token price, used to determine the price range for running the volume from priceFrom to priceTo)
- **priceTo** = 0.001250 (token price, used to determine the price range for running the volume from priceFrom to priceTo)
- **slippages** = 10 (slippage, allowed slippage range)
- **targetHolder** = 100 (tokens to be retained; when using the sellAll function, this amount is kept to increase the number of holders and minimize the drop in holders)
- **status** = [true, false] (status determining whether selling is allowed; if true: selling is allowed, if false: selling is not allowed)
- **gasAmount**: amount of maximum gas to use per transaction. Recommended to leave at default.
- **gasPrice**: maximum gas price to use per transaction. Recommended to leave at default.

### Things to note

-	The bot only buys tokens whose liquidity is paired with Wrapped BNB (WBNB). You could alter the code to buy tokens paired with another currency if you wanted.
-	Please check that you have enough BNB in your wallet to afford sniping new tokens. If you don’t the bot will not work.

## FAQs

I keep getting ‘Transaction failed’ – what’s going on?
Either:
-	Gas amount / price too low
-	Wallet address / private key incorrect
-	Not enough BNB to pay for the token and TX fee

## Support:

*If you have any questions or need assistance, you can contact me via my Telegram: @Lio201*


