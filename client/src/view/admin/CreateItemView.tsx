import '../../style/views/admin/create_item.css'
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { adminApiRequests } from "../../network/request/AdminApiRequests";
import { encodeImageFileAsURL } from "../../utility/ImageConverter";
import { Alert } from '../../component/alerts/Alert';
import { RequestMessageFactory } from '../../network/RequestMessageFactory';
import { useNavigate } from 'react-router-dom';
import { publicApiRequests } from '../../network/request/PublicApiRequests';
import ItemCreateDTO from "../../model/DTO/request/ItemCreateDTO";
import FormInput from '../../component/singletons/FormInput';


export const CreateItemView: React.FC = () => {
    const navigate = useNavigate();
    //<form data section start>
    const [itemName, setItemName] = useState<string>('');
    const [itemHero, setItemHero] = useState<string>('');
    const [itemRarity, setItemRarity] = useState<string>('');
    const [itemPrice, setItemPrice] = useState<string>('');//parse
    const [itemDescription, setItemDescription] = useState<string>('');
    const [itemAvaliable, setItemAvaliable] = useState<number>(0);
    const [itemImageData, setImageData] = useState<File | null>(null);
    //<form data section end>
    const [imageBase64, setImagePreview] = useState<string>('');//for preview
    const [formRequestStatus, setRequestStatus] = useState<AxiosResponse>();
    //
    let bForceClosedAlert = false;
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        closeAlertMessage(0);
        if (itemImageData === null) return;
        const newItem: ItemCreateDTO = new ItemCreateDTO(itemName, itemHero, itemRarity, itemDescription, parseFloat(itemPrice), itemAvaliable);
        const formData = new FormData();
        formData.append('file_image', itemImageData);
        formData.append('item_data', new Blob([JSON.stringify(newItem)], {
            type: "application/json"
        }));
        adminApiRequests.addItem(formData, { onSuccess: onCreateSuccess, onError: onCreateFailed });
    };
    const onCreateSuccess = (response: AxiosResponse) => {
        if (response.status === undefined) return;
        setRequestStatus(response);
        closeAlertMessage(4000);
    }
    const onCreateFailed = (error: AxiosError) => {
        if (error.response === undefined) return;
        setRequestStatus(error.response);
        closeAlertMessage(2000);
    }
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
    const closeAlertMessage = (timeout: number) => {
        if (timeout === -1) {
            setRequestStatus(undefined);
            bForceClosedAlert = true;
            setTimeout(() => { bForceClosedAlert = false; }, 4000);
            return;
        }
        if (bForceClosedAlert === true) {
            bForceClosedAlert = false;
            return;
        }
        setTimeout(() => setRequestStatus(undefined), timeout);
    }
    const onDidMount = () => {
        publicApiRequests.testAuthorization({
            onSuccess: (response: AxiosResponse) => {
                if (response.data !== "ADMIN_ROLE") {
                    navigate('/authorization')
                }
            },
            onError: () => navigate("/error_page/500")
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => onDidMount(), []);
    return (
        <>
            <Alert type={formRequestStatus?.status === 200 ? "success" : "failure"} active={formRequestStatus !== undefined} closeCallback={closeAlertMessage}>{RequestMessageFactory(formRequestStatus?.status)}</Alert>
            <div className="item-create-block" >
                <form className="item-create-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <span>Выберите изображение предмета</span>
                    <input className="form-input" type="file" onChange={handleFileInput} />
                    {
                        imageBase64.length > 0 ?
                            <div style={{ width: "100%" }}><img alt="" src={imageBase64} className="image-creation-preview" /></div> : <></>
                    }
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
                    <div style={{ width: "50%", maxHeight: "100px", display: "flex", flexDirection: "column" }}>
                        <span>Item's description</span>
                        <textarea value={itemDescription} onChange={onItemDescriptionInput} placeholder="description" style={{ height: "46px", padding: "5px 10px" }} />
                    </div>

                    <div style={{ width: "100%", height: "1px", opacity: "0" }}></div>
                    <button type='submit' className='form-submit-button'>create</button>
                </form>
            </div >
        </>
    );
}