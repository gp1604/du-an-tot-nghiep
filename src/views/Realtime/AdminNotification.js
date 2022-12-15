import React, { Fragment, useEffect, useState } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import axios from "axios";
import { MenuItem } from '@mui/material';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { green } from "@mui/material/colors";
import { API } from "../../utils/const";
import { NavLink } from 'react-router-dom';
import './style.css'

var stompClient = null;
const AdminNotification = (params) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        connect();
        getNotification();

    }, []);

    const connect = () => {
        let Sock = new SockJS(API + '/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        stompClient.subscribe('/notification/public', onMessageReceived);
    }


    const getNotification = async (e) => {
        const response = await axios.get(API + '/notification/')
        if (response.status === 200) {
            params.changeCount(response.data.filter((data) => data.checked === false).length)
            handleRequest(response.data)
        }
    }
    const handleRequest = (data) => {
        setData(data)
    }

    const onMessageReceived = (payload) => {
        getNotification();
    }

    const onError = (err) => {
        console.log(err);
    }

    return (
        <div className='scrollbarNoti' id='style-1'>
            {data.length > 0 ? data.map((data) => (
                <Fragment>
                    <NavLink to={'/admin/orderPlace'}>
                        <MenuItem sx={{ borderBottom: '1px solid #ddd' }} onClick={params.onClickClose}>
                            <li>
                                <div style={{ color: 'black' }} >{data.message}  </div>
                                <div style={{ color: 'rgb(177, 177, 177)' }} className='notification-time' > <Moment fromNow>{data.date}</Moment></div>
                            </li>
                        </MenuItem>
                    </NavLink>
                </Fragment>

            )) :
                <MenuItem >
                    <div >Hiện không có thông báo ! </div>
                    <div className='notification-time' > Bây giờ</div>
                </MenuItem>}
        </div>
    )
}


export default AdminNotification