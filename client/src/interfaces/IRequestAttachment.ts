import { AxiosError, AxiosResponse } from "axios";

export default interface IRequestAttachment {
    onSuccess: (response: AxiosResponse) => void;
    onError?: (error: AxiosError) => void;
}