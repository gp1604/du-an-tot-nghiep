import React, { Fragment, useEffect, useState } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { MenuItem } from '@mui/material';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { API } from "../../utils/const";
import { NavLink } from 'react-router-dom';


var stompClient = null;
const UserNotification = (params) => {
    const [data, setData] = useState([]);


    let decoded;
    let token = localStorage.getItem("token");
    if (token !== null) {
        decoded = jwt_decode(token);
    }


    const connect = () => {
        let Sock = new SockJS(API + '/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        stompClient.subscribe('/user/' + Number(decoded.sub.slice(0, 1)) + '/private', onMessageReceived);
    }


    const getNotification = async () => {
        const response = await axios.get(API + '/notification/?id=' + Number(decoded.sub.slice(0, 1)))
        if (response.status === 200) {
            handleRequest(response.data)
            params.changeUserCount(response.data.filter((data) => data.checked === false).length)
        }
    }
    const handleRequest = (data) => {
        setData(data)
    }

    const onMessageReceived = (payload) => {
        setData(data => [JSON.parse(payload.body), ...data])
    }

    const onError = (err) => {
        console.log(err);
    }

    useEffect(() => {
        connect();
        getNotification();
    }, []);
    //message, date,type,status
    return (
        <>
            {data.length > 0 ? data?.map((data, index) => (
                <Fragment>
                    <NavLink to={'/auth/order/' + data.targetId}>
                        <MenuItem key={index} sx={{ borderBottom: '1px solid #ddd' }} >
                            <div style={{ color: 'black' }} >{data.message}  </div>
                            <div className='notification-time' > <Moment fromNow>{data.date}</Moment></div>
                        </MenuItem>
                    </NavLink>
                </Fragment>
            )) :
                <MenuItem >
                    <div  >Hiện không có thông báo ! </div>
                    <div className='notification-time' >Bây giờ</div>
                </MenuItem>}
        </>
    )
}


export default UserNotification