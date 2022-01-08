import { ethers } from "ethers"
import GreeterJSON from '../artifacts/contracts/Greeter.sol/Greeter.json'


const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

const greeterAddr = '0xed0EFB0A9F03120887090D991Bfac469c7BC434a'
const contract = new ethers.Contract(greeterAddr, GreeterJSON.abi, provider);

// Read on-chain data when clicking a button
// getGreeting.addEventListener('click', async () => {
//   greetingMsg.innerText = await contract.greet()
// })

// For playing around with in the browser
window.ethers = ethers
window.provider = provider
window.signer = signer
window.contract = contract

provider.on("block", n => console.log("New block", n))

// Kick things off
go()

async function go() {
  await connectToMetamask()
  //console.log("Greeter greeting", await contract.greet())
}

async function connectToMetamask() {
  try {
    console.log("Signed in", await signer.getAddress())
  }
  catch(err) {
    console.log("Not signed in")
    await provider.send("eth_requestAccounts", [])
  }
}