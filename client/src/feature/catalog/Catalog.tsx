import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../model/Product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
  
    useEffect(() => {
      fetch("http://localhost:5202/api/product")
        .then(res => res.json())
        .then(res => setProducts(res))
    }, []);
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