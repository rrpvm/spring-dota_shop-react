import { AxiosError, AxiosResponse } from "axios";
import { createGetRequest, createPostRequest } from "./RequestFactory";
import IRequestAttachment from "../interface/IRequestAttachment";
import store from "../store/store";
const getResource: string = 'http://localhost:8080/public/v1/resources/';
const promiseHandler = (promise: Promise<AxiosResponse<any, any>>, attachment: IRequestAttachment) => {
    promise.then((axiosResponse: AxiosResponse) => {
        attachment.onSuccess(axiosResponse);
    }).catch((axiosError: AxiosError) => {
        catchHandler(axiosError, attachment.onError);
    });
}
const catchHandler = (axiosError: AxiosError, overrideFunction?: CallableFunction) => {
    if (overrideFunction === undefined) {
        console.log(axiosError.message);
    }
    else {
        overrideFunction(axiosError);
    }
}
const getRequest = (url: string) => {
    const state = store.getState();
    return createGetRequest(url, state.jwtToken);
}
const postRequest = (url: string) => {
    const state = store.getState();
    return createPostRequest(url, state.jwtToken);
}
const getImageURL = (itemImageUrl?: string): string => {
    return getResource + "image/" + itemImageUrl;
}
const getRole = async () => {
    const state = store.getState();
    return await createGetRequest('http://localhost:8080/public/v1/access/hasAccess', state.jwtToken).get('');
}

export { promiseHandler, catchHandler, getImageURL, getRole, getRequest, postRequest };