import '../../styles/multi_combo.css'
import { useState } from 'react';
import { IMultiComboBoxProp } from '../../interfaces/props/IMultiComboBoxProp';
import MultiComboBoxItem from '../../model/MultiComboBoxItem';
export const MultiComboBox: React.FC<IMultiComboBoxProp> = ({ selectedItems, allVariants, dataBindCallback }) => {
    const [searchText, setSearchText] = useState<string>('');
    const [inputOpened, setInputOpened] = useState<boolean>(false);
    const onInputOpen = () => { setInputOpened(true) }
    const onInputStateSwitch = () => { setInputOpened(!inputOpened) }
    const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchText(e.currentTarget.value.trim().toLocaleLowerCase()); }
    const onDeleteItem = (id: number) => {
        let _new: MultiComboBoxItem[] = selectedItems.filter(item => item.id !== id);
        dataBindCallback(_new);
    }
    const onAddItem = (value: MultiComboBoxItem) => {
        let _new: MultiComboBoxItem[] = [...selectedItems, value];
        dataBindCallback(_new);
    }
    return (
        <div className='multi-combo-box'>
            <div className='multi-combo-chosen'>
                {
                    selectedItems?.map((item) => {
                        return (
                            <div className='multi-combo-chosen-element' key={item.id}>
                                <span className='multi-combo-chosen-item'>{item.text}</span>
                                <span className='multi-combo-delete-button' onClick={() => { onDeleteItem(item.id) }}>&#215;</span>
                            </div>
                        )
                    })
                }
                <div className='multi-combo-search'>
                    <input type="text" autoComplete='false' placeholder='search for...' onChange={onSearchInput} onFocus={onInputOpen}></input>
                    <div className={'multi-combo-switch' + (inputOpened ? ' switch-reversed' : ' ')} onClick={onInputStateSwitch}></div>
                </div>
            </div>
            <div className={'multi-combo-variants'.concat(((searchText.length > 0 || inputOpened) && selectedItems.length !== allVariants.length && allVariants.length !== 0) ? ' multi-combo-active' : '')}>
                <div className='multi-combo-variants-wrapper'>
                    {
                        allVariants?.filter(element => element.text.toLocaleLowerCase().indexOf(searchText) !== -1 || searchText === '')?.map(item => {
                            return <div className={'multi-combo-item-variant' + (selectedItems.filter(_item => _item.id === item.id).length !== 0 ? ' multi-variant-disabled' : ' ')} key={item.id} onClick={() => { onAddItem(item) }}>{item.text}</div>
                        })
                    }
                </div>
            </div>
        </div>
    );
}