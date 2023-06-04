import { ReactElement, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import ScrollTop from './ScrollTop';
import HideOnScroll from './HideOnScroll';
import SideDrawer from './SideDrawer';
import ProfileMenu from './ProfileMenu';

import useAuth from '../../hooks/useAuth';
import useHeaderHeight from '../../hooks/useHeaderHeight';
import { LOGIN_PATH } from '../pages/Login';

import classes from './header.module.css';


const APP_NAME = 'Red Team VS Blue Team';
const APP_NAME_VARIANT = 'h6';


interface Props {
    enableHideOnScroll?: boolean;
    enableScrollTop?: boolean;
    children: ReactElement;
}


export const Header = ({
    enableHideOnScroll=true,
    enableScrollTop=true,
    children,
}: Props) => {
    const [userDetails, _] = useAuth();
    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const headerAnchorRef = useRef<HTMLDivElement>(null);
    const headerHeight = useHeaderHeight();

    const onMenuClick = () => setDrawerOpen(true);
    const onLoginClick = () => navigate(LOGIN_PATH);

    return (
        <>
            <CssBaseline />

            <HideOnScroll enable={ enableHideOnScroll }>
                <AppBar>
                    <Toolbar className={classes.toolbar} style={{ height: headerHeight }}>
                        <IconButton aria-label='menu'
                            edge    ='start'
                            color   ='inherit'
                            sx      ={{ mr: 2 }}
                            onClick ={ onMenuClick }
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant={APP_NAME_VARIANT}> { APP_NAME } </Typography>

                        { !!userDetails
                            ? <ProfileMenu />
                            : <Button color='inherit' onClick={ onLoginClick }> Login / Signup </Button>
                        }
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            {/* This guantees the page always treats a Header as present */}
            <Toolbar ref={headerAnchorRef} style={{ height: headerHeight }} />

            { children }

            { enableScrollTop && (
                <ScrollTop headerRef={headerAnchorRef}>
                    <Fab size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
            )}

            <SideDrawer open={drawerOpen} onClose={ () => setDrawerOpen(false)} />
        </>
    );
};


export default Header;