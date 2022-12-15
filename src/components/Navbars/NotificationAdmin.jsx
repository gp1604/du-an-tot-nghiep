import React, { useEffect, useState } from 'react'
import './style.css'
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AdminNotification from "../../views/Realtime/AdminNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Notifications from "@mui/icons-material/Notifications";
import { API_GET_MARK_AS_READ_ADMIN } from "../../utils/const";
import axios from "axios";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AdminSize from "../../views/Realtime/AdminSize";


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




function NotificationAdmin() {
    const [countAdmin, setCountAdmin] = React.useState(0);
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
    const markAsRead = async () => {
        await axios.post(API_GET_MARK_AS_READ_ADMIN)
      setCountAdmin(0)
    }

    return (
        <div>
            <div style={{ display: "none" }}>
                <AdminNotification changeCount={(data) => setCountAdmin(data)} onClickClose={handleClose} />

            </div>

            <div style={{ display: "flex", alignItems: "center" }}
                className="notification">
                <Badge badgeContent={countAdmin} color="error"
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
                onClick={handleClick}
            >
                <div style={{ display: "flex", alignItems: "center" }}
                    className="notification">
                </div>
                <div style={{ color: 'white', marginBottom: '15px' }}>
                    <NotificationsNoneIcon />
                </div>
                {/* <span className="nav-link-inner--text">Thông báo</span> */}
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
                <AdminNotification changeCount={(data) => setCountAdmin(data)} onClickClose={handleClose} />
            </StyledMenu>
        </div>
    )
}

export default NotificationAdmin