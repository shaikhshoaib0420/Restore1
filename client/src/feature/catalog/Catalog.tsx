import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../model/Product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import LoadingComponent from "../../layout/LoadingComponent";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  
    // useEffect(() => {
    //   fetch("http://localhost:5202/api/product")
    //     .then(res => res.json())
    //     .then(res => setProducts(res))
    // }, []);

    useEffect(() => {
        setLoading(true);
        agent.catalog.getProducts().then(setProducts)
        .finally(() => setLoading(false));
    }, [])

    if (loading) return <LoadingComponent message="Loading Products..."/>
    //destructuring property
    return (
        <>
        {/* <ul>
            {product.map((p:any) => (
               <>
                <li>{p.name}, {p.price}</li>                
               </>                
            ))}
        </ul> */}
        {/* <List>
            {products.map((p:any) => (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={p.pictureUrl}/>
                    </ListItemAvatar>
                    <ListItemText>{p.name}</ListItemText>
                </ListItem>
            ))}
        </List> */}
        <ProductList products={products}/>
        </>
    )
}