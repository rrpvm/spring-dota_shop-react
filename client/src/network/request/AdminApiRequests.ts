import { AxiosRequestConfig } from "axios";
import { getRequest, postRequest, promiseHandler } from "../RequestUtility";
import IRequestAttachment from "../../interface/IRequestAttachment";
class AdminApiRequests {
    public addItem(data: any, attachment: IRequestAttachment, config?: AxiosRequestConfig): void {
        const promise = postRequest('http://localhost:8080/admin/v1/create/item').post('', data, config);
        promiseHandler(promise, attachment);
    }
}
export const adminApiRequests: AdminApiRequests = new AdminApiRequests();