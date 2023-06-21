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

    const scoreTransitionSeconds: string = getComputedStyle(document.body).getPropertyValue('--SCORE-TRANSITION-SECONDS');
    const scoreTransitionMilliseconds: number = Number(scoreTransitionSeconds.substring(0,3)) * 1000;

    const badgeColor = color === 'red' ? 'primary' : 'secondary';
    const count = color === 'red' ? red : blue;
    const clicks = color === 'red' ? redClicks : blueClicks;

    // Arguably hacky, but this helps accomplish the following: fade-in, change value, fade-out
    // Without this extra state variable, it would go like this: change value, fade-in, fade-out
    const [clicksDisplayValue, setClicksDisplayValue] = useState(clicks);

    useEffect(() => {
        setTransitioning(true);
        setTimeout(() => setClicksDisplayValue(count), scoreTransitionMilliseconds);
        setTimeout(() => setTransitioning(false), scoreTransitionMilliseconds * 2);
    }, [count])

    const containerClassName = `${classes.scoreContainer} ${classes[color]}`;
    const scoreClassName = transitioning ? classes.scoreTransition : classes.score;

    return (
        <div className={containerClassName}>
            <Badge className={classes.scoreBadge} badgeContent={ clicks } color={badgeColor}>
                <Typography className={scoreClassName} variant='body2'> { clicksDisplayValue.toLocaleString("en-US") } </Typography>
            </Badge>
        </div>
    );
};

export default Score;