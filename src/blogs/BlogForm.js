import {ImageField, ImageInput, SimpleForm, TextInput, BooleanInput } from "react-admin";
import React from "react";

export const BlogForm = props => {
    return (
        <SimpleForm {...props}>
            <ImageInput  source="image" label="Related pictures" accept="image/*"
                        placeholder={<p>Carica una foto</p>}>
                <ImageField source={"src"}/>
            </ImageInput>
            <TextInput source={"title"}/>
            <TextInput source={"content"}/>
            <BooleanInput source={"starred"}/>
            
        </SimpleForm>
    )
}