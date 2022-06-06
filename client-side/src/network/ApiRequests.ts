import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { createGetRequest } from "./RequestFactory";
import ItemViewDTO from "../model/DTO/response/ItemViewDTO";
class ApiRequests {
    private getItemsRequest = createGetRequest('http://localhost:8080/items', 'xuy');
    private getRarityListRequest = createGetRequest('http://localhost:8080/rarities', 'xuy');
    public getItems(searchParams: URLSearchParams, onSuccess: (param: ItemViewDTO[]) => void, onError?: () => void, config?: AxiosRequestConfig): void {
        const promise = this.getItemsRequest.get(`?${searchParams}`, config);
        promise.then((axiosResponse: AxiosResponse) => {
            onSuccess(axiosResponse.data);
        }).catch((axiosError: AxiosError) => {
            this.catchHandler(axiosError, onError);
        });
    }
    public getRarityList(onSuccess: CallableFunction, onError?: () => void, config?: AxiosRequestConfig): void {
        const promise = this.getRarityListRequest.get('', config);
        promise.then((axiosResponse: AxiosResponse) => {
            onSuccess(axiosResponse.data);
        }).catch((axiosError: AxiosError) => {
            this.catchHandler(axiosError, onError);
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