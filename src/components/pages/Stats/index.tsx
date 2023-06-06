import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';

const Stats = () => {

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <Typography variant="h3" component="div"> Stats </Typography>
                <Divider />
                    
            </Box>
        </Container>
    );
};

export default Stats;
export const STATS_PATH = '/stats';
