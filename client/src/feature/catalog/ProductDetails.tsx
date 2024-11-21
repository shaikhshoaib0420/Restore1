import {
  Button,
  Divider,
  Grid,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../../model/Product";
import agent from "../../api/agent";
import { error } from "console";
import { useStoreContext } from "../../context/StoreContext";

const ProductDetails = () => {
  const { basket, setBasket, removeItem } = useStoreContext();
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [noProduct, setNoProduct] = useState<"">();
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.basketItemDto.find((i) => i.productId == product?.id);
  // useEffect(() => {
  //     axios.get(`http://localhost:5202/api/product/${id}`)
  //         .then(response => setProduct(response.data))
  //         .catch(error => console.log(error))
  //         .finally(() => setLoading(false));
  // },[id]);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    id &&
      agent.catalog
        .getProduct(parseInt(id))
        .then(setProduct)
        .catch((err) => {
          console.log(err.response);
          setNoProduct(err.response.data);
        })
        .finally(() => setLoading(false));
  }, [id, item]);

  function changeQuantity(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  function updateQuantity() {
    if (product) {
      setSubmitting(true);
      if (!item || item.quantity < quantity) {
        const updatedQuantity = !item ? quantity : quantity - item.quantity;
        if (product) {
          agent.Basket.addBasketItem(product.id, updatedQuantity)
            .then((basket) => setBasket(basket))
            .catch((err) => console.log(err))
            .finally(() => setSubmitting(false));
        }
      } else {
        const updatedQuantity = item.quantity - quantity;
        agent.Basket.removeItem(product.id, updatedQuantity)
          .then(() => removeItem(product.id, updatedQuantity))
          .catch((err) => console.log(err))
          .finally(() => setSubmitting(false));
      }
    }
  }

  if (loading) return <Typography variant="h3">Loading...</Typography>;

  if (!product) return <Typography variant="h3">{noProduct}</Typography>;
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: "32px" }} />
        <Typography variant="h4">
          ${(product.price / 100).toFixed(2)}
        </Typography>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Grid2 container marginTop={5} spacing={2}>
          <Grid2 size={8}>
            <TextField
              fullWidth
              sx={{ marginTop: "12px" }}
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              type="number"
              value={quantity}
              onChange={changeQuantity}
            />
          </Grid2>
          <Grid2 size={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{ marginTop: "21px" }}
              onClick={updateQuantity}
              disabled={item?.quantity === quantity || (!item && quantity < 1)}
            >
              {item ? "Update Quantity" : "Add Quantity"}
            </Button>
          </Grid2>
        </Grid2>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
