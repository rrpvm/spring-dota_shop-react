import '../styles/catalog.css'
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { apiRequests } from '../network/ApiRequests';
import { MultiComboBox } from "../components/MultiComboBox";
import { SortBar } from '../components/SortBar';
import RarityInfoDTO from "../model/RarityInfoDTO";
import IMultiComboBoxItem from '../model/IMultiComboBoxItem';
import SortBarItem from '../model/SortBarItem';
import ItemDTO from '../model/ItemDTO';



//useEffect(() => { let mutable: URLSearchParams = searchParams; mutable.delete('name'); mutable.append('name', itemNameFilter); setSearchParams(mutable); }, [itemNameFilter]);
export const CatalogView = (): JSX.Element => {
    const sortTypes: SortBarItem[] = [
        new SortBarItem(() => { console.log('amount') }, "amount"),
        new SortBarItem(() => { console.log('price') }, "price"),
        new SortBarItem(() => { console.log('name') }, "name"),
    ]
    const [searchParams, setSearchParams] = useSearchParams();
    /*<MULTOBOX RARITY DATA>*/
    const [rarityOnSelection, setSelectedRarities] = useState<IMultiComboBoxItem[]>([]);//selected
    const [rarityList, setRarityList] = useState<RarityInfoDTO[]>([]);//alllist
    /*</MULTIBOX RARITY DATA>*/
    /*<html component's states>*/
    const [isSearchFocused, setSearchFocused] = useState(false);
    const [itemNameFilter, setItemNameFilter] = useState<string>('');
    /*</html component's states>*/
    const [items, setItems] = useState<ItemDTO[]>([]);
    useEffect(() => { if (itemNameFilter.length === 0) updateNameFilterParams() }, [itemNameFilter]);
    useEffect(() => { apiRequests.getItems(searchParams, setItems) }, [searchParams]);//or [rarirityOnSelection]
    useEffect(() => { setSearchParams({}); apiRequests.getRarityList(setRarityList); }, []);
    const onSearchFocused = () => setSearchFocused(true);
    const onSearchBlured = () => setSearchFocused(false);
    const onItemSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => setItemNameFilter(e.currentTarget.value);
    const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code !== 'Enter') return;
        updateNameFilterParams();
    }
    const onRarityItemChange = (newRarities: IMultiComboBoxItem[]) => {
        setSelectedRarities(newRarities);
        let mutableParams = searchParams;
        mutableParams.delete('rarity');
        newRarities.forEach((rarity: IMultiComboBoxItem) => mutableParams.append('rarity', rarity.text));
        setSearchParams(mutableParams);
    }
    const updateNameFilterParams = () => {
        let mutable: URLSearchParams = searchParams;
        mutable.delete('name');
        mutable.append('name', itemNameFilter);
        setSearchParams(mutable);
    }
    return (
        <div className="catalog-wrapper">
            <div className="container">
                <div className="catalog-left">
                    <div className={(isSearchFocused ? "active-search " : "") + "catalog-left-search"}>
                        <input type="text" placeholder="поиск по названию" value={itemNameFilter}
                            onFocus={onSearchFocused}
                            onBlur={onSearchBlured}
                            onChange={onItemSearchChanged}
                            onKeyDown={onSearchKeyDown}></input>
                    </div>
                    <h2 style={{ color: "white" }}>Rarity</h2>
                    <MultiComboBox
                        selectedItems={rarityOnSelection}
                        allVariants={rarityList?.map(item => new IMultiComboBoxItem(item.id, item.rarity))}
                        dataBindCallback={onRarityItemChange}
                    ></MultiComboBox>
                    <div></div>
                </div>
                <div className="catalog-right">
                    <div className="catalog-sort">
                        <SortBar items={sortTypes}></SortBar>
                    </div>
                    <div className="catalog-items">
                        {
                            items?.length > 0 && items?.map((item: ItemDTO, index) => {
                                return <div key={index}>{item.itemName}</div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="catalog-footer">
                <div className="catalog-footer-body container">
                    <h2>Created by @rrpvm</h2>
                    <h3>26.05.2022</h3>
                    <h3>26.05.2022</h3>
                    <h3>26.05.2022</h3>
                    <h3>26.05.2022</h3>
                </div>
            </div>
        </div >
    )
};