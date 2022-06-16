import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { createGetRequest, createPostRequest } from "./RequestFactory";
import IRequestAttachment from "../interfaces/IRequestAttachment";
import UserAuthDTO from "../model/DTO/request/UserAuthDTO";
import store from "../store/store";
class ApiRequests {
    private state = store.getState();
    private readonly getResource: string = 'http://localhost:8080/public/v1/resources/';
    public getItem(id: string, attachment: IRequestAttachment): void {
        const promise = createGetRequest('http://localhost:8080/public/v1/item', this.state.jwtToken).get(`?id=${id}`);
        this.promiseHandler(promise, attachment);
    }
    public getItemList(searchParams: URLSearchParams, attachment: IRequestAttachment, config?: AxiosRequestConfig): void {
        const promise = createGetRequest('http://localhost:8080/public/v1/catalog/items', this.state.jwtToken).get(`?${searchParams}`, config);
        this.promiseHandler(promise, attachment);
    }
    public getRarities(attachment: IRequestAttachment, config?: AxiosRequestConfig): void {
        const promise = createGetRequest('http://localhost:8080/public/v1/catalog/rarities', this.state.jwtToken).get('', config);
        this.promiseHandler(promise, attachment);
    }
    public addItem(data: any, attachment: IRequestAttachment, config?: AxiosRequestConfig): void {
        const promise = createPostRequest('http://localhost:8080/admin/v1/create/item', this.state.jwtToken).post('', data, config);
        this.promiseHandler(promise, attachment);
    }
    public logIn(data: UserAuthDTO, attachment: IRequestAttachment, config?: AxiosRequestConfig) {
        const promise = createPostRequest('http://localhost:8080/common/v1/authorization/authorize', this.state.jwtToken).post('', data, config);
        this.promiseHandler(promise, attachment);
    }
    public testAuthorization = () => {
        const promise = createGetRequest('http://localhost:8080/admin/v1/test', this.state.jwtToken).get('');
        promise.then((axiosResponse: AxiosResponse) => {
            console.log(axiosResponse);
        }).catch((axiosError: AxiosError) => {
            console.log(axiosError);
        });
    }

    public getImageURL(itemImageUrl?: string): string {
        return this.getResource + "image/" + itemImageUrl;
    }
    public updateJWT() {
        this.state = store.getState();
    }

    private promiseHandler(promise: Promise<AxiosResponse<any, any>>, attachment: IRequestAttachment) {
        promise.then((axiosResponse: AxiosResponse) => {
            attachment.onSuccess(axiosResponse);
        }).catch((axiosError: AxiosError) => {
            this.catchHandler(axiosError, attachment.onError);
        });
    }
    private catchHandler(axiosError: AxiosError, overrideFunction?: CallableFunction) {
        if (overrideFunction === undefined) {
            console.log(axiosError.message);
        }
        else {
            overrideFunction(axiosError);
        }
    }
}
export const apiRequests: ApiRequests = new ApiRequests();