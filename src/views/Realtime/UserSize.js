import React, { useEffect, useState } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { MenuItem } from '@mui/material';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { API } from "../../utils/const";


var stompClient = null;
const UserSize = (params) => {
    useEffect(() => {
        connect();
        getNotification();
    }, []);

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


    const getNotification = async (e) => {
        const response = await axios.get(API + '/notification/?id=' + Number(decoded.sub.slice(0, 1)))
        if (response.status === 200) {
            params.changeUserCount(response.data.filter((data) => data.checked === false).length)
        }
    }


    const onMessageReceived = (data) => {
        getNotification();
        toast.success(data, { autoClose: 2000 })
    }

    const onError = (err) => {
        console.log(err);
    }

    //message, date,type,status
}


export default UserSize