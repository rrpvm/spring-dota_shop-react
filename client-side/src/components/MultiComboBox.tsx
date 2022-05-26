import { useState } from 'react';
import { IMultiComboBoxProp } from '../interfaces/IMultiComboBoxProp';
import '../styles/multi_combo.css'
export const MultiComboBox: React.FC<IMultiComboBoxProp> = ({ selectedItems, allVariants, selectItemCallback }) => {
    const [searchText, setSearchText] = useState<string>('');
    const [inputOpened, setInputOpened] = useState<boolean>(false);
    const onInputOpen = () => { setInputOpened(true) }
    const onInputClosed = () => { setInputOpened(false) }//небольшая задержка
    const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.currentTarget.value.trim().toLocaleLowerCase());
    }
    return (
        <div className='multi-combo-box'>
            <div className='multi-combo-chosen'>
                {
                    selectedItems?.map((item) => {
                        return (
                            <div className='multi-combo-chosen-element' key={item}>
                                <span className='multi-combo-chosen-item'>{item}</span>
                                <span className='multi-combo-delete-button' onClick={() => console.log('close')}>&#215;</span>
                            </div>
                        )
                    })
                }
                <div className='multi-combo-search'>
                    <input type="text" autoComplete='false' placeholder='search for...' onChange={onSearchInput} onFocus={onInputOpen}></input>
                    <div className={'multi-combo-close' + (inputOpened ? ' close-reversed' : ' ')} onClick={onInputClosed}></div>
                </div>
            </div>
            <div className={'multi-combo-variants'.concat(((searchText.length > 0 || inputOpened) && selectedItems.length !== allVariants.length && allVariants.length !== 0) ? ' multi-combo-active' : '')}>
                <div className='multi-combo-variants-wrapper' onClick={() => { console.log('touch') }}>
                    {
                        allVariants?.filter(element => element.toLocaleLowerCase().indexOf(searchText) !== -1 || searchText === '')?.map(item => {
                            return <div className={'multi-combo-item-variant' + (selectedItems.filter(_item => _item === item).length !== 0 ? ' multi-variant-disabled' : ' ')} key={item} onClick={() => { selectItemCallback(item) }}>{item}</div>
                        })
                    }
                </div>
            </div>
        </div>
    );
}