import '../../style/views/solo_item.css'
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { publicApiRequests } from '../../network/request/PublicApiRequests';
import { getImageURL } from '../../network/RequestUtility';
import ItemViewDTO from "../../model/DTO/response/ItemViewDTO";
import LoadingComponent from '../../component/singletons/LoadingComponent';
const ItemView: React.FC = () => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [itemData, setItemData] = useState<ItemViewDTO>();
    const [fetchStatus, setFetchStatus] = useState<number>(-1);
    useEffect(() => {
        onLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onNotElementFound = () => navigate('/404page');
    const onSuccessFetch = (response: AxiosResponse) => {
        setFetchStatus(response.status);
        if (response.status === 204) onNotElementFound();
        else setItemData(response.data);
    }
    const onErrorFetch = (error: AxiosError) => {
        if (error.message === 'Network Error') {
            navigate('/error_page/500');
        }
        else onNotElementFound()
    }
    const onLoad = () => {
        if (urlParams.id === undefined) return onNotElementFound();
        publicApiRequests.getItem(urlParams.id, { onSuccess: onSuccessFetch, onError: onErrorFetch });
    }
    const fetchDataFrame = () => (<LoadingComponent></LoadingComponent>);
    const mainFrame = () => {
        return (
            <div className="item-container">
                <div className='item-page-header'>
                    <div className='item-header-left'>
                        <img src={getImageURL(itemData?.itemImageURL)} alt=""></img>
                        <span className='card-item' style={{ fontSize: "2rem" }}>{itemData?.itemPrice} $</span>
                        <div className='card-item'>
                            <div className='buy-button'>Buy Item</div>
                            <a href='/Users/kosta/Desktop/projects/react-spring-shop/client/public' className='buy-icon-container'>
                                <span className='buy-icon'></span>
                            </a>
                        </div>
                        <span className='card-item' style={{ fontSize: "0.70rem" }}>В корзине: {0} товаров данного предмета</span>
                    </div>
                    <div className='item-header-right'>
                        <div><h1>{itemData?.itemName}</h1></div>
                        <div><h2>{itemData?.itemHero}</h2></div>
                        <div>{itemData?.itemDescription}</div>
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
    return (fetchStatus === -1 ? fetchDataFrame() : mainFrame());
}
export default ItemView;