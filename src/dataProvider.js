import firebaseDataProvider from "ra-data-firebase-client";
import {FirebaseAuthProvider} from 'react-admin-firebase';
import db from './firebase/firebase-db'
import storage from './firebase/firebase-storage'
import * as firebase from "firebase";

const dataProvider = firebaseDataProvider(firebase, {
    lazyLoading: {enabled: true},
})
export const authProvider = FirebaseAuthProvider(firebase, {})

function updateDataInfo(params) {
    console.log('updating datainfo from object: ' + params.id + ' ' + params.data.title)
    let cardRef = db.ref('card/' + params.id)
    let post = params.data
    cardRef.set({
        title: post.title,
        starred: post.starred,
        price: post.price,
        bathrooms: post.bathrooms,
        squaremeters: post.squaremeters,
        rooms: post.rooms,
        address: post.address,
        dataRef: post.id,
        city: post.city
    });

}

function updateGallery(galleryToUpdate, objId) {
    console.log("start uploading gallery for size", galleryToUpdate.length)
    for (let i = 0; i < galleryToUpdate.length; i++) {
        const element = galleryToUpdate[i]
        console.log('###--->>>', element)
        let storageRef = storage.ref('images/' + objId + '/' + i)
        storageRef.put(element.rawFile).then(function (snap) {
            console.log("element uploaded ", galleryToUpdate[i])
        });
    }
}

const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
            setTimeout(resolve, 1000, file);
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
        updateDataInfo(params)

        console.log('resource', resource)
        console.log('params', params)

        const galleryToUpdate = params.data.gallery;
        if (galleryToUpdate) {
            updateGallery(galleryToUpdate, params.id)
        }

        const previewImage = params.data.image.rawFile instanceof File ? params.data.image : null
        return Promise.resolve(convertFileToBase64(previewImage))
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

        const galleryToUpdate = params.data.gallery;
        updateGallery(galleryToUpdate, params.id)

        console.log('updating datainfo from object: ' + params.key + ' ' + params.data.title)
        updateDataInfo(params)

        console.log('resource', resource)
        console.log('params', params)

        const previewImage = params.data.image.rawFile instanceof File ? params.data.image : null

        if (previewImage) {
            return Promise.resolve(convertFileToBase64(previewImage))
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
    }
}