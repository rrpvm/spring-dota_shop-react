import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form"
import { encodeImageFileAsURL } from "../utilities/ImageConverter";

export const CreateItemView = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('submit');
    };
    const [itemName, setItemName] = useState<string>('');
    const [itemHero, setItemHero] = useState<string>('');
    const [itemRarity, setItemRarity] = useState<string>('');
    const [itemPrice, setItemPrice] = useState<number>(0);
    const [itemAvaliable, setItemAvaliable] = useState<number>(0);
    return (
        <div className="item-create-block">
            <form className="item-create-form" onSubmit={handleSubmit}>
                <Form.Label>выберите изображение предмета</Form.Label>
                <input className="form-control" type="file" onChange={encodeImageFileAsURL} />
                <Form.Label>Item's name</Form.Label>
                <Form.Control type="text" placeholder="Name" value={itemName} onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setItemName(e.currentTarget.value) }} />
                <Form.Label>Item's hero</Form.Label>
                <Form.Control type="text" placeholder="Hero" value={itemHero} onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setItemHero(e.currentTarget.value) }} />
                <Form.Label>Item's rarity</Form.Label>
                <Form.Control type="text" placeholder="Rarity" value={itemRarity} onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setItemRarity(e.currentTarget.value) }} />
                <Form.Label>Item's price</Form.Label>
                <Form.Control type="number" placeholder="Price" min={0} value={itemPrice} onInput={
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                        try {
                            let tmp = parseFloat(e.currentTarget.value);
                            if(isNaN(tmp) || tmp === undefined)return;
                            setItemPrice(tmp);
                        }
                        catch (exception) {
                            console.log(exception);
                        }
                    }
                } />
                <Form.Label>Item's avaliable</Form.Label>
                <Form.Control type="number" placeholder="Avaliable" style={{ marginBottom: "1rem" }} min={0} value={itemAvaliable} onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        try {
                            let tmp = parseInt(e.currentTarget.value);
                            if(isNaN(tmp) || tmp === undefined)return;
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