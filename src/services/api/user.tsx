import { apiRegisterValues } from "~/utils/interfaces/register_interfaces";
import { APIlocal } from "./api";
import { FoundUser } from "~/utils/interfaces/api_response_interface";

export async function doRegister(data: apiRegisterValues) {
    try {
        const res = await APIlocal.post('/user/create', {
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

export async function getMyData(id: string, token: string) {
    try {
        const res = await APIlocal.get(`/auth/user/find/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })

        if (res) {
            return { message: "Dados Retornados com Sucesso", data: res.data }
        }
    } catch (err) {
        console.log({ message: "Erro Interno", data: err });
        return { message: "Erro Interno", data: err }
    }
}

export async function updateUser(id: string, data: any, token: string) {
    try {
        const res = await APIlocal.patch(`/auth/user/update/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        })
        if (res.data.message === "Usuário Não Encontrado") {
            console.log({ message: "Falha ao Atualizar", data: res.data })
            return { message: "Falha ao Atualizar", data: res.data }
        } else {
            console.log({ message: "Atualizado com Sucesso", data: res.data })
            return { message: "Atualizado com Sucesso", data: res.data }
        }
    } catch (err) {
        console.log({ message: "Erro Interno", data: err });
        return { message: "Erro Interno", data: err }
    }
}

// todo: adicionar serviço de atualização de perfil e de endereços
export async function getUserProfile(id: string, token: string) {}

export async function updateUserProfile(id: string, data: any, token: string) {}

export async function getUserAddress(id: string, token: string) {}

export async function updateUserAddress(id: string, data: any, token: string) {}

export async function createUserAddress(data: any, token: string) {}

// todo: adicionar serviço de exclusão de conta (w.i.p)