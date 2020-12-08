import {
    BooleanField,
    DateField,
    ImageField,
    NumberField,
    RichTextField,
    SelectField,
    Show,
    SimpleShowLayout,
    TextField
} from "react-admin";
import React from "react";

export const PostShow = props => {
    return (
        <Show title={<PostTitle/>} {...props}>
            <SimpleShowLayout>
                <BooleanField source="starred" label={"Preferito"}/>
                <ImageField source="image.src" label={"Anteprima"}/>
                <ImageField source="gallery" src={"src"} label={"Galleria"}/>
                <RichTextField source="content" label={"Descrizione"}/>
                <TextField source="city" label="Paese"/>
                <TextField source="province" label="Provincia"/>
                <NumberField source="price" options={{style: 'currency', currency: 'EUR'}}/>
                <TextField source="address"/>
                <TextField source="title"/>
                <DateField source="update" showTime={true}/>
                <NumberField source={"squaremeters"} label={"MQ commerciali"}/>
                <NumberField source={"realsquaremeters"} label={"MQ calpestabili"}/>
                <NumberField source={"bathrooms"}/>
                <NumberField source={"rooms"}/>
                <TextField label='Riscaldamento' source="heating"/>
                <SelectField label='Tipo' source="type" choices={[
                    {id: '1', name: 'Appartamento'},
                    {id: '2', name: 'Indipendente'}
                ]}/>
            </SimpleShowLayout>
        </Show>
    )
}

const PostTitle = ({record}) => {
    return <span>Dettagli {record ? `${record.title}` : ''}</span>;
};