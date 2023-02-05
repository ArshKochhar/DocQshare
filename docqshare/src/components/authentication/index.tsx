import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Authentication = ({ children }: { children: any}) => {
    const [verified, setVerified] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const token = localStorage.getItem("authToken");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setLoading(true);
        if (token) {
            axios.post("http://localhost:3500/auth/verify", { }, 
            {
                headers: {
                'Authorization': token,
                }
            }).then((response: any) => {
                console.log(response.data.message);
                setVerified(true);
                setLoading(false);
                return;
            }).catch((error: any) => {
                localStorage.removeItem("authToken");
                console.log(error);
                setVerified(false);
                setLoading(false);
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

    return <ClipLoader color="#FFFFFF" loading/>

};
export default Authentication;