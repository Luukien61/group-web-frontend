import {useEffect, useState} from "react";
import {getUserResponseById} from "@/axios/Request.ts";
import {UserResponse} from "@/page/LoginPage.tsx";
import {useUserIdLogin, useUserLogin} from "@/zustand/AppState.ts";

const useCurrentUser = () => {
    const {user, setUser}= useUserLogin()
    const [currentUser, setCurrentUser] = useState<UserResponse>(user)
    const {userId}= useUserIdLogin()
    useEffect(() => {
        const getUserResponse = async (userId : number)=>{
            const userResponse = await getUserResponseById(userId)
            if(userResponse){
                setUser(userResponse)
                setCurrentUser(userResponse)
            }
        }
        if(user.staffID<0 && userId){
            getUserResponse(userId)
        }
    }, []);
    return currentUser
};

export default useCurrentUser;