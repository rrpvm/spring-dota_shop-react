import '../styles/catalog.css'
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { apiRequests } from '../network/ApiRequests';
import { MultiComboBox } from "../components/MultiComboBox";
import RarityInfoDTO from "../model/RarityInfoDTO";
import IMultiComboBoxItem from '../model/IMultiComboBoxItem';




export const CatalogView = (): JSX.Element => {
    const [searchParams, setSearchParams] = useSearchParams();
    /*<MULTOBOX RARITY DATA>*/
    const [rarityOnSelection, setSelectedRarities] = useState<IMultiComboBoxItem[]>([]);//selected
    const [rarityList, setRarityList] = useState<RarityInfoDTO[]>([]);//alllist
    /*</MULTIBOX RARITY DATA>*/
    /*<html component's states>*/
    const [isSearchFocused, setSearchFocused] = useState(false);
    /*</html component's states>*/
    const [itemsLength, setItemLength] = useState(0);
    useEffect(() => { apiRequests.getProductsLength(searchParams, setItemLength) }, [searchParams]);//or [rarirityOnSelection]
    useEffect(() => { setSearchParams({}); apiRequests.getRarityList(setRarityList); }, []);
    const onSearchFocused = () => setSearchFocused(true);
    const onSearchBlured = () => setSearchFocused(false);
    const onRarityItemChange = (newRarities: IMultiComboBoxItem[]) => { setSelectedRarities(newRarities); }
    return (
        <div className="catalog-wrapper">
            <div className="container">
                <div className="catalog-left">
                    <div className={(isSearchFocused ? "active-search " : "") + "catalog-left-search"}><input type="text" placeholder="поиск по названию" onFocus={onSearchFocused} onBlur={onSearchBlured}></input></div>
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

                    </div>
                    <div className="catalog-items">
                        <div>a</div>
                        <div>b</div>
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