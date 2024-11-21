import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  colors,
} from "@mui/material";
import { Product } from "../../model/Product";
import { ExpandMore } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import agent from "../../api/agent";
import { useState } from "react";
import { useStoreContext } from "../../context/StoreContext";
// import { LoadingButton } from "@material-ui/lab";

interface Props {
  product: Product;
}
const ProductCard = (props: Props) => {
  const { basket, setBasket } = useStoreContext();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  function navigateToProductDetails(id: number) {
    navigate("/catalog/" + id);
  }

  function addItemToBasket(id: number) {
    setLoading(true);
    agent.Basket.addBasketItem(id)
      .then((basket) => setBasket(basket))
      .catch((reason) => console.log(reason))
      .finally(() => setLoading(false));
  }

  return (
    // <ListItem key={props.product.id}>
    //     <ListItemAvatar>
    //         <Avatar src={props.product.pictureUrl}/>
    //     </ListItemAvatar>
    //     <ListItemText>{props.product.name}</ListItemText>
    // </ListItem>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.product.name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.product.name}
        subheader="September 14, 2016"
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "secondary.main" },
        }}
      />
      <CardMedia
        component="img"
        sx={{
          backgroundSize: "contain",
          height: 140,
          bgcolor: "primary.light",
        }}
        image={props.product.pictureUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="secondary">
          {props.product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.product.brand}/{props.product.type}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => navigateToProductDetails(props.product.id)}
        >
          <FavoriteIcon />
        </IconButton>
        {/* <LoadingButton loading={loading} onClick={() => addItemToBasket(props.product.id)}> */}
        <IconButton
          aria-label="share"
          onClick={() => addItemToBasket(props.product.id)}
        >
          <AddCircleOutlineIcon />
        </IconButton>
        {/* AddItem */}
        {/* </LoadingButton> */}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
