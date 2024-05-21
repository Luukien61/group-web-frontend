import axios from "axios";
import {backEndPage} from "@/url/Urls.ts";

export const instance = axios.create({
    baseURL: backEndPage
})