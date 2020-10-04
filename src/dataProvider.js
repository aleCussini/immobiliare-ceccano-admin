import firebaseDataProvider from "ra-data-firebase-client";
import * as firebase from "./firebase";
import {FirebaseAuthProvider} from 'react-admin-firebase';

const dataProvider = firebaseDataProvider(firebase, {})
export const authProvider = FirebaseAuthProvider(firebase, {})

const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;

            if (file != null) {
                reader.readAsDataURL(file.rawFile);
            }
        }
    );

export const myDataProvider = {

    ...dataProvider,

    create: (resource, params) => {
        if (resource !== 'data') {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
        }

        console.log('resource', resource)
        console.log('params', params)

        const newPicture = params.data.image.rawFile instanceof File ? params.data.image : null

        const galleryToConvert = params.data.gallery
        const gallery64 = []

        for (let i = 0; i < galleryToConvert.length; i++) {
            let element = galleryToConvert[i];
            const newElement = element.rawFile instanceof File ? element : null
            Promise.resolve(convertFileToBase64(newElement))
                .then(element64 => ({
                    src: element64,
                    title: `${params.data.title}` + i
                }))
                .then(transformedNewElement => gallery64.push(transformedNewElement))
        }

        return Promise.resolve(convertFileToBase64(newPicture))
            .then(picture64 => ({
                    src: picture64,
                    title: `${params.data.title}`,
                })
            )
            .then(transformedNewPicture =>
                dataProvider.create(resource, {
                    ...params,
                    data: {
                        ...params.data,
                        image: transformedNewPicture,
                        gallery: gallery64
                    },
                })
            );
    },

    update: (resource, params) => {
        if (resource !== 'data') {
            // fallback to the default implementation
            return dataProvider.update(resource, params);
        }

        console.log('resource', resource)
        console.log('params', params)

        const newPicture = params.data.image.rawFile instanceof File ? params.data.image : null

        const galleryToConvert = params.data.gallery
        const gallery64 = []

        for (let i = 0; i < galleryToConvert.length; i++) {
            let element = galleryToConvert[i];
            const newElement = element.rawFile instanceof File ? element : null
            Promise.resolve(convertFileToBase64(newElement))
                .then(element64 => ({
                    src: element64,
                    title: `${params.data.title}` + i
                }))
                .then(transformedNewElement => gallery64.push(transformedNewElement))
        }

        if (newPicture) {
            return Promise.resolve(convertFileToBase64(newPicture))
                .then(picture64 => ({
                        src: picture64,
                        title: `${params.data.title}`,
                    })
                )
                .then(transformedNewPicture =>
                    dataProvider.update(resource, {
                        ...params,
                        data: {
                            ...params.data,
                            image: transformedNewPicture,
                        },
                    })
                );
        } else {
            return dataProvider.update(resource, params);
        }
    },
}