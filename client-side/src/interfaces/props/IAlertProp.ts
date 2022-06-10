export default interface IAlertProp {
    type: string;
    active: boolean;
    closeCallback: (timeout: number) => void;
}