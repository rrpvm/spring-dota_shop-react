import '../../styles/item_preview.css'
import ItemPreviewProp from "../../interfaces/props/ItemPreviewProp";

const ItemPreview: React.FC<ItemPreviewProp> = ({itemName, itemPrice, imageURL}) => {
    return (
        <div className='item-preview'>
            <div className='item-image'><img src={`http://localhost:8080/resources/static/images/${imageURL}`} /></div>
            <div className='item-price'><span>{itemPrice + " $"}</span></div>
            <div className='item-name'>{itemName}</div>
        </div>
        
    );
}
export default ItemPreview;