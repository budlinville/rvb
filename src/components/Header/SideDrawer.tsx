import { useNavigate } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import CottageIcon from '@mui/icons-material/Cottage';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import SettingsIcon from '@mui/icons-material/Settings';

import { HOME_PATH } from '../pages/Home';
import { ABOUT_PATH } from '../pages/About';
import { SUPPORT_PATH } from '../pages/Support';
import { STATS_PATH } from '../pages/Stats';
import { SETTINGS_PATH } from '../pages/Settings';


//----------------------------------------------------------------------------------------------------------------------


interface DrawerPagesT {
    id: number;
    label: string;
    route: string;
    icon: JSX.Element;
};

enum DividerT { DIVIDER };

const pages: (DrawerPagesT | DividerT)[] = [
    { id: 1, label: 'Home',     route: HOME_PATH,       icon: <CottageIcon /> },
    DividerT.DIVIDER,
    { id: 2, label: 'About',    route: ABOUT_PATH,      icon: <ImportContactsIcon /> },
    { id: 3, label: 'Support',  route: SUPPORT_PATH,    icon: <AccessibilityNewIcon /> },
    { id: 4, label: 'Stats',    route: STATS_PATH,      icon: <AssessmentIcon /> },
    { id: 5, label: 'Settings', route: SETTINGS_PATH,   icon: <SettingsIcon /> },
];


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
            <Box role='presentation' sx={{ width:  250 }}>
                <List>
                    { pages.map( page => {
                        if (page === DividerT.DIVIDER)
                            return <Divider />;

                        return (
                            <ListItem key={page.id} disablePadding>
                                <ListItemButton onClick={ () => onBoxClickHandler(page.route) }>
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
        </Drawer>
    );
};


export default SideDrawer;
