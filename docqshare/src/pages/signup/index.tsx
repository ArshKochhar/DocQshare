import React, { useEffect, useState } from "react";
import axios from "axios";
import TopNavigation from "../../components/topnavigation";
import MetaMaskButton from "../../components/buttons/metaMaskButton";
import Web3Token from "web3-token";
import Web3 from "web3";
declare var window: any

export interface AccountObject {
  userName: string;
  walletId: string;
  token: BigInt;
}

const Signup  = () => {
  var Logo = require('../../assets/logo.jpg');

  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [user, setUser] = useState<AccountObject>({
    userName: "",
    walletId: "",
    token: BigInt(0)
  });

  const handleUserNameChange = (e: any) => {
    const { name, value } = e.target;
    setUser({...user, [name]: value})
  }

  const handleWalletChange = (value: string) => {
    setUser({...user, walletId: value})
  }

  const handleTokenChange = (value: BigInt) => {
    setUser({...user, token: value})
  }

  const signUp = async () => {
    if (window.ethereum) {
      await window.ethereum.request({method: 'eth_requestAccounts'});
      window.web3 = new Web3(window.ethereum);
      try {
        const token = await Web3Token.sign((msg: string) => window.web3.eth.personal.sign(msg, user.walletId), '1d');
        axios.post("http://localhost:3500/auth/signup", 
          { userName: user.userName,
            walletId: user.walletId,
            token: null
          }, {
            headers: {
              'Authorization': token,
            }
          })
        } catch (err) {
          console.log(err);
          setErrorMsg(err)
        }
    }
  }

  const onSubmit = async (e: any) => {
    signUp();
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className='bg-page-bg w-screen h-screen overflow-hidden'>
      <div className='w-full h-28'>
        <TopNavigation/>
      </div>
      <div className='w-full h-full py-6'>
        <div className='grid place-items-center h-full w-full'>
        <div className='bg-white w-1/4 border-2 h-min rounded-lg shadow-2xl'>
          <div className='flex flex-col items-center w-full'>
            <img className='h-32 w-32' src={Logo} alt={""}/>
            <p className='text-xs'>Start Sharing Files Safely Today!</p>
          </div>
          <div className='w-full flex flex-col items-center pt-8 gap-y-4'>
            <div className='w-2/3 bg-queens-red'>
              {errorMsg && <p className='text-white text-center py-1 rounded-md'>{errorMsg}</p>}
            </div>
            <input 
              className='w-2/3 bg-page-bg content-center pl-2 py-2 rounded-md outline-0 shadow-inner'
              type='text'
              placeholder='Username...'
              onChange={handleUserNameChange} 
              name='userName' 
              value={user.userName}
              />
          </div>
          <div className='w-full flex flex-col items-center pt-8 pl-2'>
            <MetaMaskButton 
              setWallet={handleWalletChange}
            />
          </div>
          <div className='w-full flex flex-col items-center py-6'>
            <button 
              className='w-2/3 text-white bg-queens-blue rounded-md py-2 hover:bg-blue-400'
              onClick={onSubmit}
              >Sign Up
            </button>
          </div>
        </div>
          <div className='w-1/4 py-4 flex flex-col items-center bg-white rounded-md shadow-2xl'>
            <p>Already have an account? <a href="/register" className="no-underline hover:underline text-blue-500 text-bold">Login In</a></p>
          </div>
        <div>
        </div>
        </div>
      </div>
    </div>
    )
}

export default Signup;