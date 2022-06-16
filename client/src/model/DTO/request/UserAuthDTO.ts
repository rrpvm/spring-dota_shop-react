export default class UserAuthDTO {
    public readonly username: string;
    public readonly password: string;
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}