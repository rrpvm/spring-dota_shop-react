import axios, { AxiosInstance } from "axios"
//REST:GET,POST,DELETE,PUT
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
export const createPostRequest = (url: string, token: string): AxiosInstance => {
    const axiosRequest: AxiosInstance = axios.create({
        baseURL: url,
        method: 'post',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return axiosRequest;
}