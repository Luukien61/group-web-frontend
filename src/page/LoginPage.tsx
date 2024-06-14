import React, {useCallback, useEffect, useState} from 'react';
import {homeBackgroundimg} from "@/url/Urls.ts";
import {authenticateRequest, login, TokenResponse} from "@/axios/Request.ts";
import {useNavigate} from "react-router-dom";
import {useLoginState} from "@/zustand/AppState.ts";

export type LoginProps = {
    email: string,
    password: string,
}
export type LoginResponse={
    "message": string,
    "tokenResponse": TokenResponse,
    "user": {
        "staffID": number,
        "fullName": string,
        "email": string,
        "phone": string
    }
}
export const ACCESS_TOKEN: string = "access_token";
export const REFRESH_TOKEN: string = "refresh_token";
export const EXPIRE_DATE: string = "expire_date";
const LoginPage = () => {
    const navigate = useNavigate();
    const {isLogin, setIsLogin} = useLoginState()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true)
    const emailPattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.\w{3,4}$/
    const handleLogIn = async () => {
        const isEmailValid: boolean = emailPattern.test(email)
        if (isEmailValid) {
            const loginRequest: LoginProps = {
                email: email,
                password: password
            }
            try {
                const loginResponse: LoginResponse = await login(loginRequest)
                const tokenResponse: TokenResponse = loginResponse.tokenResponse;
                localStorage.setItem(ACCESS_TOKEN, tokenResponse.access_token)
                localStorage.setItem(REFRESH_TOKEN, tokenResponse.refresh_token)
                localStorage.setItem(EXPIRE_DATE, tokenResponse.expires_in.toString())
                setIsLogin(true)
                navigate("/admin")
            } catch (e) {
                console.error(e)
            }
        } else {
            setIsEmailValid(false)
            setTimeout(() => {
                setIsEmailValid(true)
            }, 2000)
        }
    }

    useEffect( () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token){
            authenticate()
        }
        const handlePopState = () => {
            if (isLogin) {
                navigate('/admin');
            }
        };

        window.addEventListener('popstate', handlePopState);
        document.title="Login"

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
    const authenticate = useCallback(async () => {
        const state= await authenticateRequest()
        setIsLogin(state)
        if(state){
            navigate("/admin")
        }
    },[])
    return (
        <div className="w-full flex px-4 mx-auto max-w-8xl h-screen justify-center drop-shadow-2xl "
             style={{
                 backgroundImage: `url(${homeBackgroundimg})`,
                 backgroundSize: '100% 100%',
                 backgroundRepeat: 'no-repeat',
             }}
        >
            <div className={`w-1/3 gap-y-2 rounded bg-white drop-shadow-2xl py-5 my-12`}>
                <div className={`w-full p-4 flex justify-center my-auto`}>
                    <img
                        className={`object-cover`}
                        src={"./app-icon.jpg"}
                        alt={"App logo"}/>
                </div>
                <div className={`p-4`}>
                    <InputFormGoogle style={`${!isEmailValid && 'border-red-600 border-2'}`} label={`Email`} type={"email"} action={(value) => setEmail(value)}/>
                    <InputFormGoogle label={`Password`} type={'password'} action={(value) => setPassword(value)}/>
                    <div className={`w-full flex items-center justify-end `}>
                        <p className={`italic text-[14px] hover:text-inner_blue cursor-pointer`}>Forgot password?</p>
                    </div>
                </div>
                <div className={`flex justify-center`}>
                    <button
                        onClick={handleLogIn}
                        className={`rounded bg-default_blue  text-white py-2 px-3 hover:bg-blue_other hover:font-semibold duration-300`}
                    >
                        Sign In
                    </button>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;


interface InputProps {
    type: string;
    label: string;
    style?: string,
    action: (value: string) => void;
}

const InputFormGoogle: React.FC<InputProps> = ({type, label, action,style}) => {
    return (
        <div className="relative z-0 w-full mb-5 ">
            <input
                onChange={(e) => action(e.target.value)}
                spellCheck="false"
                type={type}
                name="floating_email"
                className={`block py-2.5 px-3 w-full autofill:bg-white border rounded border-default_green text-sm
                 text-gray-900 bg-transparent appearance-none focus:outline-none
                  focus:ring-0 focus:border-blue-600 peer ${style}`}
                placeholder=" "
                required
            />
            <div
                className="bg-white pl-2 z-10 start-1 peer-focus:start-1 peer-focus:z-10 scale-75 text-[20px] text-blue-600 peer-focus:font-medium absolute peer-focus:text-[20px] dark:text-gray-400 -translate-y-6 duration-300 top-3 origin-left peer-placeholder-shown:-z-10 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                <p>{label}</p>
            </div>
        </div>
    );
};

