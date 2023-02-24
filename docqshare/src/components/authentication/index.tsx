import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
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
            <ClipLoader color="#000000" size='300px' loading/>
        </div>
    );
};
export default Authentication;