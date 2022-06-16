import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { publicApiRequests } from "../network/request/PublicApiRequests";
import UserAuthDTO from "../model/DTO/request/UserAuthDTO";
import '../style/views/authorization.css'
const AuthorizationView: React.FC = () => {
    useEffect(() => {

    }, []);
    const onDidMount = () => {
        //test user or not
    }
    const disp = useDispatch();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const onAuthorizeSuccess = (response: AxiosResponse) => {
        disp({ type: "SET_TOKEN", data: response.data });
        publicApiRequests.testAuthorization({
            onSuccess: (response: AxiosResponse) => {
                const role: { role: { authority: string }[] } = response.data;
                alert(role.role[0].authority);
            }
        });
    }
    const onAuthorizeFail = (error: AxiosError) => alert('incorrect data');
    const onLogIn = (e: React.FormEvent) => {
        e.preventDefault();
        publicApiRequests.logIn(new UserAuthDTO(username, password), { onSuccess: onAuthorizeSuccess, onError: onAuthorizeFail, });
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