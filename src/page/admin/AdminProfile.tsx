import React, {useEffect, useState} from 'react';
import useCurrentUser from "@/hooks/useCurrentUser.ts";
import {UserResponse} from "@/page/admin/LoginPage.tsx";
import {DefaultButton} from "@/component/admin/ProductInfo.tsx";
import {updateProfile} from "@/axios/Request.ts";

const AdminProfile = () => {
    const loggedInUser = useCurrentUser()
    const [editRequest, setEditRequest] = useState<boolean>(false)
    const [currentUser, setCurrentUser] = useState<UserResponse>(loggedInUser)
    const [fullName, setFullName] = useState<string>(currentUser.fullName)
    const [phone, setPhone] = useState<string>(loggedInUser.phone)
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [isPasswordMatched, setIsPasswordMatched] = useState<boolean>(true)
    useEffect(() => {
        document.title="Admin Profile"
    }, []);
    useEffect(() => {
        setCurrentUser(loggedInUser)
        setFullName(loggedInUser.fullName)
        setPhone(loggedInUser.phone)
    }, [loggedInUser]);

    const handleEditRequest = () => {
        if (editRequest) {
            handleUpdateProfile()
        } else {
            setEditRequest(true)
        }
    }

    const handleUpdateProfile = async () => {
        if (password && password === confirmPassword && fullName && phone ) {
            const user: UserResponse = {
                fullName: fullName,
                phone: phone,
                staffID: currentUser.staffID,
                email: currentUser.email,
                role: currentUser.role,
                activeState: true,
                password: password
            }
           try{
               await updateProfile(user)
               window.location.reload();
           }catch(e){
                alert("Error updating profile")
           }
        } else {
            setIsPasswordMatched(false)
            setTimeout(() => {
                setIsPasswordMatched(true)
            }, 2000)
        }
    }

    const handleCancel=()=>{
        setEditRequest(false)
        setFullName(currentUser.fullName)
        setPhone(currentUser.phone)
        setPassword('')
        setConfirmPassword('')
    }
    return (
        <div className={`w-full h-screen flex items-start justify-start p-6`}>
            <div className={`flex flex-col gap-y-2 w-1/2 p-6 rounded bg-white shadow-xl`}>
                <div className={` gap-x-10 gap-y-7 grid grid-cols-[auto_1fr]`}>
                    {
                        editRequest
                            ? <>
                                <p className="font-bold mt-1">User name:</p>
                                <Input
                                    onChange={e => setFullName(e.target.value)}
                                    value={fullName}
                                />
                                <p className="font-bold">Email:</p>
                                <p>{currentUser.email}</p>
                                <p className="font-bold">New password:</p>
                                <Input
                                    type={"password"}
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                />
                                <p className="font-bold">Confirm password:</p>
                                <div className={`relative w-full`}>
                                    <Input
                                        style={!isPasswordMatched ? 'w-full custom-shadow-red' : 'w-full'}
                                        type={"password"}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        value={confirmPassword}
                                    />
                                    {
                                        !isPasswordMatched &&
                                        <p className={`absolute -bottom-4 text-[14px] font-light text-red-600`}>Password
                                            dont match</p>
                                    }
                                </div>

                                <p className="font-bold">Phone:</p>
                                <Input
                                    onChange={e => setPhone(e.target.value)}
                                    value={phone}
                                />
                            </>
                            : <>
                                <p className="font-bold">User name:</p>
                                <p>{currentUser.fullName}</p>

                                <p className="font-bold">Email:</p>
                                <p>{currentUser.email}</p>

                                <p className="font-bold">Password:</p>
                                <p>*********</p>

                                <p className="font-bold">Phone:</p>
                                <p>{currentUser.phone}</p>
                            </>
                    }
                </div>
                <div className={`w-full mt-2 flex gap-x-6 justify-end `}>
                    {
                        editRequest &&
                        <DefaultButton style={'bg-red-500 px-4 py-1 hover:bg-inner_red'}
                                       label={'Cancel'} onclick={handleCancel}/>
                    }
                    <DefaultButton style={'bg-inner_blue px-4 py-1 hover:bg-blue_other'}
                                   label={editRequest ? 'Update' : 'Edit'} onclick={handleEditRequest}/>
                </div>
            </div>

        </div>
    );
};

export type InputProps = {
    style?: string
    value: string,
    // eslint-disable-next-line no-unused-vars
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: 'text' | 'password' | 'email' | 'password_confirmation' | "number"
}

export const Input = ({value, onChange, type, style}: InputProps) => {
    return (
        <input
            type={type ? type : 'text'}
            spellCheck={false}
            onChange={onChange}
            value={value}
            className={`rounded border px-3 focus:blue-growing-border  outline-none py-1 ${style}`}/>
    )
}

export default AdminProfile;