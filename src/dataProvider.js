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

async function updatePreview(image, objId) {
    const previewImage = image.rawFile
    let storageRef = storage.ref('preview/' + objId)
    await storageRef.put(previewImage).then(a => console.log("preview element updated", a));
    return storageRef.getDownloadURL();
}

async function updateGallery(galleryToUpdate, objId) {
    let galleryUrls = []
    console.log("start uploading gallery for size", galleryToUpdate.length)
    for (let i = 0; i < galleryToUpdate.length; i++) {
        const element = galleryToUpdate[i]
        let storageRef = storage.ref('images/' + objId + '/' + i)
        await storageRef.put(element.rawFile).then(snap => {
            console.log("element uploaded ", snap)
            storageRef.getDownloadURL().then(
                value => {
                    console.log("gallery downloadURL", value)
                    galleryUrls.push({url: value})
                })
        });
    }
    return galleryUrls;
}

export const myDataProvider = {

    ...dataProvider,

    create: async (resource, params) => {
        if (resource !== 'data') {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
        }

        console.log('resource', resource)
        console.log('params', params)

        let objId = params.id;
        const galleryToUpdate = params.data.gallery;

        let galleryUrls = await updateGallery(galleryToUpdate, objId)

        let previewUrl = await updatePreview(params.data.image, objId);

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

    update: async (resource, params) => {
        let objId = params.id;
        if (resource !== 'data') {
            // fallback to the default implementation
            return dataProvider.update(resource, params);
        }

        const galleryToUpdate = params.data.gallery;
        console.log("####gallerytoupdate####", galleryToUpdate)
        let galleryUrls = await updateGallery(galleryToUpdate, objId);
        console.log("GALLERY URLS", galleryUrls)

        let previewImage = params.data.image;
        console.log("####previewtoupdate####", previewImage)
        let previewUrl = await updatePreview(previewImage, objId);
        console.log("PREVIEW URLS", previewUrl)
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