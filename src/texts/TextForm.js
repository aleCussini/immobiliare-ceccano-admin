import {ImageField, ImageInput, NumberInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import RichTextInput from 'ra-input-rich-text';
import React from "react";

export const TextForm = props => {
    return (
        <SimpleForm {...props}>
            <RichTextInput source={"content"}/>
        </SimpleForm>
    )
}