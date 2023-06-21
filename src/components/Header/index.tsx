import { ReactElement, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LinearProgress from '@mui/material/LinearProgress';

import ScrollTop from './ScrollTop';
import HideOnScroll from './HideOnScroll';
import SideDrawer from './SideDrawer';
import ProfileMenu from './ProfileMenu';
import Title from './Title';
import Score from './Score';

import useAuth from '../../hooks/useAuth';
import useHeaderHeight from '../../hooks/useHeaderHeight';
import { LOGIN_PATH } from '../pages/Login';
import { AppContext } from '../ContextProvider';

import classes from './header.module.css';


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
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { loading, counts: { red, blue } } = useContext(AppContext);

    const navigate = useNavigate();
    const headerAnchorRef = useRef<HTMLDivElement>(null);

    const [userDetails, _] = useAuth();
    const headerHeight = useHeaderHeight();

    // Event Handlers
    const onMenuClick = () => setDrawerOpen(true);
    const onLoginClick = () => navigate(LOGIN_PATH);

    const redShare = Math.round(red / (red + blue) * 100)

    return (
        <>
            <CssBaseline />

            <HideOnScroll enable={ enableHideOnScroll }>
                <AppBar>
                    <Toolbar className={classes.toolbar} style={{ height: headerHeight }}>
                        <div className={`${classes.headerSideItemContainer} ${classes.left}`}>
                            <IconButton aria-label='menu'
                                edge    ='start'
                                color   ='inherit'
                                sx      ={{ mr: 2 }}
                                onClick ={ onMenuClick }
                            >
                                <MenuIcon />
                            </IconButton>
                        </div>


                        <div className={classes.titleContainer}>
                            <Score color='red'/>
                            <Title />
                            <Score color='blue'/>
                        </div>

                        <div className={`${classes.headerSideItemContainer} ${classes.right}`}>
                            { !!userDetails
                                ? <ProfileMenu />
                                : <Button color='inherit' onClick={ onLoginClick }> Login / Signup </Button>
                            }
                        </div>
                    </Toolbar>
                    <LinearProgress variant={ loading ? 'indeterminate' : 'determinate' } value={redShare} />
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
