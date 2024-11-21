import { useEffect, useState } from "react";
import { Basket } from "../../model/Basket";
import agent from "../../api/agent";
import { readdirSync } from "fs";
import LoadingComponent from "../../layout/LoadingComponent";
import {
  Box,
  Button,
  Grid,
  Grid2,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { CenterFocusStrong, Delete } from "@mui/icons-material";
import { useStoreContext } from "../../context/StoreContext";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { green, red } from "@mui/material/colors";
import LoadingButton from "@mui/lab/LoadingButton";
import BasketSummary from "./BasketSummary";
import CheckoutPage from "../checkout/CheckoutPage";
import { Link } from "react-router-dom";

export default function BasketPage() {
  // const[loading, setLoading] = useState<boolean>(false);
  // const[basket, setBasket] = useState<Basket | null>(null);

  // useEffect(() => {
  //     setLoading(true);
  //     agent.Basket.getBasketItems()
  //     .then(basket => setBasket(basket))
  //     .catch(reason => console.log(reason))
  //     .finally(() => setLoading(false));
  // }, []);

  // if(loading) return <LoadingComponent message="Loading Basket Items..."></LoadingComponent>

  const { basket, setBasket, removeItem } = useStoreContext();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ loading: false, name: "" });

  function handleAddItem(productId: number, name = "") {
    // setLoading(true);
    setStatus({ loading: true, name });
    agent.Basket.addBasketItem(productId)
      .then((basket) => setBasket(basket))
      .catch((err) => console.log(err))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  function handleDeletItem(productId: number, quantity: number = 1, name = "") {
    setStatus({ loading: true, name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  if (!basket) return <Typography variant="h3"> No Basket found </Typography>;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">SubTotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.basketItemDto.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display={"flex"} alignItems={"center"}>
                    <img
                      src={row.pictureUrl}
                      alt={row.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{row.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(row.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent="space-evenly"
                  >
                    <LoadingButton
                      loading={
                        status.loading === true &&
                        status.name === "add" + row.productId
                      }
                      onClick={() =>
                        handleAddItem(row.productId, "add" + row.productId)
                      }
                    >
                      <PlusOneIcon
                        color="primary"
                        sx={{ color: green[500], fontSize: 20 }}
                      />
                    </LoadingButton>
                    <span>{row.quantity}</span>
                    <LoadingButton
                      loading={
                        status.loading === true &&
                        status.name === "rem" + row.productId
                      }
                      onClick={() =>
                        handleDeletItem(row.productId, 1, "rem" + row.productId)
                      }
                    >
                      <RemoveCircleOutlineIcon
                        sx={{ color: red[500], fontSize: 20 }}
                      />
                    </LoadingButton>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(row.quantity * (row.price / 100)).toFixed(2)}{" "}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => handleDeletItem(row.productId, row.quantity)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid2 container spacing={2}>
        <Grid2 size={8}></Grid2>
        <Grid2 size={4}>
          <BasketSummary />
          <Button fullWidth component={Link} to="/checkout" variant="contained">
            Checkout
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
}
