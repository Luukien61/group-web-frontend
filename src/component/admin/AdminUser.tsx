import React, {useEffect, useState} from 'react';
import {UserResponse} from "@/page/LoginPage.tsx";
import {getAllUsers, inActiveUser} from "@/axios/Request.ts";
const dummy: UserResponse = {
    staffID: 0,
    fullName: "",
    email: "",
    phone: "",
    activeState: true
};
const AdminUser = () => {
    const [users, setUsers] = useState<UserResponse[]>([]);
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
    const length = headerTitles.length-1;
    const handleInActiveUser =async (user: UserResponse) => {
        if(user.activeState){
            await inActiveUser(user.staffID)
            window.location.reload();
        }
    }
    return (
        <div className={`w-full py-10 h-screen`}>
            <div className="relative overflow-x-auto shadow-md overflow-y-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr className={`border-b-2 border-gray-400`}>
                        {
                            headerTitles.map((headerTitle,index) => (
                                <th key={index} className="px-6 py-3 ">
                                    <div className={`w-full flex ${index==length && 'justify-center'}`}>
                                        {headerTitle}
                                    </div>
                                </th>
                            ))
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user: UserResponse) => (
                            <tr className="bg-white hover:bg-gray-100 cursor-pointer">
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
                                        onClick={()=>handleInActiveUser(user)}
                                        className={`font-medium  ${!user.activeState ? 'select-none' : 'text-blue-600 hover:underline'}`}>{user.activeState ? 'Active' : "Inactive"}</p>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUser;