import { Axios, AxiosResponse } from "axios";
import { APIlocal } from "./api";
import { AxiosCustomResponse, ErrorLoginResponse } from "~/utils/interfaces/api_response_interface";

export interface loginProps {
    email: string;
    password: string;
}

export async function doLogin(data: loginProps) {
    try {
        const res = await APIlocal.post('/auth/login', {
            email: data.email,
            password: data.password
        })

        return res as AxiosCustomResponse
    } catch (error: any) {
        return error.response
    }
}