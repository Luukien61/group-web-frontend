import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {authenticateRequest} from "@/axios/Request.ts";
import useTokenRefresh from "@/hooks/useTokenRefresh.ts";

const useAuthenticate =async () => {
    const navigate = useNavigate();
    const isAuthenticated = useTokenRefresh();
    useEffect(() => {
        const authenticate = async () => {
            const state = await authenticateRequest();
            if (!state) {
                if(!isAuthenticated) {
                    navigate('/login', { replace: true });
                }
            }
        };
        authenticate();
    }, [navigate]);
};

export default useAuthenticate;