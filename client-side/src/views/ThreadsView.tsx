import Container from "react-bootstrap/esm/Container";

export const ThreadsView = (): JSX.Element => (
    <Container style={{ display: "flex", flexDirection: "row" }}>
        <div className="filter-block">filter</div>
        <div className="items-block">
            <div className="item-block-column">
                <div className="item-header">
                    <img src=""></img>
                </div>
                <div>body</div>
                <div>footer</div>
            </div>
            <div className="item-block-column">
                <div className="item-header">header</div>
                <div>body</div>
                <div>footer</div>
            </div>
            <div className="item-block-column">
                <div className="item-header">header</div>
                <div>body</div>
                <div>footer</div>
            </div>
        </div>
    </Container>
);