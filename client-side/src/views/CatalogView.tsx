import '../styles/views/catalog.css'
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MultiComboBox } from "../components/comboboxes/MultiComboBox";
import { SortBar } from '../components/bars/SortBar';
import { apiRequests } from '../network/ApiRequests';
import ItemViewDTO from '../model/DTO/response/ItemViewDTO';
import ItemPreview from '../components/singletons/ItemPreview';
import RarityInfoDTO from "../model/DTO/RarityInfoDTO";
import MultiComboBoxItem from '../model/MultiComboBoxItem';
import SortBarItem from '../model/SortBarItem';
import { AxiosResponse } from 'axios';


export const CatalogView = (): JSX.Element => {
    const sortTypes: SortBarItem[] = [
        new SortBarItem(() => {
            console.log('amount')
        }, "amount"),
        new SortBarItem(() => {
            console.log('price')
        }, "price"),
        new SortBarItem(() => {
            console.log('name')
        }, "name"),
    ]
    const [searchParams, setSearchParams] = useSearchParams();
    /*<MULTOBOX RARITY DATA>*/
    const [rarityOnSelection, setSelectedRarities] = useState<MultiComboBoxItem[]>([]);//selected
    const [rarityList, setRarityList] = useState<RarityInfoDTO[]>([]);//alllist
    /*</MULTIBOX RARITY DATA>*/
    /*<html component's states>*/
    const [isSearchFocused, setSearchFocused] = useState(false);
    const [itemNameFilter, setItemNameFilter] = useState<string>('');
    /*</html component's states>*/
    const [items, setItems] = useState<ItemViewDTO[]>([]);
    useEffect(() => {
        if (itemNameFilter.length === 0) updateNameFilterParams()
    }, [itemNameFilter]);
    useEffect(() => {
        apiRequests.getItemList(searchParams, { onSuccess: onSuccessItemListFetch })
    }, [searchParams]);//or [rarirityOnSelection]
    useEffect(() => {
        setSearchParams({});
        apiRequests.getRarities({ onSuccess: onSuccessRarityListFetch });
    }, []);
    const onSearchFocused = () => setSearchFocused(true);
    const onSearchBlured = () => setSearchFocused(false);
    const onItemSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => setItemNameFilter(e.currentTarget.value);
    const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code !== 'Enter') return;
        updateNameFilterParams();
    }
    const onRarityItemChange = (newRarities: MultiComboBoxItem[]) => {
        setSelectedRarities(newRarities);
        let mutableParams = searchParams;
        mutableParams.delete('rarity');
        newRarities.forEach((rarity: MultiComboBoxItem) => mutableParams.append('rarity', rarity.text));
        setSearchParams(mutableParams);
    }
    const updateNameFilterParams = () => {
        let mutable: URLSearchParams = searchParams;
        mutable.delete('name');
        mutable.append('name', itemNameFilter);
        setSearchParams(mutable);
    }
    const onSuccessItemListFetch = (response: AxiosResponse) => setItems(response.data);
    const onSuccessRarityListFetch = (response: AxiosResponse) => setRarityList(response.data);
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
                        allVariants={rarityList?.map(item => new MultiComboBoxItem(item.id, item.rarity))}
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
                            items?.length > 0 && items?.map((item: ItemViewDTO) => {
                                return <ItemPreview itemId={item.itemId} imageURL={item.itemImageURL} itemName={item.itemName}
                                    itemPrice={item.itemPrice} key={item.itemId}></ItemPreview>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="catalog-footer">
                <div className="catalog-footer-body container">
                    <h2>Created by @rrpvm</h2>
                </div>
            </div>
        </div >
    )
};