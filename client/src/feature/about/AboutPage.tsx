import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material"
import agent from "../../api/agent";
import { useState } from "react";


const AboutPage = () => {
    const [validationErrors, setValidaionErrors] = useState<string[]>([]);
    function getValidationsErrors() {
            agent.testErrors.get400ValidationError()
            .then(res => console.log("we should not see this!")).catch(err => {
                console.log(err);
                setValidaionErrors(err);
            })
        }
    
    return (
        <Container>
        <Typography variant="h3">
            About Page
        </Typography>
        <ButtonGroup
        disableElevation
        variant="contained"
        aria-label="Disabled button group"
        >
        <Button onClick={() => agent.testErrors.get400Error().catch(err => console.log(err))}>Get 400 Bad Request</Button>
        <Button onClick={() => agent.testErrors.get404Error().catch(err => console.log(err))}>Get 404 Not Found</Button>
        <Button onClick={() => agent.testErrors.get401Error().catch(err => console.log(err))}>Get 401 Error</Button>
        <Button onClick={() => agent.testErrors.get500Error().catch(err => console.log(err))}>Get 500 Server Error</Button>
        <Button onClick={getValidationsErrors}>Get 400 Bad Request</Button>
        </ButtonGroup>

        {validationErrors.length > 0 && 
            <Alert>
                <AlertTitle>Validation Messages</AlertTitle>
                <List>
                    {validationErrors.map(err => (
                        <ListItem key={err}>{err}</ListItem>
                    ))}
                </List>
            </Alert>
        }
        </Container>
        

        
    )
}

export default AboutPage;