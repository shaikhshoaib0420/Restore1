import { Container, Divider, Typography } from "@mui/material"
import { useLocation } from "react-router-dom";

const ServerError = () => {
    const {state} = useLocation();
    const parsedError = JSON.parse(state.error);
    return (
        <Container>
            {   state?.error ? 
                (
                    <>
                        <Typography variant="h3" color="secondary" gutterBottom>
                            {parsedError.title}
                        </Typography>
                        <Divider />
                        <Typography variant="body1">
                            {parsedError.detail || 'Internal Server Error'}
                        </Typography>
                    </>
                )
                : 
                <Typography variant="h5">Server Error</Typography>
            }
        </Container>  
    )
}

export default ServerError;