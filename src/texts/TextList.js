import {Datagrid, DateField, ImageField, List, NumberField, TextField} from "react-admin";
import React from "react";

export const TextList = props => {
    return (
        <List {...props} title={"Articoli"}>
            <Datagrid rowClick={"show"}>
                <TextField source="id" label={"Identificativo"}/>
                <TextField source="content" label={"Contenuto"}/>
            </Datagrid>
        </List>
    )
};