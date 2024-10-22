// import web3 from "web3";
const web3 = require("web3");

 const convertToWei = (value, decimal) => {
  if (Number(decimal) === 18) return web3.utils.toWei(value.toString(), "ether");
  else if (Number(decimal) === 6)
    return web3.utils.toWei(value.toString(), "picoether");
  else if (Number(decimal) === 9)
    return web3.utils.toWei(value.toString(), "nanoether");
  else if (Number(decimal) === 12)
    return web3.utils.toWei(value.toString(), "microether");
  else if (Number(decimal) === 15)
    return web3.utils.toWei(value.toString(), "milliether");
  else return value.toWei() / 10 ** Number(decimal);
};

 const convertFromWei = (value, decimal) => {
  if (Number(decimal) === 18) return web3.utils.fromWei(value.toString(), "ether");
  else if (Number(decimal) === 6)
    return web3.utils.fromWei(value.toString(), "picoether");
  else if (Number(decimal) === 9)
    return web3.utils.fromWei(value.toString(), "nanoether");
  else if (Number(decimal) === 12)
    return web3.utils.fromWei(value.toString(), "microether");
  else if (Number(decimal) === 15)
    return web3.utils.fromWei(value.toString(), "milliether");
  else return value.toString() / 10 ** Number(decimal);
};
module.exports = {
  convertToWei,
  convertFromWei,
};