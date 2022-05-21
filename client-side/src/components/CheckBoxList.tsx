import ICheckBoxListProp from "../interfaces/ICheckBoxListProp";

const CheckBoxList: React.FC<ICheckBoxListProp> = ({ items, title }) => {
    return (
        <div className="checkbox-list-container">
            <div className="checkbox-list-title"><h3>{title}</h3></div>
            <div className="checkbox-list-body">
                {items.map(item => {
                    return (
                        <div className="checkbox-list-body-item" key={item.id}>
                            <input type="checkbox" id={item.name} onChange={() => console.log(1)} className="checkbox-list-body-item-value"></input>
                            <label htmlFor={item.name} style={{ color: item.hexColor }}> {item.name} </label>
                        </div>
                    );
                })}
            </div>
            <div className="checkbox-list-footer">
                <hr></hr>
            </div>
        </div>
    );
}
export default CheckBoxList;