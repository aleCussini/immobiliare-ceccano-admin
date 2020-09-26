import {DateField, ImageField, NumberField, Show, SimpleShowLayout, TextField, SelectField} from "react-admin";
import React from "react";

export const TextShow = props => {
    return (
        <Show title={<TextTitle/>} {...props}>
            <SimpleShowLayout>
                <TextField source="id" label={"Identificativo"}/>
                <TextField source="content" label={"Contenuto"} />
            </SimpleShowLayout>
        </Show>
    )
}

const TextTitle = ({record}) => {
    return <span>{record.id}</span>;
};