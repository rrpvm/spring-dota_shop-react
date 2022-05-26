import '../styles/multi_combo.css'
export const MultiComboBox: React.FC = () => {
    return (
        <div className='multi-combo-box'>
            <div className='multi-combo-chosen'>
                <div className='multi-combo-chosen-element'>
                    <span className='multi-combo-chosen-item'>Common</span>
                    <span className='multi-combo-delete-button'>&#215;</span>
                </div>
                <input type="text" autoComplete='false' className='multi-combo-search' placeholder='search for...'></input>
            </div>
            <div className='multi-combo-variants'>
                <></>
                <></>
            </div>
        </div>
    );
}