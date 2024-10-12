import axios from 'axios';

export const APIlocal = axios.create({
    baseURL: "http://192.168.1.3:3000/api/v1"
})

export function auth_header(token: string) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

// export const APIprod = axios.create({
//     baseURL: 'null'
// })
