import {ImageField, ImageInput, NumberInput, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const PostForm = props => {
    return (
        <SimpleForm {...props}>
            <ImageInput  source="image" label="Related pictures" accept="image/*"
                        placeholder={<p>Carica una foto</p>}>
                <ImageField source={"src"}/>
            </ImageInput>
            <TextInput source={"title"}/>
            <TextInput source={"content"}/>
            {/* <TextInput source={"scope"}/> */}
            <TextInput source={"address"}/>
            <NumberInput source={"price"} options={{currency: 'EUR'}}/>
        </SimpleForm>
    )
}