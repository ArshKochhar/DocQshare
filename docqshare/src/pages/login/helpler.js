import { ethers } from "ethers";

export default function helper(window_ethereum) {
    const provider = new ethers.providers.Web3Provider(window_ethereum);
    const signer = provider.getSigner();
    console.log(signer, "SIGNER");
    return signer;
}
