import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { encodeImageFileAsURL } from "../utilities/ImageConverter";
import { Alert } from "../components/alerts/Alert";
import axios from "axios";
import ItemCreateDTO from "../model/DTO/request/ItemCreateDTO";
/***/
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form"
export const CreateItemView: React.FC = () => {
    const [itemName, setItemName] = useState<string>('');
    const [itemHero, setItemHero] = useState<string>('');
    const [itemRarity, setItemRarity] = useState<string>('');
    const [itemPrice, setItemPrice] = useState<string>('');//parse
    const [itemAvaliable, setItemAvaliable] = useState<number>(0);
    // const [itemImageData, setImageData] = useState<string>('');
    const [itemImageData, setImageData] = useState<File | null>(null);
    const [serverMessage, setServerMessage] = useState<string>('success');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (itemImageData === null) return;
        const newItem: ItemCreateDTO = new ItemCreateDTO(itemName, itemHero, itemRarity, parseFloat(itemPrice), itemAvaliable);
        const formData = new FormData();
        formData.append('file_image', itemImageData);
        formData.append('item_data', new Blob([JSON.stringify(newItem)], {
            type: "application/json"
        }));
        axios.post("http://localhost:8080/admin/item", formData, {
            headers:{
                "Content-type":"application/json",
            }
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
    const handleFileInput = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.files === null) return;
        setImageData(e.currentTarget.files[0]);
    }
    return (
        <>
            {serverMessage.length > 0 && <Alert>{serverMessage}</Alert>}
            < div className="item-create-block" >

                <form className="item-create-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <Form.Label>выберите изображение предмета</Form.Label>
                    <input className="form-control" type="file" onChange={handleFileInput} />
                    <img alt="preview :" src="f" />
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
            </div >
        </>
    );
}