import { ReactElement, useRef, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    IconButton,
    Fab,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import ScrollTop from './ScrollTop';
import HideOnScroll from './HideOnScroll';
import useHeaderHeight from '../../hooks/useHeaderHeight';
import SideDrawer from './SideDrawer';


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
    const [drawerOpen, setDrawerOpen] = useState(false);

    const headerAnchorRef = useRef<HTMLDivElement>(null);
    const headerHeight = useHeaderHeight();

    const onMenuClick = () => setDrawerOpen(true);

    return (
        <>
            <CssBaseline />

            <HideOnScroll enable={ enableHideOnScroll }>
                <AppBar>
                    <Toolbar style={{ height: headerHeight }}>
                        <IconButton aria-label='menu'
                            edge    ='start'
                            color   ='inherit'
                            sx      ={{ mr: 2 }}
                            onClick ={ onMenuClick }
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant={APP_NAME_VARIANT}> { APP_NAME } </Typography>
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