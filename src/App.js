import React from "react";
import {Admin, Create, Edit, Resource} from "react-admin";
import {PostForm} from "./posts/PostForm";
import {PostList} from "./posts/PostList";
import {PostShow} from "./posts/PostShow";
import {BlogForm} from "./blogs/BlogForm";
import {BlogList} from "./blogs/BlogList";
import {BlogShow} from "./blogs/BlogShow";
import {TextForm} from "./texts/TextForm";
import {TextList} from "./texts/TextList";
import {TextShow} from "./texts/TextShow";
import {myDataProvider} from "./dataProvider";

const PostEdit = props => {
    return (
        <Edit {...props} title={"Modifica Annuncio"}>
            <PostForm/>
        </Edit>
    )
}

const PostCreate = props => {
    return (
        <Create {...props} title={"Creazione Annuncio"}>
            <PostForm/>
        </Create>
    )
}

const BlogEdit = props => {
    return (
        <Edit {...props}>
            <BlogForm/>
        </Edit>
    )
}

const BlogCreate = props => {
    return (
        <Create {...props}>
            <BlogForm/>
        </Create>
    )
}

const TextEdit = props => {
    return (
        <Edit {...props}>
            <TextForm/>
        </Edit>
    )
}

const TextCreate = props => {
    return (
        <Create {...props}>
            <TextForm/>
        </Create>
    )
}

function App() {
    return (
        <Admin title="Mantua Admin" dataProvider={myDataProvider}>
            <Resource
                name={"data"}
                options={{label: 'Annunci'}}
                list={PostList}
                edit={PostEdit}
                show={PostShow}
                create={PostCreate}
            />
            <Resource
                name={"blogs"}
                options={{label: 'Articoli'}}
                list={BlogList}
                edit={BlogEdit}
                show={BlogShow}
                create={BlogCreate}
            />
            <Resource
                name={"texts"}
                options={{label: 'Testi'}}
                list={TextList}
                edit={TextEdit}
                show={TextShow}
                create={TextCreate}
            />
        </Admin>
    );
}

export default App;
