import React, {useState} from 'react';
import {homeBackgroundimg} from "@/url/Urls.ts";

const LoginPage = () => {
    const [email, setEmail]= useState<string>("")
    const [password, setPassword]= useState<string>("")
    const handleLogIn=()=>{
        console.log(email)
        console.log(password)
    }
    const emailpPattern : string = '/([A-z 0-9])+@([A-z])+.([A-z])/'
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
                    <InputFormGoogle label={`Email`} type={"email"} action={(value) => setEmail(value)}/>
                    <InputFormGoogle label={`Password`} type={'password'} action={(value) => setPassword(value)}/>
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
    action: (value: string) => void;
}

const InputFormGoogle: React.FC<InputProps> = ({type, label, action}) => {
    return (
        <div className="relative z-0 w-full mb-5 ">
            <input
                onChange={(e) => action(e.target.value)}
                spellCheck="false"
                type={type}
                name="floating_email"
                className="block py-2.5 px-3 w-full autofill:bg-white border rounded border-default_green text-sm text-gray-900 bg-transparent appearance-none dark:text-white   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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

