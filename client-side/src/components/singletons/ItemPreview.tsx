import '../../styles/components/item_preview.css'
import ItemPreviewProp from "../../interfaces/props/ItemPreviewProp";
import { Link } from 'react-router-dom';

const ItemPreview: React.FC<ItemPreviewProp> = ({ itemId, itemName, itemPrice, imageURL }) => {
    return (
        <Link to={`/item/${itemId}`} className='item-preview-container'>
            <div className='item-preview'>
                <div className='item-image'><img src={`http://localhost:8080/resources/static/images/${imageURL}`} /></div>
                <div className='item-price'><span>{itemPrice + " $"}</span></div>
                <div className='item-name'>{itemName}</div>
            </div>
        </Link >

    );
}
export default ItemPreview;