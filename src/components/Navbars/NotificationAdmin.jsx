import React from 'react'
import './style.css'
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import axios from 'axios';
import AdminNotification from 'views/Realtime/AdminNotification';

import { API_GET_MARK_AS_READ_ADMIN } from 'utils/const';
import AdminSize from 'views/Realtime/AdminSize';


function NotificationAdmin() {

    const [countAdmin, setCountAdmin] = React.useState(0);


    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        markAsRead()
        setCountAdmin(0)
        setOpen((prevOpen) => !prevOpen);
    };
    const markAsRead = async () => {
        await axios.post(API_GET_MARK_AS_READ_ADMIN)
    }
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
            markAsRead()
            setCountAdmin(0)
        }
        prevOpen.current = open;
    }, [open]);


    return (
        <>

            <React.Fragment>
                <AdminSize changeCount={(data) => setCountAdmin(data)} ></AdminSize>
                <Stack direction="row" spacing={2}>

                    <div className='menu-lv2-noti'>
                        <p
                            style={{ color: 'white' }}
                            ref={anchorRef}
                            id="composition-button"
                            aria-controls={open ? 'composition-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}>
                            <p class="notification">
                                <span> <NotificationsNoneIcon /></span>
                                {countAdmin !== 0 ? <span class="badge">{countAdmin}</span> : ''}
                            </p>
                            {/* <AdminNotification changeCount={(data) => setCountAdmin(data)} /> */}

                        </p>
                        <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            placement="bottom-start"
                            transition
                            disablePortal >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}>
                                    <Paper>
                                        <div className="scrollbar" id="style-1">
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList
                                                    autoFocusItem={open}
                                                    onClick={handleClose}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown}>
                                                    <AdminNotification changeCount={(data) => setCountAdmin(data)} />
                                                </MenuList>
                                            </ClickAwayListener>
                                        </div>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </Stack>

            </React.Fragment></>

    )
}

export default NotificationAdmin