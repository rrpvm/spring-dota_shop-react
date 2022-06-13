import '../../styles/components/alert.css'
import { PropsWithChildren } from "react";
import IAlertProp from '../../interfaces/props/IAlertProp';
export const Alert: React.FC<PropsWithChildren<IAlertProp>> = ({ children, type, active, closeCallback }) => {
    return (
        <div className='alert-container'>
            <div className={`alert ${type}`.concat(active ? " alert-active" : " hidden")}>
                <span>{children}</span>
                <div className='alert-close' onClick={() => closeCallback(-1)}>✖</div>
            </div>
        </div>
    );
}