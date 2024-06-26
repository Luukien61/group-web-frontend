import React, {useEffect} from 'react';
import {getAuthUrlMail} from "@/axios/Request.ts";

const AuthUrlRedirect = () => {
    useEffect(() => {
        getAuthUrl()
        document.title="Mail auth"
    }, []);
    const getAuthUrl =async ()=>{
        const authUrl : string = await getAuthUrlMail();
        window.open(authUrl, '_blank');
    }
    return (
       <p className={`italic`}>Redirecting to auth url...</p>
    );
};

export default AuthUrlRedirect;