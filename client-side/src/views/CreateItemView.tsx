import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form"
import { encodeImageFileAsURL } from "../utilities/ImageConverter";
import ItemDTO from "../model/ItemDTO";

export const CreateItemView = () => {
    const [itemName, setItemName] = useState<string>('');
    const [itemImage, setItemImage] = useState<string>('');
    const [itemHero, setItemHero] = useState<string>('');
    const [itemRarity, setItemRarity] = useState<string>('');
    const [itemPrice, setItemPrice] = useState<string>('');//parse
    const [itemAvaliable, setItemAvaliable] = useState<number>(0);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const item : ItemDTO = new ItemDTO(itemName, itemImage, itemHero, itemRarity, parseFloat(itemPrice), itemAvaliable);
        axios.post("http://localhost:8080/admin/item", item).then((response: AxiosResponse) => {
            console.log(item.itemsAvaliable);
        }).catch((error: AxiosError) => {
            console.log(error.message);
        });
    };
    const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const txt: string = e.currentTarget.value;
            if (txt.length === 0) {
                setItemPrice(e.currentTarget.value);
                return;
            }
            const regex = "[0-9.]";
            const lastInput = txt.charAt(txt.length - 1);
            const bCorrect = lastInput.match(regex);
            if (bCorrect !== undefined && bCorrect !== null) {
                setItemPrice(e.currentTarget.value);
            }
        }
        catch (exception) {
            console.log(exception);
        }
    };
    return (
        <div className="item-create-block">
            <form className="item-create-form" onSubmit={handleSubmit}>
                <Form.Label>выберите изображение предмета</Form.Label>
                <input className="form-control" type="file" onChange={
                    (e: React.FormEvent<HTMLInputElement>) => {
                        encodeImageFileAsURL(e, (result: string) => { setItemImage(result); });
                    }
                } />
                <img alt="preview :" src={itemImage} />
                <br></br>
                <Form.Label>Item's name</Form.Label>
                <Form.Control type="text" placeholder="Name" value={itemName} onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setItemName(e.currentTarget.value) }} />
                <Form.Label>Item's hero</Form.Label>
                <Form.Control type="text" placeholder="Hero" value={itemHero} onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setItemHero(e.currentTarget.value) }} />
                <Form.Label>Item's rarity</Form.Label>
                <Form.Control type="text" placeholder="Rarity" value={itemRarity} onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setItemRarity(e.currentTarget.value) }} />
                <Form.Label>Item's price</Form.Label>
                <Form.Control type="text" placeholder="Price" value={itemPrice} onInput={handlePriceInput} />
                <Form.Label>Item's avaliable</Form.Label>
                <Form.Control type="number" placeholder="Avaliable" style={{ marginBottom: "1rem" }} min={0} value={itemAvaliable} onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    try {
                        let tmp = parseInt(e.currentTarget.value);
                        if (isNaN(tmp) || tmp === undefined) return;
                        setItemAvaliable(tmp);
                    }
                    catch (exception) {
                        console.log(exception);
                    }
                }} />
                <Button variant="primary" type="submit">create</Button>
            </form>
        </div>
    );
}