import axios, { Axios } from "axios"
import { BASE_URL } from "../constants"
import Cookies from 'js-cookie';

export const apiRequest = (url: string, payload: any) => {
    return axios.post(`${BASE_URL}/${url}`, payload, {headers: { Authorization: `Bearer ${Cookies.get('token')}` }})
    .then(res => ({res}))
    .catch(err => ({err}))
} 