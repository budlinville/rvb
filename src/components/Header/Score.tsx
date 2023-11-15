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
    const [scoreTransitioning, setScoreTransitioning] = useState(false);
    const [userScoreTransitioning, setUserScoreTransitioning] = useState(false);
    const {
        userDetails,
        counts: { red, blue },
        userCounts: { red: userRed, blue: userBlue },
        redClicks,
        blueClicks
    } = useContext(AppContext);

    const scoreTransitionSeconds: string = getComputedStyle(document.body).getPropertyValue('--SCORE-TRANSITION-SECONDS');
    const scoreTransitionMilliseconds: number = Number(scoreTransitionSeconds.substring(0,3)) * 1000;

    const badgeColor = color === 'red' ? 'primary' : 'secondary';
    const count = color === 'red' ? red : blue;
    const userCount = color === 'red' ? userRed : userBlue;
    const clicks = color === 'red' ? redClicks : blueClicks;

    // Arguably hacky, but this helps accomplish the following: fade-in, change value, fade-out
    // Without this extra state variable, it would go like this: change value, fade-in, fade-out
    const [countsDisplayValue, setCountsDisplayValue] = useState(clicks);
    const [userCountsDisplayValue, setUserCountsDisplayValue] = useState(clicks);

    useEffect(() => {
        setScoreTransitioning(true);
        setTimeout(() => setCountsDisplayValue(count), scoreTransitionMilliseconds);
        setTimeout(() => setScoreTransitioning(false), scoreTransitionMilliseconds * 2);
    }, [count]);

    useEffect(() => {
        setUserScoreTransitioning(true);
        setTimeout(() => setUserCountsDisplayValue(userCount), scoreTransitionMilliseconds);
        setTimeout(() => setUserScoreTransitioning(false), scoreTransitionMilliseconds * 2);
    }, [userCount])

    const containerClassName = `${classes.scoreContainer} ${classes[color]}`;
    const scoreClassName = scoreTransitioning ? classes.scoreTransition : classes.score;
    const userScoreClassName = userScoreTransitioning ? classes.scoreTransition : classes.score;

    return (
        <div className={containerClassName}>
            <Badge className={classes.scoreBadge}
                badgeContent={ clicks }
                color={badgeColor}
                style={{ alignItems: color === 'red' ? 'flex-end' : 'flex-start' }}
            >
                <Typography className={scoreClassName} variant='body2'> { countsDisplayValue?.toLocaleString("en-US") } </Typography>
                { userDetails && <Typography className={userScoreClassName} variant='body2'> ({ userCountsDisplayValue?.toLocaleString("en-US") }) </Typography> }
            </Badge>
        </div>
    );
};

export default Score;