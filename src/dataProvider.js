import firebaseDataProvider from "ra-data-firebase-client";
import {FirebaseAuthProvider} from 'react-admin-firebase';
import db from './firebase/firebase-db'
import storage from './firebase/firebase-storage'
import * as firebase from "firebase";

const dataProvider = firebaseDataProvider(firebase, {
    lazyLoading: {enabled: true},
})
export const authProvider = FirebaseAuthProvider(firebase, {})

function updateDataInfo(params, previewUrl) {
    console.log('updating datainfo from object: ' + params.id + ' ' + params.data.title)
    let cardRef = db.ref('card/' + params.id)
    let post = params.data
    cardRef.set({
        title: post.title,
        starred: post.starred,
        price: post.price,
        bathrooms: post.bathrooms,
        image: previewUrl,
        squaremeters: post.squaremeters,
        rooms: post.rooms,
        address: post.address,
        dataRef: post.id,
        city: post.city
    }).then(value => console.log("card updated", value));
}

function updatePreview(image, objId) {
    const previewImage = image.rawFile instanceof File ? image : null
    let storageRef = storage.ref('preview/' + objId)
    storageRef.put(previewImage).then(a => console.log("preview element updated", a));
    return storageRef.getDownloadURL();
}

function updateGallery(galleryToUpdate, objId) {
    let galleryUrls = []
    console.log("start uploading gallery for size", galleryToUpdate.length)
    for (let i = 0; i < galleryToUpdate.length; i++) {
        const element = galleryToUpdate[i]
        let storageRef = storage.ref('images/' + objId + '/' + i)
        storageRef.put(element.rawFile).then(function (snap) {
            console.log("element uploaded ", snap)
        });
        galleryUrls.push(storageRef.getDownloadURL())
    }
    return galleryUrls;
}

export const myDataProvider = {

    ...dataProvider,

    create: (resource, params) => {
        if (resource !== 'data') {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
        }

        console.log('resource', resource)
        console.log('params', params)

        let objId = params.id;
        const galleryToUpdate = params.data.gallery;
        let galleryUrls = []
        if (galleryToUpdate) {
            galleryUrls = updateGallery(galleryToUpdate, objId)
        }

        let previewUrl = updatePreview(params.data.image, objId);

        updateDataInfo(params, previewUrl)

        return dataProvider.create(resource, {
            ...params,
            data: {
                ...params.data,
                gallery: galleryUrls,
                image: previewUrl,
            },
        })
    },

    update: (resource, params) => {
        let objId = params.id;
        if (resource !== 'data') {
            // fallback to the default implementation
            return dataProvider.update(resource, params);
        }

        const galleryToUpdate = params.data.gallery;
        console.log("####gallerytoupdate####", galleryToUpdate)
        let galleryUrls = updateGallery(galleryToUpdate, objId);

        let previewImage = params.data.image;
        console.log("####previewtoupdate####", previewImage)
        let previewUrl = updatePreview(previewImage, objId);
        updateDataInfo(params, previewUrl)

        if (previewImage) {
            return dataProvider.update(resource, {
                ...params,
                data: {
                    ...params.data,
                    gallery: galleryUrls,
                    image: previewUrl,
                },
            })
        } else {
            return dataProvider.update(resource, params);
        }
    }
}