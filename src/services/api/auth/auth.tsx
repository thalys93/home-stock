import { loginProps } from "~/utils/interfaces/login_interface";
import { APIlocal } from "../api";

export async function doLogin(data: loginProps) {
    try {
        const res = await APIlocal.post('api/auth/login', {
            email: data.email,
            password: data.password
        })

        if (res.data.statusCode === 200) {
            console.log({ message: "Login Realizado com Sucesso", data: res.data })
            return { message: "Login Realizado com Sucesso", data: res.data }
        } else {
            console.log({ message: "Falha ao Logar", data: res.data })
            return { message: "Falha ao Logar", data: res.data }
        }
    } catch (error) {
        console.log({ message: "Erro Interno", data: error })
        return { message: "Erro Interno", data: error }
    }
}