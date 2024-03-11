import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../../model/Product";

const ProductDetails = () => {

    const {id} = useParams();
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`http://localhost:5202/api/product/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    },[id]);

    if(loading) return <Typography variant="h3">Loading...</Typography>

    if(!product) return <Typography variant="h3">Product not found</Typography>
    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} style={{width: "100%"}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">
                    {product.name}
                </Typography>
                <Divider sx={{mb: "32px"}}/>
                <Typography variant="h4">${(product.price / 100).toFixed(2)}</Typography>

                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    {product.name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Brand
                                </TableCell>
                                <TableCell>
                                    {product.brand}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Quantity
                                </TableCell>
                                <TableCell>
                                    {product.quantityInStock}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
        
    )
}

export default ProductDetails;