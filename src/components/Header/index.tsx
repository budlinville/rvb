import { ReactElement, useContext, useRef, useState } from 'react';
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
import LinearProgress from '@mui/material/LinearProgress';
import Badge from '@mui/material/Badge';

import ScrollTop from './ScrollTop';
import HideOnScroll from './HideOnScroll';
import SideDrawer from './SideDrawer';
import ProfileMenu from './ProfileMenu';

import useAuth from '../../hooks/useAuth';
import useHeaderHeight from '../../hooks/useHeaderHeight';
import useWindowWidth from '../../hooks/useWindowWidth';
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
    const { loading, counts: { red, blue }, redClicks, blueClicks, setRedClicks, setBlueClicks } = useContext(AppContext);

    const navigate = useNavigate();
    const headerAnchorRef = useRef<HTMLDivElement>(null);

    const [userDetails, _] = useAuth();
    const windowWidth = useWindowWidth();
    const headerHeight = useHeaderHeight();

    // Event Handlers
    const onMenuClick = () => setDrawerOpen(true);
    const onLoginClick = () => navigate(LOGIN_PATH);

    const redShare = Math.round(red / (red + blue) * 100)
    const isMobile = windowWidth < 600;

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

                        <div className={classes.titleContainer}>
                            <Badge badgeContent={ redClicks } sx={{ mr: 2 }} color='primary'>
                                <Typography variant='body2'> ({ red.toLocaleString("en-US") }) </Typography>
                            </Badge>

                            { isMobile
                                ? <Typography variant='h6' className={classes.title}> RVB </Typography>
                                : <>
                                    <Button
                                        variant="contained"
                                        sx={{ width: 110 }}
                                        onClick={ () => setRedClicks(prev => ++prev) }
                                    >
                                        Red Team
                                    </Button>
                                    <Typography variant='h6' className={classes.title}> VS </Typography>
                                    <Button
                                        variant="contained"
                                        color='secondary'
                                        sx={{ width: 110 }}
                                        onClick={ () => setBlueClicks(prev => ++prev) }
                                    >
                                        Blue Team
                                    </Button>
                                </>
                            }

                            <Badge badgeContent={ blueClicks } sx={{ ml: 2 }} color='secondary'>
                                <Typography variant='body2'> ({ blue.toLocaleString("en-US") }) </Typography>
                            </Badge>
                        </div>
                        { !!userDetails
                            ? <ProfileMenu />
                            : <Button color='inherit' onClick={ onLoginClick }> Login / Signup </Button>
                        }
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
