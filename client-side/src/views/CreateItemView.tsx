import '../styles/views/create_item_page.css'
import { useState } from "react";
import axios from "axios";
import { Alert } from "../components/alerts/Alert";
import { encodeImageFileAsURL } from "../utilities/ImageConverter";
import ItemCreateDTO from "../model/DTO/request/ItemCreateDTO";
import FormInput from '../components/singletons/FormInput';
import { json } from 'stream/consumers';

export const CreateItemView: React.FC = () => {
    const [itemName, setItemName] = useState<string>('');
    const [itemHero, setItemHero] = useState<string>('');
    const [itemRarity, setItemRarity] = useState<string>('');
    const [itemPrice, setItemPrice] = useState<string>('');//parse
    const [itemDescription, setItemDescription] = useState<string>('');
    const [itemAvaliable, setItemAvaliable] = useState<number>(0);
    const [itemImageData, setImageData] = useState<File | null>(null);
    const [imageBase64, setImagePreview] = useState<string>('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (itemImageData === null) return;
        const newItem: ItemCreateDTO = new ItemCreateDTO(itemName, itemHero, itemRarity, itemDescription, parseFloat(itemPrice), itemAvaliable);
        const formData = new FormData();
        formData.append('file_image', itemImageData);
        formData.append('item_data', new Blob([JSON.stringify(newItem)], {
            type: "application/json"
        }));
        axios.post("http://localhost:8080/admin/item", formData, {
            headers: {
                "Content-type": "application/json",
            }
        });
        console.log(JSON.stringify(newItem));
    };
    const handleFileInput = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.files === null) return;
        setImageData(e.currentTarget.files[0]);
        encodeImageFileAsURL(e, setImagePreview);
    };
    const onItemNameInput = (e: React.ChangeEvent<HTMLInputElement>) => setItemName(e.currentTarget.value);
    const onItemHeroInput = (e: React.ChangeEvent<HTMLInputElement>) => setItemHero(e.currentTarget.value);
    const onItemRarityInput = (e: React.ChangeEvent<HTMLInputElement>) => setItemRarity(e.currentTarget.value);
    const onItemDescriptionInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => setItemDescription(e.target.value);
    const onItemPriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        }
    };
    const onItemAvailableInput = (e: React.FormEvent<HTMLInputElement>) => {
        try {
            let tmp = parseInt(e.currentTarget.value);
            if (isNaN(tmp) || tmp === undefined) {
                setItemAvaliable(0);
                return;
            }
            setItemAvaliable(tmp);
        }
        catch (e) {

        }
    };
    return (
        <>
            <div className="item-create-block" >
                <form className="item-create-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <span>Выберите изображение предмета</span>
                    <input className="form-input" type="file" onChange={handleFileInput} />
                    {imageBase64.length > 0 ? <img alt="" src={imageBase64} className="image-creation-preview" /> : <></>}
                    <FormInput
                        data={itemName}
                        label="item's name"
                        inputType="text"
                        placeholder='name'
                        bindCallback={onItemNameInput}
                    ></FormInput>
                    <FormInput
                        data={itemHero}
                        label="item's hero"
                        inputType="text"
                        placeholder='hero'
                        bindCallback={onItemHeroInput}
                    ></FormInput>
                    <FormInput
                        data={itemRarity}
                        label="item's rarity"
                        placeholder='rarity'
                        inputType="text"
                        bindCallback={onItemRarityInput}
                    ></FormInput>
                    <FormInput
                        data={itemPrice}
                        label="item's price"
                        inputType="text"
                        placeholder='0'
                        bindCallback={onItemPriceInput}
                    ></FormInput>
                    <FormInput
                        data={itemAvaliable}
                        label="item's available count"
                        inputType="text"
                        bindCallback={onItemAvailableInput}
                    ></FormInput>
                    <div style={{ width: "50%", height: "1px", opacity: "0" }}></div>
                    <textarea value={itemDescription} onChange={onItemDescriptionInput} placeholder="description" />
                    <div style={{ width: "100%", height: "1px", opacity: "0" }}></div>
                    <button type='submit' className='form-submit-button'>create</button>
                </form>
            </div >
        </>
    );
}