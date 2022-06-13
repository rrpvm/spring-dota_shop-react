
export const RequestMessageFactory = (status: number | undefined): string => {
    if (status === undefined) return "";
    let text: string = "";
    switch (status) {
        case 200: {
            text = "success"
            break;
        }
        case 204: {
            text = "no content"
            break;
        }
        case 401: {
            text = "unauthorized"
            break;
        }
        default: {
            text = "handle it";
            break;
        }
    }
    return text;
}