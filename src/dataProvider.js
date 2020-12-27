import firebaseDataProvider from "ra-data-firebase-client";
import * as firebase from "./firebase";
import {FirebaseAuthProvider} from 'react-admin-firebase';
import db from './firebase-db'
import storage from './firebase-storage'

const dataProvider = firebaseDataProvider(firebase, {
    lazyLoading: {enabled: true},
})
export const authProvider = FirebaseAuthProvider(firebase, {})

function updateDataInfo(params){
    console.log('updating datainfo from object: ' + params.id + ' ' + params.data.title)
    let cardRef = db.ref('card/' + params.id)
    let post = params.data
    cardRef.set({
        title: post.title,
        starred: post.starred,
        //image : post.image,
        price : post.price,
        bathrooms: post.bathrooms, 
        squaremeters: post.squaremeters,
        rooms : post.rooms,
        address: post.address,
        dataRef: post.id,
        city: post.city
      });
    
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

function uploadGallery(galleryToUpload, params){
    console.log("start uploading gallery for size", galleryToUpload.length )
    for (let i = 0; i< galleryToUpload.length; i++){
        var element = galleryToUpload[i]
        console.log('###--->>>', element.rawFile)
        var storageRef = storage.ref('images/' + params.id + '/' + i)
        storageRef.put(element.rawFile).then(function(snap){
            console.log("element uploaded ",galleryToUpload[i])
        });
    }
}

function uploadImage(image, params){
    console.log("start uploading image")
    var storageRef = storage.ref('images/' + params.id + '/image')
    storageRef.put(image.rawFile).then(function(snap){
        console.log('image uploaded')
    })
    console.log('updating datainfo from object: ' + params.key + ' ' + params.data.title)
    updateDataInfo(params)
    console.log('params', params)
}

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

        var galleryToUpload = params.data.gallery;
        if(galleryToUpload){
            console.log("start uploading gallery for size", galleryToUpload.length )
            for (let i = 0; i< galleryToUpload.length; i++){
                var element = galleryToUpload[i]
                console.log('###--->>>', element)
                var storageRef = storage.ref('images/' + params.id + '/' + i)
                storageRef.put(element.rawFile).then(function(snap){
                    console.log("element uploaded ",galleryToUpload[i])
                });
            }
        }
        
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

        var galleryToUpload = params.data.gallery;
        console.log("start uploading gallery for size", galleryToUpload.length )
        for (let i = 0; i< galleryToUpload.length; i++){
            var element = galleryToUpload[i]
            console.log('###--->>>', element)
            var storageRef = storage.ref('images/' + params.id + '/' + i)
            storageRef.put(element.rawFile).then(function(snap){
                console.log("element uploaded ",galleryToUpload[i])
            });
        }

        /*var testImageRef = storage.ref('test/sjdakllskj-asdsad')
        console.log("###--->>> starting storage for: ", params.data.test_src)
        testImageRef.put(params.data.test_src.rawFile).then(function(snap){
            console.log("###--->>> ending storage")
        })*/


        console.log('updating datainfo from object: ' + params.key + ' ' + params.data.title)
        updateDataInfo(params)

        console.log('resource', resource)
        console.log('params', params)

        const newPicture = params.data.image.rawFile instanceof File ? params.data.image : null

        //const galleryToConvert = params.data.gallery
        //const gallery64 = []

        /*if (galleryToConvert) {
            for (let i = 0; i < galleryToConvert.length; i++) {
                let element = galleryToConvert[i];
                const newElement = element.rawFile instanceof File ? element : null
                Promise.resolve(convertFileToBase64(newElement))
                    .then(element64 => ({
                        src: element64,
                        title: `${params.data.title}` + i
                    }))
                    .then(transformedNewElement => gallery64.push(transformedNewElement))
                    .then(() => params.data.gallery = gallery64)
            }
        }*/

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
   
   
   
   
   
   
   
   
   
   
   
   
   
    /*...dataProvider,

    create: (resource, params) => {
        if (resource !== 'data') {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
        }
        var galleryToUpload = params.data.gallery;
        if(galleryToUpload){ 
            return Promise.resolve(uploadGallery(galleryToUpload, params)).then(result => {
                console.log('gallery uploaded');
            })
        }
        var image = params.data.image;
        if(image){
            return Promise.resolve(uploadImage(image, params)).then(result => {
                console.log('image uploaded')
            })
        }
    },

    update: (resource, params) => {
        if (resource !== 'data') {
            // fallback to the default implementation
            return dataProvider.update(resource, params);
        }
        var galleryToUpload = params.data.gallery;
        if(galleryToUpload){ 
            return Promise.resolve(uploadGallery(galleryToUpload, params)).then(result => {
                console.log('gallery uploaded');
            })
        }
        var image = params.data.image;
        if(image){
            return Promise.resolve(uploadImage(image, params)).then(result => {
                console.log('image uploaded')
            })
        }
    },*/
}