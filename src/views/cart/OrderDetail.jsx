import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_CONFIRM_PAYMENT } from 'utils/const';
import { API_GET_ORDER_DETAIL } from 'utils/const';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Countdown from "react-countdown";
import { BsFiles } from 'react-icons/bs';
import Order from './OrderConponent';
import { MenuItem, Select } from '@mui/material';
import ShowBank from './ShowBank';
import ComponentRightInfo from './ComponentRightInfo';
import { API_ORDER_RE_ORDER } from 'utils/const';
import { showError } from 'utils/error';
import UserSize from "../Realtime/UserSize";

function OrderDetail() {

    let token = localStorage.getItem('token')

    const [size, setSize] = useState(0)

    let idOrderInURL = window.location.pathname.replace(/\D/g, "");

    const [isConfirm, setIsConFirm] = useState(false)
    const [valueStatus, setValueStatus] = useState('')
    const [dataDetail, setDataDetail] = useState([])
    const [data, setData] = useState([])
    const [isExtended, setIsExtended] = useState(true);
    const [order, setOrder] = useState([]);
    const history = useHistory()

    const onChangeExtendedStatus = () => {
        setIsExtended(!isExtended)
    }

    const getAllOderDetail = async (e) => {
        if (token) {
            try {
                const response = await axios.get(API_GET_ORDER_DETAIL + idOrderInURL, {
                    headers: {
                        'authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                if (response.status === 200) {
                    setDataDetail(response.data.orderDetail)
                    setData(response.data)
                }
                else {
                    toast.success('Không có đơn hàng này !', {
                        autoClose: 3000
                    })
                    history.push('/auth/cart')
                }
            } catch (error) {
                if (error && error.response.status === 400 || error.response.status === 404) {
                    toast.warning('Không có mã đơn hàng này !', {
                        autoClose: 3000
                    })
                    history.push('/auth/cart')
                }
            }
        } else {
            toast.success('Please login', {
                autoClose: 3000
            })
            history.push('/auth/login')
        }
    }


    const checkout = async () => {
        console.log('checkout ');
        try {
            if (token) {
                if (data.status === 'NEW' || data.status === 'EXTEND') {
                    setIsConFirm(true)
                    const response = await axios.put(API_CONFIRM_PAYMENT + idOrderInURL, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response && response.status === 200) {
                        toast.success('Success', {
                            autoClose: 3000
                        })
                        setSize(99)

                    };
                    setIsConFirm(true)
                }
            } else {
                toast.success('Please login', {
                    autoClose: 3000
                })
                history.push('/auth/login')
            }
        } catch (error) {
            console.log(error.response.data)
            if (error.response.data.message) {
                toast.error(`${error.response.data.message}`, {
                    autoClose: 2000
                })
            }
            else if (error.response.data.error) {
                toast.error(`${error.response.data.error}`, {
                    autoClose: 2000
                })
            }
            else if (error.response.data.error && error.response.data.message) {
                toast.error(`${error.response.data.message}`, {
                    autoClose: 2000
                })
            }
            else {
                toast.error('Error', {
                    autoClose: 2000
                })
            }
        }
    }

    const [childData, setChildData] = useState({});
    const reOrder = async () => {
        try {
            var myMap = new Map()
            childData.map((item) => {
                myMap.set(item.productId, item.month);
            })
            const obj = Object.fromEntries(myMap);

            const dataAPI = {
                id: data.id,
                productInfo: obj
            }
            console.log('child data, ', dataAPI);


            const response = await axios.put(API_ORDER_RE_ORDER, dataAPI, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response && response.status === 200) {
                toast.success('Success', {
                    autoClose: 3000
                })
            };

        } catch (error) {
            showError(error)
        }
    }

    const Completionist = () => <div>cc</div>
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <Completionist />
        } else {
            // Render a countdown
            return (
                <span>
                    {hours}:{minutes}:{seconds}
                </span>
            );
        }
    };
    useEffect(() => {
        // startTimer()
        if (data.status === 'NEW') {
            // setValueStatus('Thanh toán')
            setIsConFirm(false)
        } else if (data.status === 'USER_CONFIRMED') {
            // setValueStatus('Vui lòng chờ admin phê duyệt đơn hàng của bạn !')
            setIsConFirm(true)
        } else if (data.status === 'CANCELLED') {
            // setValueStatus('Bạn đã huỷ đơn hàng này')
            setIsConFirm(true)
        } else if (data.status === 'PAID') {
            // setValueStatus('Đã xác nhận')
            setIsConFirm(true)
        }
    }, [])

    useEffect(() => {
        setSize(size)
        console.log('size', size);
        getAllOderDetail();
    }, [size])

    const [bank, setBank] = React.useState('mbbank');

    const handleChange = (event) => {
        setBank(event.target.value);
    };

    return (
        <div style={{ backgroundColor: 'white' }}>
            <UserSize changeUserCount={(data) => setSize(data)} />
            <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
                <div style={{ width: '1000px' }} >
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <h5 className="mb-3">
                                                <NavLink to={'/auth/homePage'} className="text-body">
                                                    <i className="fas fa-long-arrow-alt-left me-2 mr-2" />
                                                    Tiếp tục thuê trụ
                                                </NavLink>
                                            </h5>
                                            <hr />
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    {/* <p className="mb-0">You have {dataDetail.length} items </p> */}
                                                </div>
                                            </div>

                                            <Order order={data}
                                                dataBack={cData => setChildData(cData)}
                                                isExtended={isExtended}
                                                orderData={(data2) => setOrder(data2)}
                                            />

                                            {dataDetail ?
                                                dataDetail.map((item, index) => (
                                                    <div className="card mb-3" key={index}>

                                                    </div>
                                                ))

                                                : <h2> Chưa có sản phẩm nào </h2>}
                                        </div>
                                        <ComponentRightInfo bank={bank} handleChange={handleChange} data={data} renderer={renderer}
                                            checkout={checkout} isConfirm={isConfirm} valueStatus={valueStatus} onChangeExtendedStatus={onChangeExtendedStatus} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >


        </div >
    )
}

export default OrderDetail