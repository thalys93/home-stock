import { apiRegisterValues } from "~/utils/interfaces/register_interfaces";
import { APIlocal } from "../api";

export async function doRegister(data: apiRegisterValues) {
    try {
        const res = await APIlocal.post('api/user/new', {
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            password: data.password
        })

        if (res.data.message === "Usuário criado com role padrão!") {
            console.log({ message: "Cadastro Realizado com Sucesso", data: res.data })
            return { message: "Cadastro Realizado com Sucesso", data: res.data }
        } else {
            console.log({ message: "Falha ao Cadastrar", data: res.data })
            return { message: "Falha ao Cadastrar", data: res.data }
        }
    } catch (error) {
        console.log({ message: "Erro Interno", data: error })
        return { message: "Erro Interno", data: error }
    }
}