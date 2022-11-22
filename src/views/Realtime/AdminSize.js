import React, { useEffect, useState } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import axios from "axios";
import { MenuItem } from '@mui/material';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { green } from "@mui/material/colors";
import { API } from "../../utils/const";


var stompClient = null;
const AdminSize = (params) => {
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
        ;
    return (<>

    </>

    )
}


export default AdminSize