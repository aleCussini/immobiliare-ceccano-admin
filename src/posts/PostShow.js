import {DateField, ImageField, NumberField, Show, SimpleShowLayout, TextField} from "react-admin";
import React from "react";

export const PostShow = props => {
    return (
        <Show title={<PostTitle/>} {...props}>
            <SimpleShowLayout>
                <ImageField source="image.src" label={"Anteprima"}/>
                <TextField source="content" label={"Descrizione"}/>
                <NumberField source="price" options={{style: 'currency', currency: 'EUR'}}/>
                <TextField source="address"/>
                <TextField source="title"/>
                <DateField source="update" showTime={true}/>
                <NumberField source={"squaremeters"}/>
                <NumberField source={"bathrooms"}/>
                <NumberField source={"rooms"} />
            </SimpleShowLayout>
        </Show>
    )
}

const PostTitle = ({record}) => {
    return <span>Dettagli {record ? `${record.title}` : ''}</span>;
};