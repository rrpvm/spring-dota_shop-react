import '../../style/components/item_preview.css'
import { Link } from 'react-router-dom';
import { getImageURL } from '../../network/RequestUtility';
import ItemPreviewProp from "../../interface/prop/ItemPreviewProp";
const ItemPreview: React.FC<ItemPreviewProp> = ({ itemId, itemName, itemPrice, imageURL }) => {
    return (
        <Link to={`/item/${itemId}`} className='item-preview-container'>
            <div className='item-preview'>
                <div className='item-image'><img src={getImageURL(imageURL)} /></div>
                <div className='item-price'><span>{itemPrice + " $"}</span></div>
                <div className='item-name'>{itemName}</div>
            </div>
        </Link >

    );
}
export default ItemPreview;