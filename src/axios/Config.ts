import axios from "axios";
import {backEndPage, mailServerBaseUrl} from "@/url/Urls.ts";
import {ACCESS_TOKEN} from "@/page/admin/LoginPage.tsx";

export const instance = axios.create({
    baseURL: backEndPage
})

export const mailInstance= axios.create({
    baseURL: mailServerBaseUrl
})
export const adminInstance = axios.create({
    baseURL: backEndPage
});

adminInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
