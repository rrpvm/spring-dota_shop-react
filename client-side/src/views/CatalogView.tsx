import axios, { AxiosError, AxiosResponse } from "axios";
import { ReactNode } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import CheckBoxList from "../components/CheckBoxList";
import { ItemColumnGroup } from "../components/ItemColumnGroup";
import CheckBoxListPropAdapter from "../model/CheckBoxListPropAdapter";
import ItemRarityDTO from "../model/ItemRarityDTO";

export const CatalogView = (): JSX.Element => {
    const [itemsLength, setItemLength] = useState(0);
    const [itemsRarity, setItemsRarity] = useState<ItemRarityDTO[]>([]);
    useEffect(() => {
        axios.get("http://localhost:8080/items_length").then((response: AxiosResponse) => {//get filtered length
            setItemLength(response.data);
        }).catch((error: AxiosError) => {
            console.log(error.message);
        });

        axios.get("http://localhost:8080/items_rarity").then((response: AxiosResponse) => {
            setItemsRarity(response.data);
        }).catch((error: AxiosError) => {
            console.log(error.message);
        });

    }, []);
    const insertRarityCheckBoxList = () => {
        if (itemsRarity.length === 0) {
            return <></>;
        }
        const list: CheckBoxListPropAdapter[] = itemsRarity.map((item : ItemRarityDTO) => {
            return CheckBoxListPropAdapter.build(item);
        });
        return <CheckBoxList items={list} title={"Rarity"}></CheckBoxList>
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
    return (
        <Container style={{ display: "flex", flexDirection: "row" }}>
            <div className="filter-block">
                <div className="filter-property">
                    {insertRarityCheckBoxList()}
                </div>

                <div className="filter-property">item hero</div>
            </div>
            <div className="items-block">
                {
                    insertItemColumnGroup()
                }

            </div>
        </Container>
    )
};