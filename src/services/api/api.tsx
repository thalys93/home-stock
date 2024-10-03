import axios from 'axios';

export const APIlocal = axios.create({
    baseURL: "http://192.168.1.6:3000/api/v1"
})

// export const APIprod = axios.create({
//     baseURL: 'null'
// })
