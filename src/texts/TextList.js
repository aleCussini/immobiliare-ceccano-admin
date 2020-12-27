import {Datagrid, List, TextField} from "react-admin";
import React from "react";

export const TextList = props => {
    return (
        <List {...props} title={"Articoli"}>
            <Datagrid rowClick={"show"}>
                <TextField source="scope" label={"Destinazione"}/>
                <TextField source="content" label={"Contenuto"}/>
                <TextField source="richContent" label={"Contenuto Formattato"}/>
            </Datagrid>
        </List>
    )
};