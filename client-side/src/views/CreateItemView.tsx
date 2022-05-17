import Button from "react-bootstrap/esm/Button";
import { encodeImageFileAsURL } from "../utilities/ImageConverter";

export const CreateItemView = () => {

    return (
        <div className="item-create-block">
            <form className="item-create-form">
                <input className="item-create-form-input-field" type="file" onChange={encodeImageFileAsURL} />
                <input className="item-create-form-input-field" placeholder="name" type="text"></input>
                <input className="item-create-form-input-field" placeholder="hero" type="text" ></input>
                <input className="item-create-form-input-field" placeholder="rarity" type="text"></input>
                <input className="item-create-form-input-field" placeholder="price" type="text"></input>
                <input className="item-create-form-input-field" placeholder="avaliable" type="number"></input>
                <Button variant="primary">create</Button>
            </form>
        </div>
    );
}