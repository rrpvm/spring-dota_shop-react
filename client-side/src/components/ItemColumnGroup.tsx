import { useEffect } from "react";
import { ItemColumn } from "./ItemColumn";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import ItemData from "../interfaces/ItemData";
interface IColumnGroupData {
    data_count: number
}
export const ItemColumnGroup = (prop: IColumnGroupData): JSX.Element => {
    const [data, setData] = useState<ItemData[]>([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/get_items/${prop.data_count}`).then((response: AxiosResponse) => {
            setData(response.data);
        }).catch((error: AxiosError) => {
            console.log(error.message);
        });
    }, []);
    return (
        <div className="item-block-list">
            {
                data.map((sell_item: ItemData) => {
                    return <ItemColumn key={sell_item.itemId}
                        itemImage={sell_item.itemImage}
                        itemName={sell_item.itemName}
                        itemRarity={sell_item.itemRarity}
                        itemHero={sell_item.itemHero}
                        itemPrice={sell_item.itemPrice}
                        itemsAvaliable={sell_item.itemsAvaliable}
                        itemId={sell_item.itemId}></ItemColumn>
                })
            }
        </div>
    );
}