import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { SUPPORT_PATH } from '../Support';

import classes from './about.module.css';
import useWindowWidth from '../../../hooks/useWindowWidth';

const About = () => {
    const width = useWindowWidth();
    const typographyVariant = width < 600 ? 'h5' : 'h4';

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <Typography variant='h3' component='div'> About </Typography>
                <Divider sx={{ my: 2 }}/>
                <Typography variant={typographyVariant}>
                    This project began like many great projects do - with a moment of inspiration fueled by a few too many beers during my college days. As I lay on my couch, contemplating ways to make money, my passion for creating applications that enhance people's lives took hold. However, this particular project deviates from that goal. Instead, it serves as a platform for me to refine my development skills while also embarking on an enjoyable social experiment. Maybe I'll find a way to monetize this in the near future, but for now, you can help by joining the RVB fight!
                </Typography>
                <div style={{ height: '2rem' }}/>
            </Box>
        </Container>
    );
};

export default About;
export const ABOUT_PATH = '/about';