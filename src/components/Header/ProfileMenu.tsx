import { useState, MouseEvent as rMouseEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { HOME_PATH } from '../pages/Home';
import { AppContext } from '../ContextProvider';

import logo from '/rvb.png';


const ProfileMenu = () => {
    const { userDetails } = useContext(AppContext)

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const onOpenHandler = (e: rMouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
    const onCloseHandler = () => setAnchorEl(null);
    const onLogoutHandler = () => {
        Auth.signOut();
        navigate(HOME_PATH);
    };

    return (
        <>
            <IconButton
                onClick         ={ onOpenHandler }
                aria-controls   ={ !!anchorEl ? 'basic-menu' : undefined }
                aria-haspopup   ='true'
            >
                <Avatar src={logo} />
            </IconButton>
            <Menu anchorEl  ={ anchorEl }
                open        ={ !!anchorEl} sx={{ x: 2 } }
                onClose     ={ onCloseHandler }
            >
                <MenuItem> { userDetails?.email } </MenuItem>
                <Divider />
                <MenuItem onClick={ onLogoutHandler }>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default ProfileMenu;