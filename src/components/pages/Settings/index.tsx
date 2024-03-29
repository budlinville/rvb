import classes from './settings.module.css';

import { useLocalStorage } from "usehooks-ts";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import { DARK_MODE } from '../../../local-storage/keys';
import { Divider } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../ContextProvider';

const Settings = () => {
    const [isDarkTheme, setDarkTheme] = useLocalStorage(DARK_MODE, true);
    const { soundOn, setSoundOn } = useContext(AppContext);

    return (
        <Container>
            <Box sx={{ my: 2, mx: 2 }}>
                <Typography variant="h3" component="div"> Settings </Typography>
                <Divider />
                    <div className={classes.themeSwitchContainer}>
                        <Typography variant="h5" component="div"> LIGHT </Typography>
                            <Switch checked={ isDarkTheme } onChange={ () => setDarkTheme(prev => !prev) }/>
                        <Typography variant="h5" component="div"> DARK </Typography>
                    </div>

                    <div className={classes.themeSwitchContainer}>
                        <Typography variant="h5" component="div"> Sound On </Typography>
                            <Switch checked={ soundOn } onChange={ () => setSoundOn(prev => !prev) }/>
                        <Typography variant="h5" component="div"> Sound Off </Typography>
                    </div>
            </Box>
        </Container>
    );
};

export default Settings;
export const SETTINGS_PATH = '/settings';