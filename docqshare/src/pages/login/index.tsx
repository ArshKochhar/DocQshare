import React, { useState } from "react";
import axios from "axios";
import TopNavigation from "../../components/topnavigation";
import MetaMaskButton from "../../components/buttons/metaMaskButton";
import Web3Token from "web3-token";
import Web3 from "web3";
import { Spinner } from "../../components/loading/spinner";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, User, setWalletId } from "../../redux/userSlice";

declare var window: any


export interface MsgObject {
    message: string;
    color: string;
}

const Login = () => {
    const dispatch = useDispatch();
    const userState: User = useSelector((state: any) => state.user);
    const { walletId, userName } = userState;

    const [msg, setMsg] = useState<MsgObject | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleUserNameChange = (e: any) => {
        dispatch(setUserName(e.target.value));
    };

    const changeMessage = (color: string, content: string) => {
        setMsg({ ...msg, color: color, message: content });
    };


  const handleLogin = async () => {
    if (window.ethereum) {
      await window.ethereum.request({method: 'eth_requestAccounts'});
      window.web3 = new Web3(window.ethereum);
      setIsLoading(true);
      const token = await Web3Token.sign((msg: string) => window.web3.eth.personal.sign(msg, walletId), '1h');
      axios.post("http://localhost:3500/auth/login", 
        { userName: userName,
          walletId: walletId,
        }, {
          headers: {
            'Authorization': token,
          }
        }).then(response => {
          // token is stored on client-side 
          localStorage.setItem("authToken", token);
          // successful response message is displayed
          setIsLoading(false);
          changeMessage(response.data.color, response.data.message);
          dispatch(setWalletId(walletId));
          dispatch(setUserName(userName));
          setTimeout(window.location.replace("http://localhost:3000/account"), 100);
        }).catch((error: any) => {
          setIsLoading(false);
          changeMessage("bg-red-600", error.response.data.message);
        });
    }
  }


    const onSubmit = async (e: any) => {
        handleLogin();
    };

    return (
        <div className="bg-page-bg w-screen h-screen overflow-hidden">
            <div className="w-full h-28">
                <TopNavigation />
            </div>
            <div className="w-full h-full py-6">
                <div className="grid place-items-center h-full w-full">
                    <div className="bg-white w-1/4 border-2 h-min rounded-lg shadow-2xl">
                        <div className="w-full flex flex-col items-center pt-8">
                            <p className="text-center font-bold text-4xl">Login</p>
                        </div>
                        <div className="w-full flex flex-col items-center pt-8 gap-y-8">
                            {(msg || isLoading) && (
                                <div className={`w-2/3 text-sm rounded-lg p-2 ${!isLoading && msg?.color}`}>
                                    {isLoading ? (
                                        <div className="flex flex-col items-center">
                                            <Spinner />
                                        </div>
                                    ) : (
                                        msg && <p className="text-white text-center py-1 rounded-md">{msg.message}</p>
                                    )}
                                </div>
                            )}
                            <input className="w-2/3 bg-page-bg content-center pl-2 py-2 rounded-md outline-0 shadow-inner" type="text" placeholder="Username..." onChange={handleUserNameChange} name="userName" value={userName ?? ""} />
                        </div>
                        <div className="w-full flex flex-col items-center pt-8 pl-2">
                            <MetaMaskButton setMsg={changeMessage} />
                        </div>
                        <div className="w-full flex flex-col items-center py-6">
                            <button className="w-2/3 text-white bg-queens-blue rounded-md py-2 hover:bg-blue-400" onClick={onSubmit}>
                                Login
                            </button>
                        </div>
                    </div>
                    <div className="w-1/4 py-4 flex flex-col items-center bg-white rounded-md shadow-2xl">
                        <p>
                            Do not have an account?{" "}
                            <a href="/signup" className="no-underline hover:underline text-blue-500 text-bold">
                                Sign Up
                            </a>
                        </p>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
