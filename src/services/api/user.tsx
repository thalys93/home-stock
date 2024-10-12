import { AxiosCustomResponse } from "~/utils/interfaces/api_response_interface";
import { APIlocal, auth_header } from "./api";

export interface NewUserPayload {
    firstName: string,
    lastName: string,
    email: string;
    password: string;
    profile: {
        avatarUrl?: string
        bio?: string
        phoneNumber?: string
        dateOfBirth?: Date
    }
}

export interface RegisterValues {
    firstName: string,
    lastName: string,
    email: string,
    password: string;
    confirmPassword?: string;
    checkTerms?: boolean,
}

export async function doRegister(data: NewUserPayload) {
    try {
        const res = await APIlocal.post('/user/create', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            recoverToken: null,
            role: "Usuário",
            password: data.password,
            profile: {
                avatarUrl: data.profile.avatarUrl,
                bio: data.profile.bio,
                phoneNumber: data.profile.phoneNumber,
                dateOfBirth: data.profile.dateOfBirth
            }
        })

        return res as AxiosCustomResponse
    } catch (error: any) {
        return error.response
    }
}

export async function getMyData(id: string, token: string) {
    try {
        const res = await APIlocal.get(`/auth/user/find/${id}`, auth_header(token))
        
        return res as AxiosCustomResponse
    } catch (err: any) {
        return err.response
    }
}

export async function updateUser(id: string, data: any, token: string) {
    try {
        const res = await APIlocal.patch(`/auth/user/update/${id}`, data, auth_header(token))
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

export async function getUserProfile(id: string, token: string) {
    try {
        const res = await APIlocal.get(`/auth/user/find/${id}`, auth_header(token))

        if (res.data.found) {
            return { message: "Dados Retornados com Sucesso", data: res.data.found }
        } else {
            return { message: "Usuário Não Encontrado" }
        }
    } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error)
    }
}

export interface updateUserProfilePayload {
    avatarUrl?: string;
    bio?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    userId?: string
}

export async function updateUserProfile(id: string, data: updateUserProfilePayload, token: string) {
    try {
        const res = await APIlocal.patch(`/auth/user/profile/update/${id}`, data, auth_header(token))

        if (res.data.message === "Perfil de Usuário Atualizado com sucesso") {
            return { message: "Perfil atualizado", data: res.data.userProfile }
        } else {
            return { message: "Falha ao Atualizar", data: res.data }
        }
    } catch (error) {
        console.log({ message: "Erro Interno", data: error })
        return { message: "Erro Interno", data: error };
    }
}

export async function getUserAddress(id: string, token: string) {
    try {
        const res = await APIlocal.get(`/auth/user/address/${id}`, auth_header(token))
        if (res.data.found) {
            return { message: "Endereço Retornado com Sucesso", data: res.data.found }
        } else {
            return { message: "Endereço não encontrado" }
        }
    } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error)
        return { message: "Erro Interno", data: error };
    }
}

export async function updateUserAddress(id: string, data: any, token: string) { }

export async function createUserAddress(data: any, token: string) { }

// todo: adicionar serviço de exclusão de conta (w.i.p)