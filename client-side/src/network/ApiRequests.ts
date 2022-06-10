import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { createGetRequest, createPostRequest } from "./RequestFactory";
import IRequestAttachment from "../interfaces/IRequestAttachment";
class ApiRequests {
    private getItemListRequest = createGetRequest('http://localhost:8080/public/v1/items', 'literaturnoe slovo');
    private getItemRequest = createGetRequest('http://localhost:8080/public/v1/item', 'literaturnoe slovo');
    private getRaritiesRequest = createGetRequest('http://localhost:8080/public/v1/rarities', 'literaturnoe slovo');
    private addItemRequest = createPostRequest('http://localhost:8080/admin/v1/item', 'literaturnoe slovo');
    public getItem(id: string, attachment: IRequestAttachment): void {
        const promise = this.getItemRequest.get(`?id=${id}`);
        this.promiseHandler(promise, attachment);
    }
    public getItemList(searchParams: URLSearchParams, attachment: IRequestAttachment, config?: AxiosRequestConfig): void {
        const promise = this.getItemListRequest.get(`?${searchParams}`, config);
        this.promiseHandler(promise, attachment);
    }
    public getRarities(attachment: IRequestAttachment, config?: AxiosRequestConfig): void {
        const promise = this.getRaritiesRequest.get('', config);
        this.promiseHandler(promise, attachment);
    }
    public addItem(data: any, attachment: IRequestAttachment, config?: AxiosRequestConfig): void {
        const promise = this.addItemRequest.post('', data, config);
        this.promiseHandler(promise, attachment);
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