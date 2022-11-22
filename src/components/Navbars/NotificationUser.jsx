import React from 'react'
import './style.css'
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Notifications from '@mui/icons-material/Notifications';
import axios from 'axios';
import { API_GET_TEST } from 'utils/const';
import AdminNotification from 'views/Realtime/AdminNotification';
import UserNotification from 'views/Realtime/UserNotification';
import jwt_decode from "jwt-decode";
import { API_GET_MARK_AS_READ } from 'utils/const';
import UserSize from 'views/Realtime/UserSize';


function Notification() {
    let decoded;

    let token = localStorage.getItem("token");
    if (token !== null) {
        decoded = jwt_decode(token);
    }
    const [countUser, setUserCount] = React.useState(0);


    const markAsRead = async () => {
        const response = await axios.post(API_GET_MARK_AS_READ + Number(decoded.sub.slice(0, 1)))
        console.log('go here mark as read');
    }

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        markAsRead()
        setUserCount(0)
        setOpen((prevOpen) => !prevOpen);

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
            setUserCount(0)
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <React.Fragment>
            <Stack direction="row" style={{ cursor: 'pointer' }} spacing={2}>
                <div className='menu-lv2-noti'>
                    <p
                        style={{ margin: "0" }}
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}>


                        <div style={{ display: "flex", alignItems: "center" }} class="notification">
                            <Notifications style={{ width: "21px", height: "21px", marginLeft: "-2px" }} />
                            <span style={{ color: "#172b4d !important", fontWeight: "400" }} className="nav-link-inner--text">Thông báo</span>
                            {countUser !== 0 ? <span class="badge">{countUser}</span> : ''}

                            {/* <span> <NotificationsNoneIcon /></span> */}
                        </div>

                        {/* <div style={{ display: 'none' }}>
                            <UserNotification changeCount={(data) => setUserCount(data)} />
                        </div> */}
                        <UserSize changeUserCount={(data) => setUserCount(data)}></UserSize>
                    </p>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}>
                                <Paper>
                                    <div className="scrollbar" id="style-1">
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList
                                                style={{ width: '335px', position: 'relative' }}
                                                autoFocusItem={open}
                                                onClick={handleClose}
                                                id="composition-menu"
                                                aria-labelledby="composition-button"
                                                onKeyDown={handleListKeyDown}>
                                                <UserNotification changeUserCount={(data) => setUserCount(data)} />
                                            </MenuList>
                                        </ClickAwayListener>
                                    </div>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </Stack>

        </React.Fragment>
    )
}

export default Notification