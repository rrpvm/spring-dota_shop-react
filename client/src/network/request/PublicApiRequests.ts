import { AxiosRequestConfig } from "axios";
import { getRequest, postRequest, promiseHandler } from "../RequestUtility";
import IRequestAttachment from "../../interface/IRequestAttachment";
import UserAuthDTO from "../../model/DTO/request/UserAuthDTO";
class PublicApiRequests {
    public getItem(id: string, attachment: IRequestAttachment): void {
        const promise = getRequest('http://localhost:8080/public/v1/item').get(`?id=${id}`);
        promiseHandler(promise, attachment);
    }
    public getItemList(searchParams: URLSearchParams, attachment: IRequestAttachment, config?: AxiosRequestConfig): void {
        const promise = getRequest('http://localhost:8080/public/v1/catalog/items').get(`?${searchParams}`, config);
        promiseHandler(promise, attachment);
    }
    public getRarities(attachment: IRequestAttachment, config?: AxiosRequestConfig): void {
        const promise = getRequest('http://localhost:8080/public/v1/catalog/rarities').get(``, config);
        promiseHandler(promise, attachment);
    }
    public logIn(data: UserAuthDTO, attachment: IRequestAttachment, config?: AxiosRequestConfig) {
        const promise = postRequest('http://localhost:8080/public/v1/authorization/authorize').post('', data, config);
        promiseHandler(promise, attachment);
    }
    public signUp(data: UserAuthDTO, attachment: IRequestAttachment, config?: AxiosRequestConfig) {
        const promise = postRequest('http://localhost:8080/public/v1/authorization/registration').post('', data, config);
        promiseHandler(promise, attachment);
    }
    public logOut() {
        postRequest('http://localhost:8080/public/v1/authorization/logout').put('');
    }
    public testAuthorization = (attachment: IRequestAttachment) => {
        const promise = getRequest('http://localhost:8080/public/v1/access').get('hasAccess');
        promiseHandler(promise, attachment);
    }
}
export const publicApiRequests: PublicApiRequests = new PublicApiRequests();