import { Link } from 'react-router-dom';
import Web3Token from "web3-token";
import Web3 from "web3";
import axios from "axios";
declare var window: any

export interface navParams {
    howItWorks: string,
    aboutUs: string,
    landingPage: string,
}

const TopNavigationHome = ({howItWorks, aboutUs, landingPage}: navParams) => {
    var Banner = require('../../assets/DocuShareBanner.jpg');

    // const handleLogin = async () => {
    //     if (window.ethereum) {
    //         await window.ethereum.request({method: 'eth_requestAccounts'});
    //         window.web3 = new Web3(window.ethereum);
    //         const token = await Web3Token.sign((msg: string) => window.web3.eth.personal.sign(msg, user.walletId), '1h');
    //         axios.post("http://localhost:3500/auth/login", 
    //         { userName: user.userName,
    //             walletId: user.walletId,
    //         }, {
    //             headers: {
    //             'Authorization': token,
    //             }
    //         }).then(response => {
    //           // token is stored on client-side 
    //             localStorage.setItem("authToken", token);
    //           // successful response message is displayed
    //         }).catch((error: any) => {
    //         });
    //     }
    // }

    const checkLogin = () => {
        if (localStorage.getItem('token')) {

            return (
                <div>
                    <Link to='/account'>
                        <p className="text-center text-gray-600 hover:text-black hover:font-bold">
                            Account
                        </p>
                    </Link>
                </div>
            )
        } else {
            return (
                <button className="p-2 rounded-md">
                    <Link to='/login' className=''>
                        <p className="text-center text-gray-600 hover:text-black hover:font-bold">
                            Login
                        </p>
                    </Link>
                </button>
            )
        }
    }

    return (
        <div className="w-full h-full">
            <div className="w-screen bg-white shadow-lg py-2">
                <div className="w-full h-full grid grid-cols-3">
                    <div className="w-full h-full">
                        <div className="h-full w-fit items-left text-center pl-4">
                            <a href={landingPage} className='scroll-smooth'>
                                <img className='h-20 object-scale-down' src={Banner} alt={""} />
                            </a>
                        </div>
                    </div>
                    <div></div>
                    <div className="w-full h-full grid grid-flow-col-dense items-center">
                        <div>            
                        <button className="p-2 rounded-md">
                                <a href={howItWorks} className='scroll-smooth'>
                                    <p className="text-center text-gray-600 hover:text-black hover:font-bold">
                                        How it works
                                    </p>
                                </a>
                            </button>
                        </div>   
                        <div>            
                        <button className="p-2 rounded-md">
                                <a href={aboutUs} className='scroll-smooth'>
                                    <p className="text-center text-gray-600 hover:text-black hover:font-bold">
                                        About us
                                    </p>
                                </a>
                            </button>
                        </div>
                        <div>            
                            <button className="p-2 rounded-md">
                                <Link to='/login' className=''>
                                    <p className="text-center text-gray-600 hover:text-black hover:font-bold">
                                        Login
                                    </p>
                                </Link>
                            </button>
                        </div>
                        <div>            
                        <div className="p-2 rounded-md">
                                <button className=' bg-queens-blue rounded-lg p-2 hover:bg-blue-400'>
                                    <Link to='/signup' >
                                        <p className="text-center text-white ">
                                            Get started today
                                        </p>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNavigationHome