import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemViewDTO from "../model/DTO/response/ItemViewDTO";

const ItemPage: React.FC = () => {
    const params = useParams();
    const [itemData, setItemData] = useState<ItemViewDTO>();
    const [requestStatus, setRequestStatus] = useState<number>(200);
    const navigate = useNavigate();
    useEffect(() => {
        onLoad();
    }, []);
    const onNotElementFound = () => {
        navigate('/404page');
    }
    const onLoad = () => {
        const response = axios.get(`http://localhost:8080/item?id=${params.id}`);
        response.then((data: AxiosResponse) => {
            if (data.status === 204) {
                onNotElementFound();
            }
            else setItemData(data.data);
        });
    }
    return (
        <>
            <span>{itemData?.itemHero}</span>
        </>
    );
}
export default ItemPage;