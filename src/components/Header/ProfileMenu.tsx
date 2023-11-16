import { useState, MouseEvent as rMouseEvent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { HOME_PATH } from '../pages/Home';
import { PROFILE_PATH } from '../pages/Profile';
import { AppContext } from '../ContextProvider';

import logo from '/rvb.png';
import classes from './header.module.css';
import Typography from '@mui/material/Typography';


const ProfileMenu = () => {
    const navigate = useNavigate();
    
    const scoreTransitionSeconds: string = getComputedStyle(document.body).getPropertyValue('--SCORE-TRANSITION-SECONDS');
    const scoreTransitionMilliseconds: number = Number(scoreTransitionSeconds.substring(0,3)) * 1000;

    //------------------------------------------------------------------------------------------------------------------
    // State
    //------------------------------------------------------------------------------------------------------------------
    const { userDetails, userCounts } = useContext(AppContext)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [userCountsDisplayValue, setUserCountsDisplayValue] = useState<{red: number, blue: number}>(userCounts);
    const [userScoreTransitioning, setUserScoreTransitioning] = useState(false);

    //------------------------------------------------------------------------------------------------------------------
    // Effects
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        setUserScoreTransitioning(true);
        setTimeout(() => setUserCountsDisplayValue(userCounts), scoreTransitionMilliseconds);
        setTimeout(() => setUserScoreTransitioning(false), scoreTransitionMilliseconds * 2);
    }, [userCounts])

    //------------------------------------------------------------------------------------------------------------------
    // Styling
    //------------------------------------------------------------------------------------------------------------------
    const userScoreClassName = userScoreTransitioning ? classes.scoreTransition : classes.score;
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
                <Typography className={ userScoreClassName } variant='body2'>
                    { userCountsDisplayValue?.red?.toLocaleString("en-US") }
                </Typography>
                <Typography className={ userScoreClassName } variant='body2'>
                    { userCountsDisplayValue?.blue?.toLocaleString("en-US") }
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