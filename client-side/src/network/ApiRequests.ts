import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { createGetRequest } from "./RequestFactory";
class ApiRequests {
    private getItemsLengthReq = createGetRequest('http://localhost:8080/items/length?', '');
    private getRarityListReq = createGetRequest('http://localhost:8080/rarities', '');
    public getProductsLength(searchParams: URLSearchParams, onSuccess: (param: number) => void, onError?: () => void, config?: AxiosRequestConfig): void {
        const promise = this.getItemsLengthReq.get(`${searchParams}`, config);
        promise.then((axiosResponse: AxiosResponse) => {
            onSuccess(axiosResponse.data);
        }).catch((axiosError: AxiosError) => {
            this.catchHandler(axiosError, onError);
        });
    }
    public getRarityList(onSuccess: (param: any) => void, onError?: () => void, config?: AxiosRequestConfig): void {
        const promise = this.getRarityListReq.get('', config);
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