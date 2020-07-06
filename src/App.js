import React from "react";
import {Admin, Create, Edit, Resource} from "react-admin";
import {PostForm} from "./posts/PostForm";
import {PostList} from "./posts/PostList";
import {PostShow} from "./posts/PostShow";
import {myDataProvider} from "./dataProvider";

const PostEdit = props => {
    return (
        <Edit {...props}>
            <PostForm/>
        </Edit>
    )
}

const PostCreate = props => {
    return (
        <Create {...props}>
            <PostForm/>
        </Create>
    )
}

function App() {
    return (
        <Admin title="Mantua Admin" dataProvider={myDataProvider}>
            <Resource
                name={"data"}
                options={{label: 'Articoli'}}
                list={PostList}
                edit={PostEdit}
                show={PostShow}
                create={PostCreate}
            />
        </Admin>
    );
}

export default App;
