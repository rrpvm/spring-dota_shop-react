import Button from "react-bootstrap/Button"
import ItemData from "../interfaces/ItemData"


export const ItemColumn = (prop: ItemData): JSX.Element => {
    return (
        <div className="item-block-column">
            <div className="item-header">
                <img src={prop.itemImage} alt="item"></img>
                <h3>{prop.itemName}</h3>
            </div>
            <div className="item-body">
                <span className="item-body-property">rarity : {prop.itemRarity}</span>
                <span className="item-body-property">hero : {prop.itemHero}</span>
                <span className="item-body-property">price($) : {prop.itemPrice}</span>
                <span className="item-body-property">avaliable : {prop.itemsAvaliable}</span>
            </div>
            <div className="item-action-footer">
                <Button variant="secondary" onClick={()=>console.log(1)}>details</Button>
                <Button variant="primary" onClick={()=>console.log(prop.itemId)}>add to cart</Button>
            </div>
        </div>
    )
}