import { useEffect } from "react"
import Button from "react-bootstrap/Button"
import ItemData from "../interfaces/ItemData"


export const ItemColumn = (prop: ItemData): JSX.Element => {
    useEffect(() => {
       
    }, []);
    return (
        <div className="item-block-column">
            <div className="item-header">
                <img src="./assets/images/ethereal.png" alt="item"></img>
                <h3>{prop.itemName}</h3>
            </div>
            <div className="item-body">
                <span>rarity : {prop.itemRarity}</span>
                <span>hero : {prop.itemHero}</span>
                <span>price($) : {prop.itemPrice}</span>
                <span>avaliable : {prop.itemsAvaliable}</span>
            </div>
            <div className="item-action-footer">
                <Button variant="secondary">details</Button>
                <Button variant="primary">add to cart</Button>
            </div>
        </div>
    )
}