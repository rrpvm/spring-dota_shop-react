import IComboProp from "../interfaces/IComboProp";
const ComboBox: React.FC<IComboProp> = ({ data,title }) => {
   //const [active]
    return (
        <div className="combo-area">
            <div className="combo-title">
                <h3>{title}</h3>
            </div>
            <div className="combo-header">

            </div>
            <div className="combo-variant-area">
                <div className="combo-variant-search">
                    <input type="text"></input>
                </div>
                <div className="combo-variant-list">
                    {
                        data.map(item => {
                            return <div className="combo-variant-item" key={item.id} onClick={()=>{}}>   {item.variant}  </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
}
export default ComboBox;