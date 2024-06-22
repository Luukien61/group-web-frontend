import React, {useEffect, useRef, useState} from 'react';
import {UserResponse} from "@/page/admin/LoginPage.tsx";
import {getAllUsers, inActiveUser, insertNewUser} from "@/axios/Request.ts";
import {IoIosAddCircleOutline} from "react-icons/io";
import {Input, InputProps} from "@/page/admin/AdminProfile.tsx";
import {DefaultButton} from "@/component/admin/ProductInfo.tsx";

const dummy: UserResponse = {
    staffID: 0,
    fullName: "",
    email: "",
    phone: "",
    activeState: true,
    role: "USER",
    password: ''
};
const AdminUser = () => {
    const [newUser, setNewUser] = useState<UserResponse>(dummy);
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [addNewUserRequest, setAddNewUserRequest] = useState<boolean>(false);
    useEffect(() => {
        fetchUsers()
        document.title = "Admin User"
    }, []);
    const fetchUsers = async () => {
        const allUsers: UserResponse[] = await getAllUsers("staff")
        allUsers.sort((a, b) => a.fullName.localeCompare(b.fullName));
        setUsers(allUsers)
    }
    const headerTitles: string[] = Object.keys(dummy)
        .filter(value => value !== "staffID" && value !== "password" && value !== "role");
    const length = headerTitles.length - 1;
    const handleInActiveUser = async (user: UserResponse) => {
        if (user.activeState) {
            await inActiveUser(user.staffID)
            window.location.reload();
        }
    }
    const roleOption = useRef<HTMLSelectElement>(null)
    const newUserFields: InfoFieldProps[] = [
        {
            title: "Username: ",
            input: {
                type: "text",
                onChange: (e) => setNewUser(prevState => ({...prevState, fullName: e.target.value})),
                value: newUser.fullName
            }
        },
        {
            title: "Email",
            input: {
                type: "text",
                onChange: (e) => setNewUser(prevState => ({...prevState, email: e.target.value})),
                value: newUser.email
            }
        },
        {
            title: "Password",
            input: {
                type: "password",
                onChange: (e) => setNewUser(prevState => ({...prevState, password: e.target.value})),
                value: newUser.password ?? ''
            }
        },
        {
            title: "Phone",
            input: {
                type: "text",
                onChange: (e) => setNewUser(prevState => ({...prevState, phone: e.target.value})),
                value: newUser.phone
            }
        }
    ]
    const handleAddNewUser=async ()=>{
        if(roleOption.current && newUser.fullName && newUser.email && newUser.password && newUser.phone) {
            const user : UserResponse = {
                ...newUser,
                role: roleOption.current.value
            }
            try{
                await insertNewUser(user)
                window.location.reload()
            }catch(e){
                console.log(e)
            }
        }
    }
    return (
        <div className={`w-full py-10 h-screen max-h-screen overflow-hidden`}>
            <div className={`flex justify-between`}>
                <div className={`ms-6 mb-4 flex items-center`}>
                    <p className={`font-medium`}>Users</p>
                </div>
                <div className={`w-full flex flex-1 justify-end mb-4 px-4`}>
                    <div
                        onClick={() => setAddNewUserRequest(true)}
                        className={`flex gap-x-1 rounded cursor-pointer bg-blue-500 items-center text-white px-2 py-1 hover:bg-blue_other`}>
                        <IoIosAddCircleOutline size={32}/>
                    </div>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md h-full">
                <table className="w-full text-sm text-left text-gray-500 overflow-y-auto">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-300 sticky top-0 border-b-2 border-gray-400">
                    <tr className={``}>
                        {
                            headerTitles.map((headerTitle, index) => (
                                <th key={index} className="px-6 py-3 ">
                                    <div className={`w-full flex ${index == length && 'justify-center'}`}>
                                        {headerTitle}
                                    </div>
                                </th>
                            ))
                        }
                    </tr>
                    </thead>
                    <tbody className={`overflow-y-auto`}>
                    {
                        users.map((user: UserResponse,index) => (
                            <tr key={index} className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 cursor-pointer">
                                <th
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {user.fullName}
                                </th>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    {user.phone}
                                </td>
                                <td className="px-6 py-4 flex items-center justify-center">
                                    <p
                                        onClick={() => handleInActiveUser(user)}
                                        className={`font-medium  ${!user.activeState ? 'select-none' : 'text-blue-600 hover:underline'}`}>{user.activeState ? 'Active' : "Inactive"}</p>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            {
                addNewUserRequest &&
                <div
                    onClick={()=>setAddNewUserRequest(false)}
                    className={`w-screen h-screen fixed inset-0 backdrop-blur-sm bg-black bg-opacity-60 z-50 flex items-center justify-center`}>
                    <div onClick={(e)=>e.stopPropagation()}
                        className={`rounded shadow-xl bg-white w-1/3 p-6 pb-2`}>
                        <div className={`gap-x-10 gap-y-7 grid grid-cols-[auto_1fr]`}>
                            {
                                newUserFields.map((value, index) => (
                                    <InfoField key={index} title={value.title} input={value.input}/>
                                ))
                            }
                            <p className="font-bold">Role</p>
                            <select
                                ref={roleOption}
                                defaultValue={'USER'}
                                className="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg block w-full p-[13px]">
                                <option value={'USER'} className={`text-gray-600`}>Staff</option>
                                <option value={'ADMIN'} className={`text-gray-600`}>Admin</option>
                            </select>
                        </div>
                        <div className={`w-full flex justify-end py-3 my-auto`}>
                            <DefaultButton
                                style={'bg-blue-600 px-3 py-1 flex item-center hover:bg-blue_other'}
                                label={"Add"}
                                onclick={handleAddNewUser}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default AdminUser;
type InfoFieldProps = {
    title: string;
    input: InputProps;
}
const InfoField = ({title, input}: InfoFieldProps) => {
    return (
        <>
            <p className="font-bold">{title}</p>
            <Input
                style={input.style}
                value={input.value}
                onChange={input.onChange}
                type={input.type}/>
        </>
    )
}