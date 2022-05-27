import axios, { AxiosInstance } from "axios"

export const createGetRequest = (url: string, token: string): AxiosInstance => {
    const axiosRequest: AxiosInstance = axios.create({
        baseURL: url,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8',
        }
    });
    return axiosRequest;
}