import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import Drawer from '@mui/material/Drawer';
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from '@mui/material/ListItemIcon';

import CottageIcon from '@mui/icons-material/Cottage';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SettingsIcon from '@mui/icons-material/Settings';

import { HOME_PATH } from '../pages/Home';
import { ABOUT_PATH } from '../pages/About';
import { SUPPORT_PATH } from '../pages/Support';
import { STATS_PATH } from '../pages/Stats';
import { SETTINGS_PATH } from '../pages/Settings';


//----------------------------------------------------------------------------------------------------------------------


interface DrawerPages {
    id: number;
    label: string;
    route: string;
    icon: JSX.Element;
};

const pages: DrawerPages[] = [
    { id: 1, label: 'Home',     route: HOME_PATH,       icon: <CottageIcon /> },
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
                    { pages.map( page => (
                        <ListItem key={page.id} disablePadding>
                            <ListItemButton onClick={ () => onBoxClickHandler(page.route) }>
                                <ListItemIcon>
                                    { page.icon }
                                </ListItemIcon>
                                <ListItemText primary={page.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Divider />

                <List>
                    <ListItem key={1} disablePadding>
                        <ListItemButton onClick={ () => Auth.signOut().then( () => navigate(HOME_PATH)) }>
                            <ListItemIcon>
                                <MeetingRoomIcon />
                            </ListItemIcon>
                            <ListItemText primary='Logout' />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default SideDrawer;
