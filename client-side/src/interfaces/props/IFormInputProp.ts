export default interface IFormInputProp {
    label? : string;
    placeholder? : string;
    inputType?: string;
    data?: any;
    bindCallback?: CallableFunction;
}