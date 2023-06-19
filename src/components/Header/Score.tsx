import { useContext, useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";

import { AppContext } from "../ContextProvider";
import { ColorT } from "../pages/Home/Button"

import classes from './header.module.css';

interface Props {
    color: ColorT,
}

const Score = ({ color }: Props) => {
    const [transitioning, setTransitioning] = useState(false);
    const { counts: { red, blue }, redClicks, blueClicks } = useContext(AppContext);

    const count = color === 'red' ? red : blue;
    const clicks = color === 'red' ? redClicks : blueClicks;
    const badgeColor = color === 'red' ? 'primary' : 'secondary';

    useEffect(() => {
        setTransitioning(true);
        setTimeout(() => setTransitioning(false), 1000);
    }, [count])

    const containerClassName = `${classes.scoreContainer} ${classes[color]}`;
    const scoreClassName = transitioning ? classes.scoreTransition : classes.score;

    return (
        <div className={containerClassName}>
            <Badge className={classes.scoreBadge} badgeContent={ clicks } color={badgeColor}>
                <Typography className={scoreClassName} variant='body2'> { count.toLocaleString("en-US") } </Typography>
            </Badge>
        </div>
    );
};

export default Score;