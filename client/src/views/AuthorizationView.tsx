import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserAuthDTO from "../model/DTO/request/UserAuthDTO";
import { apiRequests } from "../network/ApiRequests";

const AuthorizationView: React.FC = () => {

    useEffect(() => {

    }, []);
    const onDidMount = () => {

    }
    const disp = useDispatch();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const onAuthorize = (response: AxiosResponse) => {
        disp({ type: "SET_TOKEN", data: response.data });
        apiRequests.updateJWT();
        apiRequests.testAuthorization();
    }
    const onAuthorizeFail = (error: AxiosError) => {
        console.log(error);
    }
    const onLogIn = (e: React.FormEvent) => {
        e.preventDefault();
        apiRequests.logIn(new UserAuthDTO(username, password), { onSuccess: onAuthorize, onError: onAuthorizeFail, });
    }
    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);
    const loginFrame = () =>
    (
        <div>
            <form onSubmit={onLogIn}>
                <input placeholder="username" type="text" autoComplete="false" value={username} onChange={onUsernameChange}></input>
                <input placeholder="password" type="password" value={password} onChange={onPasswordChange}></input>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
    const registrationFrame = () => {
        return <></>
    }
    return loginFrame();
}
export default AuthorizationView