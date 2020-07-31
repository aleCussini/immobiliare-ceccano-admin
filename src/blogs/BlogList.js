import {Datagrid, ImageField, List, TextField} from "react-admin";
import React from "react";

export const BlogList = props => {
    return (
        <List {...props} title={"Post"}>
            <Datagrid rowClick={"show"}>
                <ImageField source="image.src" label={"Anteprima"}/>
                <TextField source="title" label={"Titolo"}/>
                {/*<NullableBooleanInput  source="starred" label="In Evidenza" /> */}
            </Datagrid>
        </List>
    )
};