import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Authentication = ({ children }: { children: any}) => {
    const [verified, setVerified] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const token = localStorage.getItem("authToken");


    useEffect(() => {
        setLoading(true);
        if (token) {
            axios.post("http://localhost:3500/auth/verify", { }, 
            {
                headers: {
                    'Authorization': token,
                }
            }).then(() => {
                setLoading(false);
                setVerified(true);
                return;
            }).catch(() => {
                setLoading(false);
                setVerified(false);
                localStorage.removeItem("authToken");
                return;
            });
        } else {
            setVerified(false);
            setLoading(false);
            return;
        }
    }, [token]);

    if (!loading && !verified) {
        return <Navigate to="/" />;
    }
    
    if (!loading && verified) {
        return children
    }
    
    return (
        <div className="flex justify-center items-center h-screen">
            <ClipLoader color="#000000" size='500px' loading/>
            {/* <div className="absolute inset-x-0 top-30 flex flex-col items-center">
            <h1 className="w-full font-3xl text-center text-black font-bold">ERROR: Please Return To Homepage</h1>
                <button className="w-1/4 bg-queens-blue font-medium text-white hover:bg-blue-400 rounded-md">
                    <Link to='/' className=' px-4 font-medium text-white'>
                        <p className="text-sm font-medium text-white">
                            Home
                        </p>
                    </Link>
                </button>
            </div> */}
        </div>
    );
};
export default Authentication;