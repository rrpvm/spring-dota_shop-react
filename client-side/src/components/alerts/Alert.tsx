import { PropsWithChildren } from "react";
interface IProp {

}
export const Alert: React.FC<PropsWithChildren<IProp>> = ({ children }) => {
    return (
        <div className="alert-message alert alert-success show-alert">{children}</div>
    );
}