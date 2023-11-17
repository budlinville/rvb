import { useNavigate } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import SettingsIcon from '@mui/icons-material/Settings';

import CottageIcon from '@mui/icons-material/Cottage';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
// import SettingsIcon from '@mui/icons-material/Settings';

import { HOME_PATH } from '../pages/Home';
import { ABOUT_PATH } from '../pages/About';
import { STATS_PATH } from '../pages/Stats';
import { SETTINGS_PATH } from '../pages/Settings';
// import { SETTINGS_PATH } from '../pages/Settings';


//----------------------------------------------------------------------------------------------------------------------


interface DrawerPageT {
    id: number;
    label: string;
    route: string;
    icon: JSX.Element;
};

interface DividerT { id: number, divider: boolean };

const menuItems: (DrawerPageT | DividerT)[] = [
    { id: 1, label: 'Home',     route: HOME_PATH,       icon: <CottageIcon /> },
    { id: 2, divider: true },
    { id: 3, label: 'Stats',    route: STATS_PATH,      icon: <AssessmentIcon /> },
    { id: 4, label: 'About',    route: ABOUT_PATH,      icon: <ImportContactsIcon /> },
    // { id: 5, label: 'Support',  route: SUPPORT_PATH,    icon: <AccessibilityNewIcon /> },
    // { id: 6, divider: true },
];

const menuFooterItems: (DrawerPageT | DividerT)[] = [
    { id: 7, label: 'Settings', route: SETTINGS_PATH,   icon: <SettingsIcon /> },
];


//----------------------------------------------------------------------------------------------------------------------
interface MenuListProps {
    items: (DrawerPageT | DividerT)[];
    onClick: (route: string) => void;
};

const MenuList = ({ items, onClick }: MenuListProps) => (
    <Box role='presentation' sx={{ width:  250 }}>
        <List>
            { items.map( item => {
                if ((item as DividerT).divider)
                return <Divider key={item.id} />;
                
                const page = item as DrawerPageT;
                return (
                    <ListItem key={page.id} disablePadding>
                        <ListItemButton onClick={ () => onClick(page.route) }>
                            <ListItemIcon>
                                { page.icon }
                            </ListItemIcon>
                            <ListItemText primary={page.label} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    </Box>
);

//----------------------------------------------------------------------------------------------------------------------

interface SideDrawerProps {
    open: boolean;
    onClose: () => void;
};

const SideDrawer = ({ open, onClose }: SideDrawerProps) => {
    const navigate = useNavigate();

    const onBoxClickHandler = (route: string) => {
        onClose();
        navigate(route);
    };
    
    return (
        <Drawer
            anchor  ='left'
            open    ={ open }
            onClose ={ onClose }
        >
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <MenuList items={menuItems} onClick={ onBoxClickHandler }/>
                <MenuList items={menuFooterItems} onClick={ onBoxClickHandler }/>
            </div>
        </Drawer>
    );
};


export default SideDrawer;
