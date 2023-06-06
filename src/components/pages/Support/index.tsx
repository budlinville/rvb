import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';

const Support = () => {

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <Typography variant="h3" component="div"> Support </Typography>
                <Divider />
                    
            </Box>
        </Container>
    );
};

export default Support;
export const SUPPORT_PATH = '/support';
