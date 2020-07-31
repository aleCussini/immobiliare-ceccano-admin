import {ImageField, Show, SimpleShowLayout, TextField} from "react-admin";
import React from "react";

export const BlogShow = props => {
    return (
        <Show title={<BlogTitle/>} {...props}>
            <SimpleShowLayout>
                <ImageField source="image.src" label={"Anteprima"}/>
                <TextField source="title"/>
                <TextField source="content"/>
                {/*<BooleanInput source="starred" label={"In Evidenza"} /> */}
            </SimpleShowLayout>
        </Show>
    )
}

const BlogTitle = ({record}) => {
    return <span>Dettagli {record ? `${record.title}` : ''}</span>;
};