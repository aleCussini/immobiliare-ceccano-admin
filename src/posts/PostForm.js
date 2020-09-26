import {ImageField, ImageInput, NumberInput, SimpleForm, TextInput, SelectInput} from "react-admin";
import RichTextInput from 'ra-input-rich-text';
import React from "react";

export const PostForm = props => {
    return (
        <SimpleForm {...props}>
            <ImageInput  source="image" label="Related pictures" accept="image/*"
                        placeholder={<p>Carica una foto</p>}>
                <ImageField source={"src"}/>
            </ImageInput>
            <TextInput source={"title"}/>
            <TextInput source={"city"} />
            <TextInput source={"province"} />
            <RichTextInput source={"content"}/>
            {/* <TextInput source={"scope"}/> */}
            <TextInput source={"address"}/>
            <SelectInput label ='Tipo' source = "type" choices={[
                { id: '1', name: 'Appartamento' },
                { id: '2', name: 'Indipendente' }
            ]} />
            <NumberInput source={"price"} options={{currency: 'EUR'}}/>
            <NumberInput source={"squaremeters"}/>
            <NumberInput source={"bathrooms"}/>
            <NumberInput source={"rooms"} />
            <SelectInput label='Riscaldamento' source = "heating" choices={[
                { id: 'true', name: 'Si' },
                { id: 'False', name: 'No' },
            ]} />
            <SelectInput label='Condizionatori' source = "airconditioners" choices={[
                { id: 'true', name: 'Si' },
                { id: 'False', name: 'No' },
            ]} />
           </SimpleForm>
    )
}