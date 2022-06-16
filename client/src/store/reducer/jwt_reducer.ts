export interface jwtState {
    jwtToken: string,
}
type Action = {
    type: string,
    data: string,
}
export const jwtReducer = (prevState: jwtState = { jwtToken: "" }, action: Action) => {
    switch (action.type) {
        case "SET_TOKEN": {
            return { prevState, jwtToken: action.data };
        }
        case "GET_TOKEN": {
            return prevState;
        }
        default: {
            return prevState;
        }
    }
}