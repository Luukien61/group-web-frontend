import axios from "axios";
import {backEndPage, mailServerBaseUrl} from "@/url/Urls.ts";

export const instance = axios.create({
    baseURL: backEndPage
})

export const mailInstance= axios.create({
    baseURL: mailServerBaseUrl
})