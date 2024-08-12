import { Height } from "@mui/icons-material";
import { Button, Container, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container sx={{height: 20}}>
            <Typography gutterBottom variant="h3" color='secondary'>
                Oops we don't find what you are looking for!
            </Typography>
            <Divider />
            <Button component={Link} to='/catalog' >Go Back</Button>
        </Container>
    )
}