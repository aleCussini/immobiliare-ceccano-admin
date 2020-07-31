import firebaseDataProvider from "ra-data-firebase-client";
import * as firebase from "firebase";

firebase.initializeApp({
    apiKey: "AIzaSyDfIAEEHoXOkawsR-_BevCw8IUGhMUtRU0",
    authDomain: "immobiliare-ceccano.firebaseapp.com",
    databaseURL: "https://immobiliare-ceccano.firebaseio.com",
    projectId: "immobiliare-ceccano",
    storageBucket: "immobiliare-ceccano.appspot.com",
    messagingSenderId: "200899466910",
    appId: "1:200899466910:web:03c449ef7e954111ca4d8f",
    measurementId: "G-TWK8XXNWW4"
})

const dataProvider = firebaseDataProvider(firebase, {})

const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;

            reader.readAsDataURL(file.rawFile);
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