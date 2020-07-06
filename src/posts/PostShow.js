import {DateField, ImageField, NumberField, Show, SimpleShowLayout, TextField} from "react-admin";
import React from "react";

export const PostShow = props => {
    return (
        <Show title={<PostTitle/>} {...props}>
            <SimpleShowLayout>
                <TextField source="address"/>
                <TextField source="content"/>
                <ImageField source="image.src" label={"Anteprima"}/>
                <NumberField source="price" options={{style: 'currency', currency: 'EUR'}}/>
                <TextField source="scope"/>
                <TextField source="title"/>
                <DateField source="update" showTime={true}/>
            </SimpleShowLayout>
        </Show>
    )
}

const PostTitle = ({record}) => {
    return <span>Dettagli {record ? `${record.title}` : ''}</span>;
};