import { useState, MouseEvent as rMouseEvent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';

import { HOME_PATH } from '../pages/Home';
import { PROFILE_PATH } from '../pages/Profile';
import { AppContext } from '../ContextProvider';
import classNames from '../../utils/classNames';

import logo from '/rvb.png';
import classes from './header.module.css';


const ProfileMenu = () => {
    const navigate = useNavigate();

    const scoreTransitionSeconds: string = getComputedStyle(document.body).getPropertyValue('--SCORE-TRANSITION-SECONDS');
    const scoreTransitionMilliseconds: number = Number(scoreTransitionSeconds.substring(0,3)) * 1000;

    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const { userDetails, userCounts } = useContext(AppContext)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const [redCountDisplayValue, setRedCountsDisplayValue] = useState<number>(userCounts?.red);
    const [redCountTransitioning, setRedCountTransitioning] = useState(false);

    const [blueCountDisplayValue, setBlueCountsDisplayValue] = useState<number>(userCounts?.blue);
    const [blueCountTransitioning, setBlueCountTransitioning] = useState(false);

    //------------------------------------------------------------------------------------------------------------------
    // Effects
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        setRedCountTransitioning(true);
        setTimeout(() => setRedCountsDisplayValue(userCounts?.red), scoreTransitionMilliseconds);
        setTimeout(() => setRedCountTransitioning(false), scoreTransitionMilliseconds * 2);
    }, [userCounts?.red])

    useEffect(() => {
        setBlueCountTransitioning(true);
        setTimeout(() => setBlueCountsDisplayValue(userCounts?.blue), scoreTransitionMilliseconds);
        setTimeout(() => setBlueCountTransitioning(false), scoreTransitionMilliseconds * 2);
    }, [userCounts?.blue])

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    const userScoreClassName = (color: string, transitioning: boolean) => classNames(
        classes.score,
        classes.profileScore,
        (color === 'red') ? classes.red : classes.blue,
        transitioning && classes.scoreTransition || '',
    );

    const profileContainerClassName = `${classes.profileContainer} ${userCounts.red > userCounts.blue ? classes.red : classes.blue}`;

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const onOpenHandler = (e: rMouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
    const onCloseHandler = () => setAnchorEl(null);

    const onProfileClickHandler = () => navigate(PROFILE_PATH);

    const onLogoutHandler = () => {
        Auth.signOut();
        navigate(HOME_PATH);
    };

    //------------------------------------------------------------------------------------------------------------------
    // Render
    //------------------------------------------------------------------------------------------------------------------

    return (
        <div className={profileContainerClassName}>
            <div className={classes.userCountContainer}>
                <Typography className={ userScoreClassName( 'red', redCountTransitioning ) } variant='body2'>
                    { redCountDisplayValue?.toLocaleString("en-US") }
                </Typography>
                <Typography className={ userScoreClassName( 'blue', blueCountTransitioning ) } variant='body2'>
                    { blueCountDisplayValue?.toLocaleString("en-US") }
                </Typography>
            </div>
            <IconButton
                onClick         ={ onOpenHandler }
                aria-controls   ={ !!anchorEl ? 'basic-menu' : undefined }
                aria-haspopup   ='true'
                size            ='small'
            >
                <Avatar src={logo} />
            </IconButton>
            <Menu anchorEl  ={ anchorEl }
                open        ={ !!anchorEl} sx={{ x: 2 } }
                onClose     ={ onCloseHandler }
            >
                <MenuItem onClick={onProfileClickHandler}> { userDetails?.email } </MenuItem>
                <Divider />
                <MenuItem onClick={ onLogoutHandler }>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
};

export default ProfileMenu;