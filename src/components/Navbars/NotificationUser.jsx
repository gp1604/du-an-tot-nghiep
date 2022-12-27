import React, { useEffect } from 'react'
import './style.css'
import Notifications from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import axios from 'axios';
import UserNotification from 'views/Realtime/UserNotification';
import jwt_decode from "jwt-decode";
import { API_GET_MARK_AS_READ } from 'utils/const';
import { alpha, styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";


const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

function Notification() {
    let decoded;

    let token = localStorage.getItem("token");
    if (token !== null) {
        decoded = jwt_decode(token);
    }
    const [countUser, setUserCount] = React.useState(0);

    const markAsRead = async () => {
        await axios.post(API_GET_MARK_AS_READ + decoded.id)
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        markAsRead()
    };
    const handleClose = () => {
        setAnchorEl(null);
        markAsRead()
    };

    useEffect(() => {

    }, [countUser]);


    return (
        <div>
            <div style={{ display: 'none' }}>
                <UserNotification changeUserCount={(data) => setUserCount(data)} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}
                className="notification">
                <Badge badgeContent={countUser} color="error"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}>
                </Badge >

            </div>
            <div
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                style={{ cursor: 'pointer' }}
                onClick={handleClick}

            >
                <NotificationsNoneIcon />
                <span className="nav-link-inner--text">Thông báo</span>
            </div>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <UserNotification onClickClose={handleClose} changeUserCount={(data) => setUserCount(data)} />
            </StyledMenu>
        </div>
    )
}

export default Notification