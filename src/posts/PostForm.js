import {ImageField, FileField, FileInput, ImageInput, NumberInput, SelectInput, BooleanInput, SimpleForm, TextInput} from "react-admin";
import RichTextInput from 'ra-input-rich-text';
import React from "react";
import Switch from '@material-ui/core/Switch';

export const PostForm = props => {
    return (
        <SimpleForm {...props}>
            
            <BooleanInput source={"starred"}/>
            <ImageInput source="image" label="Immagine Principale" accept="image/*"
                        placeholder={<p>Carica una foto</p>}>
                <ImageField source={"src"}/>
            </ImageInput>
            <ImageInput source="gallery" label="Galleria Foto" accept="image/*"
                        multiple={true}
                        placeholder={<p>Carica una foto</p>}>
                <ImageField source={"src"}/>
            </ImageInput>
            <TextInput source={"title"}/>
            <TextInput source={"city"}/>
            <TextInput source={"province"}/>
            <RichTextInput fullWidth="true" source={"content"}/>
            {/* <TextInput source={"scope"}/> */}
            <TextInput source={"address"}/>
            <TextInput source={"coordinates"}/>
            <SelectInput label ='Tipo' source = "type" choices={[
                { id: '1', name: 'Appartamento' },
                { id: '2', name: 'Indipendente' }
            ]} />
            <NumberInput source={"price"} options={{currency: 'EUR'}}/>
            <NumberInput source={"squaremeters"} label={"MQ commerciali"}/>
            <NumberInput source={"realsquaremeters"} label={"MQ calpestabili"}/>
            <NumberInput source={"bathrooms"}/>
            <NumberInput source={"rooms"}/>

            <TextInput label='Riscaldamento' source="heating"/>
            <NumberInput source = 'year' label='Anno di Costruzione'/>
            <TextInput source = 'status' label='stato'></TextInput>
            <TextInput source = 'ape' label='Dati APE'></TextInput>
            <SelectInput label='Condizionatori' source="airconditioners" choices={[
                {id: 'true', name: 'Si'},
                {id: 'False', name: 'No'},
            ]}/>
        </SimpleForm>
    )
}