async function getPrices(){

const url="https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd";

try{

const response=await fetch(url);
const data=await response.json();

document.getElementById("bitcoin").innerText="$"+data.bitcoin.usd;
document.getElementById("ethereum").innerText="$"+data.ethereum.usd;
document.getElementById("solana").innerText="$"+data.solana.usd;

}

catch(error){

console.log("Error fetching data:",error);

}

}

getPrices();