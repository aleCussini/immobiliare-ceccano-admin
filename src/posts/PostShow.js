import {DateField, ImageField, NumberField, Show, SimpleShowLayout, TextField, SelectField} from "react-admin";
import React from "react";

export const PostShow = props => {
    return (
        <Show title={<PostTitle/>} {...props}>
            <SimpleShowLayout>
                <ImageField source="image.src" label={"Anteprima"}/>
                <ImageField source="gallery" src={"src"} label={"Galleria"}/>
                <TextField source="content" label={"Descrizione"}/>
                <TextField source="city" label="Paese" />
                <TextField source="province" label="Provincia" />
                <NumberField source="price" options={{style: 'currency', currency: 'EUR'}}/>
                <TextField source="address"/>
                <TextField source="title"/>
                <DateField source="update" showTime={true}/>
                <NumberField source={"squaremeters"}/>
                <NumberField source={"bathrooms"}/>
                <NumberField source={"rooms"} />
                <SelectField label='Riscaldamento' source = "heating" choices={[
                { id: 'true', name: 'Si' },
                { id: 'False', name: 'No' },
            ]} />
            </SimpleShowLayout>
        </Show>
    )
}

const PostTitle = ({record}) => {
    return <span>Dettagli {record ? `${record.title}` : ''}</span>;
};