import axios, { AxiosInstance } from "axios"

export const createGetRequest = (url: string, token: string): AxiosInstance => {
    const axiosRequest: AxiosInstance = axios.create({
        baseURL: url,
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return axiosRequest;
}