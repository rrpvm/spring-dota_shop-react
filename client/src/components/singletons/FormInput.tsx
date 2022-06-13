import '../../styles/components/form_input.css'
import IFormInputProp from '../../interfaces/props/IFormInputProp';
const FormInput: React.FC<IFormInputProp> = ({ placeholder, label, data, inputType, bindCallback }) => {
    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (bindCallback !== undefined) bindCallback(e);
    }
    return (
        <div className='form-input-container'>
            <span>{label}</span>
            <input className='form-input' type={inputType} onInput={onInput} value={data} placeholder={placeholder}></input>
        </div>
    );
}
export default FormInput;