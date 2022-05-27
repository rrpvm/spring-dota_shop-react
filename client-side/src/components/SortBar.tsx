import { useEffect } from 'react'
import { useState } from 'react'
import ISortBarProp from '../interfaces/ISortBarProp'
import SortBarItem from '../model/SortBarItem'
import '../styles/sortbar.css'
export const SortBar: React.FC<ISortBarProp> = ({ items }) => {
    const [currentSortSelection, setSort] = useState<SortBarItem | undefined>();
    const onSortSelect = (item: SortBarItem) => { setSort(item); }
    useEffect(() => { if (currentSortSelection !== undefined) currentSortSelection.sortFunction() }, [currentSortSelection]);//
    useEffect(() => { if (items.length > 0 && currentSortSelection === undefined) setSort(items[0]); }, []);
    return (
        <div className='sortbar-wrapper'>
            <div className='sortbar-sort-item'>sort by:</div>
            {
                items?.map((item: SortBarItem) => {
                    return <div className={'sortbar-sort-item' + (currentSortSelection?.name === item.name ? ' sort-item-active' : '')} onClick={() => { onSortSelect(item) }} key={item.name} > {item.name}</div>
                })
            }
        </div >
    )
}