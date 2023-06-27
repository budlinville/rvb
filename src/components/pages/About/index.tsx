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
                    This project started as all great projects start - after 12 too many beers in college, lying on my couch thinking about ways to make money. I've always been attracted to building out applications that people can use to improve their lives. This application is not that. This application is merely a way for me to fine-tune my development skills, but may also serve as a fun social experiment.
                </Typography>
                <br />
                <Typography variant={typographyVariant}>
                    That being said, please visit my <Link className={classes.link} to={SUPPORT_PATH}>Support</Link> page if you enjoyed this application and want to sponsor me as I build more productive applications!
                </Typography>
                <div style={{ height: '2rem' }}/>
            </Box>
        </Container>
    );
};

export default About;
export const ABOUT_PATH = '/about';