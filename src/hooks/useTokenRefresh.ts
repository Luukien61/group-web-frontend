import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ACCESS_TOKEN, EXPIRE_DATE, REFRESH_TOKEN} from "@/page/LoginPage.tsx";
import {refreshTokenRequest, TokenResponse} from "@/axios/Request.ts";

const useTokenRefresh = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkTokenExpiry = async () => {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            const expireTime = localStorage.getItem(EXPIRE_DATE);

            if (!accessToken || !refreshToken || !expireTime) {
                navigate('/login', { replace: true });
                return;
            }

            const expiryDate = new Date(expireTime);
            const now = new Date();
            const persistToken = (newTokens: TokenResponse)=>{
                if (newTokens) {
                    localStorage.setItem(ACCESS_TOKEN, newTokens.access_token);
                    localStorage.setItem(REFRESH_TOKEN, newTokens.refresh_token);
                    localStorage.setItem(EXPIRE_DATE, newTokens.expires_in.toString());
                    setIsAuthenticated(true);
                } else {
                    navigate('/login', { replace: true });
                }
            }
            if (expiryDate <= now) {
                // Access token expired, refresh it
                const newTokens : TokenResponse = await refreshTokenRequest(refreshToken);
                persistToken(newTokens)
            } else {
                // Schedule refresh before token expiry
                const timeout = expiryDate.getTime() - now.getTime() - 60000; // 1 minute before expiry
                setInterval(async () => {
                    const newTokens : TokenResponse = await refreshTokenRequest(refreshToken);
                    persistToken(newTokens)
                }, timeout);
            }
        };

        checkTokenExpiry();
    }, [navigate]);

    return isAuthenticated;
};

export default useTokenRefresh;
