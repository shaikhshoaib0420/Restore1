import { Backdrop, Box, CircularProgress, LinearProgress, Stack, Typography } from "@mui/material"

// interface Props {
//     message? : string;
// }




// const LoadingComponent = (props: Props) => {

//     return (
//         <Backdrop open={true} invisible={true}>
//             <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
//             <CircularProgress />
//             <Typography variant="h4">{}</Typography>
//             </Box>
//         </Backdrop>
//     )

// }

// const LoadingComponent = ({message}: any) => {
//     message = message != undefined ? message : "Loading...";

//     return (
//         <Backdrop open={true} invisible={true}>
//             <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
//                 <CircularProgress></CircularProgress>
//                 <Typography variant="h4" height="60%" sx={{justifyContent:'center', top:'60%', position:'fixed'}}>{message}</Typography>
//             </Box>
//         </Backdrop>
//     )
    
// }

// export default LoadingComponent;

interface Props {
    message: string;
}

export default function LoadingComponent({message = 'Loading'}: Props)  {
   
    return (
        <Backdrop open={true} invisible={true}>

            <Box justifyContent='center' display='flex' alignItems='center' height='100vh'>
                <Stack sx={{ width: '70%', color: 'grey.500' }} spacing={2}>
                    <Typography variant="h6">{message}</Typography>
                    <LinearProgress color="secondary" />
                    <LinearProgress color="success" />
                    <LinearProgress color="inherit" />
                </Stack>
            </Box>
        </Backdrop>
    )
}