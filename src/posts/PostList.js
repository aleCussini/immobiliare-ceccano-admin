import {Datagrid, DateField, ImageField, List, NumberField, TextField} from "react-admin";
import React from "react";

export const PostList = props => {
    return (
        <List {...props} title={"Articoli"}>
            <Datagrid rowClick={"show"}>
                <ImageField source="image.src" label={"Anteprima"}/>
                <TextField source="address" label={"Indirizzo"}/>
                <TextField source="content" label={"Descrizione"}/>
                <NumberField source="price" label={"Prezzo"}
                             options={{style: 'currency', currency: 'EUR'}}/>
                {/*<TextField source="scope" label={"Tipo"}/> */}
                <TextField source="title" label={"Titolo"}/>
                <DateField source="update" showTime={true}/>
            </Datagrid>
        </List>
    )
};

// const PostGrid = ({ids, data, basePath}) => {
//     return (
//         <div style={{margin: '1%'}}>
//             {ids.map(id =>
//                 <Card>
//                     <CardHeader
//                         title={data[id].title}
//                         subheader={data[id].scope === 'sale' ? data[id].price + ' €' : data[id].price + ' €/mese'}
//                     />
//                     <CardMedia component={"img"} image={data[id].image.src}/>
//                     <CardContent>
//                         {data[id].content}
//                         {/*<Breadcrumbs separator={"|"} style={{paddingTop: "5%"}}>*/}
//                         {/*    <Typography className={classes.link}>*/}
//                         {/*        <Bathtub className={classes.icon}/>*/}
//                         {/*        3*/}
//                         {/*    </Typography>*/}
//                         {/*    <Typography className={classes.link}>*/}
//                         {/*        <SquareFoot className={classes.icon}/>*/}
//                         {/*        120 MQ*/}
//                         {/*    </Typography>*/}
//                         {/*    <Typography className={classes.link}>*/}
//                         {/*        <Hotel className={classes.icon}/>*/}
//                         {/*        9*/}
//                         {/*    </Typography>*/}
//                         {/*</Breadcrumbs>*/}
//                     </CardContent>
//                 </Card>
//             )}
//         </div>
//     )
// }