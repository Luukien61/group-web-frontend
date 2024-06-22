import {TokenResponse} from "@/axios/Request.ts";
import {ACCESS_TOKEN, EXPIRE_DATE, LoginResponse, REFRESH_TOKEN} from "@/page/admin/LoginPage.tsx";

const SetToken = (loginResponse: LoginResponse) => {
    const tokenResponse: TokenResponse = loginResponse.tokenResponse;
    localStorage.setItem(ACCESS_TOKEN, tokenResponse.access_token)
    localStorage.setItem(REFRESH_TOKEN, tokenResponse.refresh_token)
    localStorage.setItem(EXPIRE_DATE, tokenResponse.expires_in.toString())
};

export default SetToken;