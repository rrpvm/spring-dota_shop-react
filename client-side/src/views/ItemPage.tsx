import '../styles/views/item_page.css'
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemViewDTO from "../model/DTO/response/ItemViewDTO";
const ItemPage: React.FC = () => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [itemData, setItemData] = useState<ItemViewDTO>();
    useEffect(() => {
        onLoad();
    }, []);
    const onNotElementFound = () => navigate('/404page');
    const onLoad = () => {
        const response = axios.get(`http://localhost:8080/item?id=${urlParams.id}`);
        response.then((data: AxiosResponse) => {
            if (data.status === 204) {
                onNotElementFound();
            }
            else setItemData(data.data);
        });
    }
    const mainFrame = () => {
        return (
            <div className="item-container">
                <div className='item-page-header'>
                    <div className='item-header-left'>
                        <img src={`http://localhost:8080/resources/static/images/${itemData?.itemImageURL}`} alt=""></img>
                        <span className='card-item'>{itemData?.itemPrice} $</span>
                        <div className='card-item'>
                            <div className='buy-button'>Buy Item</div>
                            <a href='#' className='buy-icon-container'>
                                <span className='buy-icon'></span>
                            </a>
                        </div>
                        <span className='card-item'>in cart : 0</span>
                    </div>
                    <div className='item-header-right'>
                        <div>{itemData?.itemName}</div>
                        <div>{itemData?.itemHero}</div>
                        <div>{itemData?.itemHero}</div>{/*item description */}
                    </div>
                </div>
                <div className='item-page-body'>
                    {
                        /* graphics */
                    }
                </div>
                <div className='item-page-footer'>
                    {
                        /*history buys */
                    }
                </div>
            </div>
        )
    }
    return (itemData === undefined ? <></> : mainFrame());
}
export default ItemPage;