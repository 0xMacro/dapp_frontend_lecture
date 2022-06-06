import { ethers } from "ethers"
import GreeterJSON from '../artifacts/contracts/Greeter.sol/Greeter.json'


const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

// First deploy using deploy.ts, then copy the address here
const greeterAddr = 'TODO'

const contract = new ethers.Contract(greeterAddr, GreeterJSON.abi, provider);

// For playing around with in the browser
window.ethers = ethers
window.provider = provider
window.signer = signer
window.contract = contract

// Kick things off
go()


async function go() {
  await connectToMetamask()

  console.log("Greeter greeting", await contract.greet())

  //valueOutput.innerText = await contract.greet()

  // submit.addEventListener('click', async () => {
  //   console.log("input: ", input.value)
  //   await contract.connect(signer).setGreeting(input.value)

  //   // valueOutput.innerText = await contract.greet()
  // })

  // provider.on("block", n => console.log("New block", n))
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