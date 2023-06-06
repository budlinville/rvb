import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';

const About = () => {

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <Typography variant="h3" component="div"> About </Typography>
                <Divider />
                    
            </Box>
        </Container>
    );
};

export default About;
export const ABOUT_PATH = '/about';