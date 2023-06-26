import { useContext } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { AppContext } from "../ContextProvider";
import useWindowWidth from "../../hooks/useWindowWidth";

import classes from './header.module.css'

const Title = () => {
    const { setRedClicks, setBlueClicks } = useContext(AppContext);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth < 600;

    return isMobile
            ? <Typography variant='h6' className={classes.titleAbbreviated}> RVB </Typography>
            : <>
                <Button
                    variant="contained"
                    sx={{ width: 120 }}
                    onClick={ () => setRedClicks(prev => ++prev) }
                >
                    Red Team
                </Button>
                <Typography variant='h6' className={classes.vs}> VS </Typography>
                <Button
                    variant="contained"
                    color='secondary'
                    sx={{ width: 120 }}
                    onClick={ () => setBlueClicks(prev => ++prev) }
                >
                    Blue Team
                </Button>
            </>
}


export default Title;