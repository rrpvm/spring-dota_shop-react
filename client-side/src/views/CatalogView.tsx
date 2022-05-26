import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MultiComboBox } from "../components/MultiComboBox";
import RarityDataDTO from "../model/RarityInfoDTO";
import '../styles/catalog.css'

const getData = (setItemLengthCallback: CallableFunction, searchParams: URLSearchParams) => {
    axios.get(`http://localhost:8080/items_length?${searchParams}`).then((response: AxiosResponse) => {//get filtered length
        setItemLengthCallback(response.data);
    }).catch((error: AxiosError) => {
        console.log(error.message);
    });
}


export const CatalogView = (): JSX.Element => {
    const [rarityOnSelection, setSelectedRarities] = useState<string[]>([]);
    const [rarityList, setRarityList] = useState<RarityDataDTO[]>([]);




    const [itemsLength, setItemLength] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const [isSearchFocused, setSearchFocused] = useState(false);
    const onSearchFocused = () => setSearchFocused(true);
    const onSearchBlured = () => setSearchFocused(false);
    useEffect(() => {
        setSearchParams({});//calls use effect with [searchParams] where calls GetData();
        axios.get("http://localhost:8080/items_rarity").then((response: AxiosResponse) => {
            setRarityList(response.data);
        });
    }, []);

    useEffect(() => {
        getData(setItemLength, searchParams);
    }, [searchParams]);
    const onRarirityItemSelect = (itemName: string): void => {//мультибокс гарантирует уникальность выбора
        let mutableRarityList: string[] = [...rarityOnSelection, itemName];
        setSelectedRarities(mutableRarityList);
    }

    return (
        <div className="catalog-wrapper">
            <div className="container">
                <div className="catalog-left">
                    <div className={(isSearchFocused ? "active-search " : "") + "catalog-left-search"}><input type="text" placeholder="поиск по названию" onFocus={onSearchFocused} onBlur={onSearchBlured}></input></div>
                    <h2 style={{ color: "white" }}>Rarity</h2>
                    <MultiComboBox
                        selectedItems={rarityOnSelection}
                        allVariants={rarityList?.map(item => item.rarity)}
                        selectItemCallback={onRarirityItemSelect}
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

/*const insertRarityCheckBoxList = () => {
        if (itemsRarity.length === 0) {
            return <></>;
        }
        return <CheckBoxList items={itemsRarity} title={"Rarity"} onCheckboxStateChanged={handleRarityPicked}></CheckBoxList>
    }
    const insertItemColumnGroup = () => {
        let array: number[] = [];
        for (let i: number = 0; i < itemsLength; i += 3) {
            array.push(i);
        }
        return array.map((item) => {
            return (<ItemColumnGroup data_count={item} key={item}></ItemColumnGroup>);
        });
    }*/
/*const handleRarityPicked = (bChecked: boolean, item: CheckBoxListPropAdapter): void => {
    const oldValues: string[] = searchParams.getAll("rarity");
    let _newSearchParams = searchParams;
    if (bChecked) {
        _newSearchParams.append("rarity", item.name);
    }
    else {
        _newSearchParams.delete("rarity");//clear
        oldValues.forEach((str: string) => {
            if (str !== item.name) _newSearchParams.append("rarity", str);
        });
    }
    setSearchParams(_newSearchParams);
}*/