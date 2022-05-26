import axios, { AxiosError, AxiosResponse } from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CheckBoxList from "../components/CheckBoxList";
import { ItemColumnGroup } from "../components/ItemColumnGroup";
import { MultiComboBox } from "../components/MultiComboBox";
import CheckBoxListProp from "../model/CheckBoxListProp";
import CheckBoxListPropAdapter from "../model/CheckBoxListPropAdapter";
import ItemRarityDTO from "../model/ItemRarityDTO";
import '../styles/catalog.css'

const getData = (setItemLengthCallback: CallableFunction, setItemsRarityCallback: CallableFunction, searchParams: URLSearchParams) => {
    axios.get(`http://localhost:8080/items_length?${searchParams}`).then((response: AxiosResponse) => {//get filtered length
        setItemLengthCallback(response.data);
    }).catch((error: AxiosError) => {
        console.log(error.message);
    });

    axios.get("http://localhost:8080/items_rarity").then((response: AxiosResponse) => {
        const dataProxy: ItemRarityDTO[] = response.data;
        setItemsRarityCallback(dataProxy.map(item => CheckBoxListPropAdapter.build(item)));
    }).catch((error: AxiosError) => {
        console.log(error.message);
    });
}


export const CatalogView = (): JSX.Element => {
    const [itemsLength, setItemLength] = useState(0);
    const [itemsRarity, setItemsRarity] = useState<CheckBoxListProp[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isSearchFocused, setSearchFocused] = useState(false);
    const onSearchFocused = () => setSearchFocused(true);
    const onSearchBlured = () => setSearchFocused(false);
    useEffect(() => {
        setSearchParams({});//calls use effect with [searchParams] where calls GetData();
    }, []);

    useEffect(() => {
        getData(setItemLength, setItemsRarity, searchParams);
    }, [searchParams]);

    const insertRarityCheckBoxList = () => {
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
    }
    const handleRarityPicked = (bChecked: boolean, item: CheckBoxListPropAdapter): void => {
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
    }
    return (
        <div className="catalog-wrapper">
            <div className="container">
                <div className="catalog-left">
                    <div className={(isSearchFocused ? "active-search " : "") + "catalog-left-search"}><input type="text" placeholder="поиск по названию" onFocus={onSearchFocused} onBlur={onSearchBlured}></input></div>
                    <h2 style={{color:"white"}}>Rarity</h2>
                    <MultiComboBox></MultiComboBox>
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

