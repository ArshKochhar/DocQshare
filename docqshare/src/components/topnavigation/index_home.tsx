import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';

export interface navParams {
    howItWorks: string,
    aboutUs: string,
    landingPage: string,
}

const TopNavigationHome = ({howItWorks, aboutUs, landingPage}: navParams) => {
    var Banner = require('../../assets/DocuShareBanner.jpg');
    const token = localStorage.getItem("authToken");

    const [alreadyLoggedIn, setAlreadyLoggedIn] = useState<boolean>(false);

    const handleLogin = async () => {
        if (token) {
            axios.post("http://localhost:3500/auth/verify", { }, 
            {
                headers: {
                'Authorization': token,
                }
            }).then(() => {
                setAlreadyLoggedIn(true);
                return;
            }).catch(() => {
                localStorage.removeItem("authToken");
                setAlreadyLoggedIn(false);
                return;
            });
        } else {
            setAlreadyLoggedIn(false);
            return;
        }
    }

    useEffect(() => {
        handleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    <div className="w-full h-full grid grid-cols-4 place-items-center">
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
                            {
                            alreadyLoggedIn 
                                ?
                                    <div>
                                        <Link to='/account'>
                                            <p className="text-center text-gray-600 hover:text-black hover:font-bold">
                                                Account
                                            </p>
                                        </Link>
                                    </div>
                                :
                                    <button className="p-2 rounded-md">
                                        <Link to='/login' className=''>
                                            <p className="text-center text-gray-600 hover:text-black hover:font-bold">
                                                Login
                                            </p>
                                        </Link>
                                    </button>
                            }
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