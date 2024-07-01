import React, {useEffect, useRef, useState} from 'react';
import {createVerificationCode, sendEmailCode} from "@/page/ProductPage.tsx";
import {InputFormGoogle, LoginProps, LoginResponse, UserResponse} from "@/page/admin/LoginPage.tsx";
import {homeBackgroundimg} from "@/url/Urls.ts";
import {Input} from "@/page/admin/AdminProfile.tsx";
import {getUserByEmail, resetUserPassword} from "@/axios/Request.ts";
import {useLoginState, useUserIdLogin, useUserLogin} from "@/zustand/AppState.ts";
import {useNavigate} from "react-router-dom";
import SetToken from "@/hooks/SetToken.tsx";
import toast, {Toaster} from "react-hot-toast";
import EmailRegexCheck from "@/hooks/EmailRegexCheck.ts";

const AdminForgotPass = () => {
    const {setUserId} = useUserIdLogin()
    const {setUser} = useUserLogin()
    const {setIsLogin} = useLoginState()
    const navigate = useNavigate();
    const [expired, setExpired] = useState<boolean>(false)
    const [verificationEmail, setVerificationEmail] = useState<string>("");
    const [isSent, setIsSent] = useState<boolean>(false)
    const [userCode, setUserCode] = useState<string>("");
    const [verificationCode, setVerificationCode] = useState<string>('')
    const [timer, setTimer] = useState<number>(60)
    // eslint-disable-next-line no-undef
    const intervalTimer = useRef<NodeJS.Timeout | null>(null);
    const [existUser, setExistUser] = useState<UserResponse>()
    const [isVerified, setIsVerified] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [isPasswordMatch, setIsPasswordMatch]= useState<boolean>(true)
    const [validCode,setValidCode]= useState<boolean>(true)

    useEffect(() => {
        if ( timer === 0&& intervalTimer.current) {
            setExpired(true)
            clearInterval(intervalTimer.current)
            intervalTimer.current = null
        }
    }, [timer]);
    const handleButtonClick = () => {
        if (!isSent) {
            handleSendCode()
        } else {
            if (!isVerified) {
                if (userCode === verificationCode && !expired) {
                    setTimeout(()=>{
                        setIsVerified(true)
                    },1500)
                } else {
                    if(userCode !== verificationCode ) {
                        setValidCode(false)
                        setTimeout(()=>{
                            setValidCode(true)
                        },2000)
                    }
                }
            } else {
                if(password === confirmPassword) {
                    resetPassword()
                }else{
                    setIsPasswordMatch(false)
                    setTimeout(()=>{
                        setIsPasswordMatch(true)
                    },2000)
                }

            }
        }
    }

    const resetPassword = async () => {
        const user: LoginProps = {
            email: verificationEmail,
            password: password,
        }
        const loginResponse: LoginResponse = await resetUserPassword(user)
        SetToken(loginResponse)
        setUserId(loginResponse.user.staffID)
        setUser(loginResponse.user)
        setIsLogin(true)
        navigate("/admin")
    }


    const handleSendCode = async () => {
        if (verificationEmail && EmailRegexCheck({email: verificationEmail})) {
            const user: UserResponse = await getUserByEmail({
                email: verificationEmail,
                password: ''
            })
            setExistUser(user)
            if (user) {
                const code = createVerificationCode()
                sendEmailCode(verificationEmail, code, {event: "reset-password"})
                    .then(() => {
                        setIsSent(true)
                        const codeText = code.toString().trim()
                        setVerificationCode(codeText)
                        intervalTimer.current = setInterval(() => {
                            setTimer(prev => prev - 1)
                        }, 1000)
                    })
                    .catch(error => alert(error))
            }
        }
        else {
            toast.error("Invalid email")
        }
    }

    return (
        <>
            <div className="w-full flex px-4 mx-auto max-w-8xl h-screen justify-center drop-shadow-2xl "
                 style={{
                     backgroundImage: `url(${homeBackgroundimg})`,
                     backgroundSize: '100% 100%',
                     backgroundRepeat: 'no-repeat',
                 }}
            >
                <div className={`w-1/3 min-h-[600px] gap-y-2 rounded bg-white drop-shadow-2xl py-5 my-12`}>
                    <div className={`w-full p-4 flex justify-center my-auto`}>
                        <img
                            className={`object-cover`}
                            src={"./app-icon.jpg"}
                            alt={"App logo"}/>
                    </div>
                    <div className={`p-4`}>
                        {
                            !isSent
                                ? <div className={`w-full flex items-center justify-between `}>
                                    <InputFormGoogle label={"Email"} type={"email"} action={setVerificationEmail}/>
                                </div>
                                : !isVerified
                                    ? <div className={`w-full flex flex-col gap-y-2 items-center px-3 relative`}>
                                        <p>Please enter the code sent to {existUser?.email}</p>
                                        <Input
                                            style={`w-full border border-2 border-gray-200 ${!validCode && 'custom-shadow-red'}`}
                                            value={userCode}
                                            onChange={(e) => setUserCode(e.target.value)}
                                            type={"text"}/>
                                        {
                                            !validCode &&
                                            <p className={`absolute -bottom-4 text-[16px] font-light text-red-600`}>
                                                Invalid code
                                            </p>
                                        }
                                        <p className={`mt-1 text-default_red `}>{timer > 0 ? `Valid timer: ${timer}` : "Expired"}</p>
                                    </div>
                                    : <div className={` gap-x-10 gap-y-7 flex flex-col`}>
                                        <div className={`w-full flex flex-col gap-y-2`}>
                                            <p className="font-bold">New password:</p>
                                            <Input
                                                style={`w-full`}
                                                type={"password"}
                                                onChange={e => setPassword(e.target.value)}
                                                value={password}
                                            />
                                        </div>
                                        <div className={`relative w-full flex flex-col gap-y-2`}>
                                            <p className="font-bold">Confirm password:</p>
                                            <Input
                                                style={`w-full ${!isPasswordMatch && 'custom-shadow-red'}`}
                                                type={"password"}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                                value={confirmPassword}
                                            />
                                            {
                                                !isPasswordMatch &&
                                                <p className={`absolute -bottom-4 text-[14px] font-light text-red-600`}>Password
                                                    dont match</p>
                                            }
                                        </div>
                                    </div>
                        }
                    </div>
                    <div className={`flex justify-center mt-10`}>
                        <button
                            onClick={handleButtonClick}
                            className={`rounded bg-default_blue text-white py-2 px-3 hover:bg-blue_other hover:font-semibold duration-300`}
                        >
                            {!isSent ? 'Send code' : !isVerified ? 'Verify' : 'Update'}
                        </button>
                    </div>

                </div>
            </div>
            <Toaster toastOptions={{duration:1500}}/>
        </>
    );
}
export default AdminForgotPass;