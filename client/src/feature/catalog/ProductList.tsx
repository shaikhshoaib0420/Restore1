import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../model/Product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

 const ProductList = ({products}: Props) => {
    return (
        // <List>
        //     {products.map((p:any) => (
        //         // <ListItem key={p.id}>
        //         //     <ListItemAvatar>
        //         //         <Avatar src={p.pictureUrl}/>
        //         //     </ListItemAvatar>
        //         //     <ListItemText>{p.name}</ListItemText>
        //         // </ListItem>
        //         <ProductCard product={p} />
        //     ))}
        // </List>

            <Grid sx={{paddingLeft: 4}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {products.map((p:any) => (
                                    <Grid item xs={2} sm={4} md={4} key={p.id}>
                                            <ProductCard product={p} />
                                    </Grid>                                    
                                ))}
                    
            </Grid>
    )
}

export default ProductList;