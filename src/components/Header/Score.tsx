import { useContext, useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";

import { AppContext } from "../ContextProvider";
import { ColorT } from "../pages/Home/Button"

import classes from './header.module.css';
import classNames from "../../utils/classNames";
import { DARK_MODE } from "../../local-storage/keys";
import { useLocalStorage } from "usehooks-ts";

interface Props {
    color: ColorT,
}

const Score = ({ color }: Props) => {
    const [scoreTransitioning, setScoreTransitioning] = useState(false);
    const {
        counts: { red, blue },
        userCounts: { red: userRed, blue: userBlue },
        redClicks,
        blueClicks
    } = useContext(AppContext);

    const [darkMode, _] = useLocalStorage(DARK_MODE, true);

    const scoreTransitionSeconds: string = getComputedStyle(document.body).getPropertyValue('--SCORE-TRANSITION-SECONDS');
    const scoreTransitionMilliseconds: number = Number(scoreTransitionSeconds.substring(0,3)) * 1000;

    const badgeColor    = color === 'red' ? 'primary' : 'secondary';
    const count         = color === 'red' ? red : blue;
    const clicks        = color === 'red' ? redClicks : blueClicks;

    // Arguably hacky, but this helps accomplish the following: fade-in, change value, fade-out
    // Without this extra state variable, it would go like this: change value, fade-in, fade-out
    const [countsDisplayValue, setCountsDisplayValue] = useState(clicks);

    useEffect(() => {
        setScoreTransitioning(true);
        setTimeout(() => setCountsDisplayValue(count), scoreTransitionMilliseconds);
        setTimeout(() => setScoreTransitioning(false), scoreTransitionMilliseconds * 2);
    }, [count]);

    const containerClassName = classNames(classes.scoreContainer, classes[color]);
    const scoreClassName = classNames(
        scoreTransitioning ? classes.scoreTransition : classes.score,
        userRed > userBlue ? classes.red : classes.blue,
        darkMode ? classes.dark : classes.light,
    );

    return (
        <div className={containerClassName}>
            <Badge className={classes.scoreBadge}
                badgeContent={ clicks }
                color={badgeColor}
                style={{ alignItems: color === 'red' ? 'flex-end' : 'flex-start' }}
            >
                <Typography className={scoreClassName} variant='h4'>
                    { countsDisplayValue?.toLocaleString("en-US") }
                </Typography>
            </Badge>
        </div>
    );
};

export default Score;