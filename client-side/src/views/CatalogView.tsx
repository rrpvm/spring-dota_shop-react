import axios, { AxiosError, AxiosResponse } from "axios";
import { number } from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { ItemColumnGroup } from "../components/ItemColumnGroup";

export const CatalogView = (): JSX.Element => {
    const [itemsLength, setItemLength] = useState(0);
    useEffect(() => {
        axios.get("http://localhost:8080/items_length").then((response: AxiosResponse) => {//get filtered length
            setItemLength(response.data);
        }).catch((error: AxiosError) => {
            console.log(error.message);
        });
    }, []);
    const insertItemColumnGroup = () => {
        let array: number[] = [];
        for (let i: number = 0; i < itemsLength; i += 3) {
            array.push(i);
        }
        return array.map((item) => {
            return (<ItemColumnGroup data_count={item} key={item}></ItemColumnGroup>);
        });
    }
    return (
        <Container style={{ display: "flex", flexDirection: "row" }}>
            <div className="filter-block">filter</div>
            <div className="items-block">
                {
                    insertItemColumnGroup()
                }

            </div>
        </Container>
    )
};