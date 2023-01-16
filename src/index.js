import { ethers } from "ethers";
import GreeterJSON from "../artifacts/contracts/Greeter.sol/Greeter.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// First deploy using deploy.ts, then copy the address here
const greeterAddr = "0xe74fb8A556798ed074581bf24AFa51aCfa446c5E";

const contract = new ethers.Contract(greeterAddr, GreeterJSON.abi, provider);

// For playing around with in the browser
window.ethers = ethers;
window.provider = provider;
window.signer = signer;
window.contract = contract;

// Kick things off
go();

async function go() {
  await connectToMetamask();

  console.log("Greeter greeting", await contract.greet());

  valueOutput.innerText = await contract.greet();

  submit.addEventListener("click", async () => {
    console.log("input: ", input.value);
    try {
      const txReceipt = await contract.connect(signer).setGreeting(input.value);
      await txReceipt.wait();
      valueOutput.innerText = await contract.greet();
    } catch (e) {
      // TODO: properly display this error to the user.
      // For now, we simply log it

      console.log(e)

      const errorDescription = contract.interface.parseError(
        e.error.data.originalError.data
      );
      console.log(errorDescription);
    }
  });

  // provider.on("block", n => console.log("New block", n))
}

async function connectToMetamask() {
  try {
    console.log("Signed in", await signer.getAddress());
  } catch (err) {
    console.log("Not signed in");
    await provider.send("eth_requestAccounts", []);
  }
}
