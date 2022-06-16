import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AxiosError, AxiosResponse } from "axios";
import { publicApiRequests } from "../network/request/PublicApiRequests";
import UserAuthDTO from "../model/DTO/request/UserAuthDTO";
import '../style/views/authorization.css'



const AuthorizationView: React.FC = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [is_sign_up, setMode] = useState<boolean>(false);
    const onDidMount = () => {
        if (searchParams.get('sign_up') !== null) {
            setMode(true);
        }
        else setMode(false);
    }
    useEffect(() => {
        onDidMount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);
    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);
    const onAuthorizeSuccess = async (response: AxiosResponse) => {
        alert('success');
        dispatch({ type: "SET_TOKEN", data: response.data });
    }
    const onAuthorizeFail = (error: AxiosError) => alert('authorization failed -> bad credintials');
    const onRegistrationFail = (error: AxiosError) => alert(error.code !== "400" ? "invalid data" : "user already exist");
    const onLogIn = (e: React.FormEvent) => {
        e.preventDefault();
        publicApiRequests.logIn(new UserAuthDTO(username, password), { onSuccess: onAuthorizeSuccess, onError: onAuthorizeFail });
    }
    const onRegistration = (e: React.FormEvent) => {
        e.preventDefault();
        publicApiRequests.signUp(new UserAuthDTO(username, password), { onSuccess: onAuthorizeSuccess, onError: onRegistrationFail });
    }
    const loginFrame = () =>
    (
        <div className="auth-form-container">
            <form onSubmit={onLogIn} className="authorization-form">
                <input placeholder="username" type="text" autoComplete="false" value={username} onChange={onUsernameChange} className="auth-input"></input>
                <input placeholder="password" type="password" value={password} onChange={onPasswordChange} className="auth-input"></input>
                <button type="submit" className="auth-submit">Log In</button>
            </form>
        </div>
    );
    const registrationFrame = () => (
        <div className="auth-form-container">
            <form onSubmit={onRegistration} className="authorization-form">
                <input placeholder="username" type="text" autoComplete="false" value={username} onChange={onUsernameChange} className="auth-input"></input>
                <input placeholder="password" type="password" value={password} onChange={onPasswordChange} className="auth-input"></input>
                <button type="submit" className="auth-submit">Sign Up</button>
            </form>
        </div>
    )
    return (
        is_sign_up === true ? registrationFrame() : loginFrame()
    );

}
export default AuthorizationView