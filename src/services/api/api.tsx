import axios from 'axios';

export const APIlocal = axios.create({
    baseURL: "http://192.168.1.6:3000/" // todo: precisa ser colocado o ip da maquina na rede para poder fazer requisições
})

// export const APIprod = axios.create({
//     baseURL: 'null'
// })