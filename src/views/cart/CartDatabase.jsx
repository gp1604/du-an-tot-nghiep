import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_PLACE_ORDER } from 'utils/const'
import { API_CART_REMOVE } from 'utils/const'
import { API_GET_CART } from 'utils/const'
import './cart.css'
import jwt_decode from "jwt-decode";
import { formatMoney } from './../../common/formatMoney';
import CartLocal from './CartLocal'
import { API_START_COOL_DOWN } from 'utils/const'
import { API_UPDATE_MONTH_CART } from './../../utils/const';
import { showError } from 'utils/error'
import ReactLoading from 'react-loading';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function CartDatabase() {

    const [data, setData] = useState({})
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [showDate, setShowDate] = useState(new Date())
    const history = useHistory()
    let decoded;
    let token = localStorage.getItem("token");
    if (token !== null) {
        decoded = jwt_decode(token);
    }

    const getAllCart = async (e) => {
        setLoading(true);
        const response = await axios.get(API_GET_CART, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (response) {
            setLoading(false)

            setData(response.data)
        }
    }



    const handleUpdateMonth = async (item) => {
        setLoading(true)
        const response = await axios.put(API_UPDATE_MONTH_CART + item.product.id + "?day=" + (item.month + 1), {}, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            setLoading(false)
        }
        setShowDate(new Date(showDate.setMonth(showDate.getMonth() + 1)))
        getAllCart()
    }

    const handleMonth = async (item) => {
        if (item.month > 1) {
            setLoading(true)

            const response = await axios.put(API_UPDATE_MONTH_CART + item.product.id + "?day=" + (item.month - 1), {}, {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                setLoading(false)
            }
            getAllCart()
            setShowDate(new Date(showDate.setMonth(showDate.getMonth() - 1)))
        }
    }
    const [loading, setLoading] = useState(false)

    const showDate2 = (d1, d2) => {
        let date = new Date();
        let day = date.getDate();
        date.setMonth(date.getMonth() + d2);
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return day + '/' + month + '/' + year;
    }
    // const [idOrder, setIdOrder] = useState()
    const clickOrder = async () => {
        // setBtnOrders('Vui lòng chờ...')
        setBtnDisabled(true)
        try {
            if (token) {
                const response = await
                    toast.promise(
                        axios.post(API_PLACE_ORDER, {}, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }),
                        {
                            pending: 'Hệ thống đang xử lý ...',
                            success: 'Đặt trụ thành công ',
                        },
                        { autoClose: 2000 },
                        {
                            style: {
                                boxShadow: '5px 5px 20px 5px #black',
                                border: '1px solid black'
                            },
                        }
                    );

                if (response && response.status === 200) {
                    // toast.success('Đặt trụ thành công', {
                    //     autoClose: 1500
                    // })
                    localStorage.setItem('countCart', JSON.stringify(0));
                    window.dispatchEvent(new Event("storage"));
                    const responseCoolDown = await axios.get(API_START_COOL_DOWN + response.data.message.replace(/\D/g, ""))
                    history.push('/auth/order/' + response.data.message.replace(/\D/g, ""))
                    setBtnDisabled(false);
                };
                // setBtnOrders('Vui lòng chờ...')
            } else {
                toast.success('Please login', {
                    autoClose: 3000
                })
                history.push('/auth/login')
            }
        } catch (error) {
            setBtnDisabled(false);
            showError(error)
        }
    }

    //set countcart
    let arrayCart = []
    Object.entries(data).forEach(function (value, key) {
        Object.entries(value[1]).forEach(function (value, key) {
            arrayCart.push(value[1])
        })
    })

    //set total money
    let sum = 0
    arrayCart.map((item) => {
        sum += (Number(item.product.price) * Number(item.month))
    })

    useEffect(() => {
        getAllCart()
    }, [])
    const onClickRemoveItemCart = async (id) => {
        setLoading(true)
        try {
            console.log('id cart', id);
            const response = await axios.put(API_CART_REMOVE + id, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                toast.success("Xoá thành công", { autoClose: 1000 })
                getAllCart()
                const responseCount = await axios.get(API_GET_CART, {
                    headers: {
                        'authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                setLoading(false)
                let arrayCart = []
                Object.entries(responseCount.data).forEach(function (value, key) {
                    Object.entries(value[1]).forEach(function (value, key) {
                        arrayCart.push(value[1])
                    })
                })
                localStorage.setItem('countCart', JSON.stringify(arrayCart.length));
                window.dispatchEvent(new Event("storage"));
            }
        } catch (error) {
            showError(error)
            setLoading(false)
        }
    }

    function renderMap(key) {
        return (
            <>
                <Modal
                    open={loading}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100vh",
                            // borderRadius: "10px"
                        }}
                    >
                        <ReactLoading type="spin" color="#ffffff" height={"3%"} width={"3%"} />
                    </Box>

                </Modal>
                {JSON.parse(key[0]).length >= 2 ? <div>Đường: {JSON.parse(key[0])[0].addressName} - từ {JSON.parse(key[0])[0].name} đến {JSON.parse(key[0])[1].name}</div> :
                    <div>Đường: {JSON.parse(key[0])[0].addressName}</div>}
                {key[1].map((item) =>
                    <div>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", borderBottom: '1px solid #ddd' }} className="row mb-4 d-flex justify-content-between align-items-center  ">
                            <div className="col-md-2 col-lg-2 col-xl-2 img-mobie">
                                <img
                                    src={item.product.photosImagePath}
                                    className="img-fluid rounded-3"
                                    alt="Cotton T-shirt"
                                />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                                {/* <h6 className="text-muted">Shirt</h6> */}
                                <h6 className="text-black mb-0">{item.product.name.substring(0, 17)}</h6>
                            </div>
                            <div style={{ alignItems: "center", justifyContent: "end" }} className="col-md-3 col-lg-3 col-xl-3 d-flex">
                                <button
                                    className="btn btn-link px-2"
                                    onClick={(e) => handleMonth(item)}
                                >
                                    <i className="fas fa-minus" />
                                </button>
                                <input
                                    style={{ width: '50px' }}
                                    id="form1"
                                    min={1}
                                    name="quantity"
                                    value={item.month}
                                    type="number"
                                    className="form-control form-control-sm"
                                />
                                <button
                                    className="btn btn-link px-2"
                                    onClick={() => handleUpdateMonth(item)}
                                >
                                    <i className="fas fa-plus" />
                                </button>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", }} className="col-md-3 col-lg-3 col-xl-3 cus-text-spgp">
                                {/* <h6 className="text-muted">Price</h6> */}
                                <h6 style={{ fontSize: "14px" }} className="text-black mb-0">{formatMoney(item.product.price * item.month)}</h6>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end cus-text-spgp">
                                <div style={{ cursor: 'pointer' }} className="text-muted">
                                    <i onClick={() => onClickRemoveItemCart(item.product.id)} className="fas fa-times" />
                                </div>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <div style={{ cursor: 'pointer' }} className="text-muted">
                                    {/* hide this div */}
                                </div>
                            </div>
                            <div style={{ padding: "" }} className="date-cus-sps">Ngày bắt đầu:
                                <span> {new Date().getDate()}{"/"}{new Date().getMonth() + 1}{"/"}{new Date().getFullYear()}
                                     <span> - </span> {showDate2(0, item.month)}
                                </span>
                            </div>

                        </div>
                    </div>
                )}

            </>
        )
    }

    return (
        <section className="h-custom" style={{ backgroundColor: "white", height: '', marginBottom: '10px', borderRadius: '15px 0 0 15px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '15px 0 0 15px' }}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div
                            className="card card-registration card-registration-2"
                            style={{ borderRadius: 15 }}
                        >
                            <div className="card-body p-0">
                                <div className="row g-0">
                                    <div className="col-lg-8 col-mobie">
                                        <div className="p-5 mb-2 margin-right-mobie">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0 text-black">Thanh toán</h1>
                                                <h6 className="mb-0 text-muted" style={{ fontWeight: 'bold' }}>Số lượng trụ: {arrayCart.length} </h6>
                                            </div>

                                            <div style={{ display: "flex", flexDirection: "row", width: "100%" }} className=" row mb-2 d-flex justify-content-between align-items-center">

                                                <div className="col-md-3 col-lg-3 col-xl-3 title-mobie">
                                                    <h6 className="text-muted">Tên sản phẩm</h6>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "center" }} className="col-md-3 col-lg-3 col-xl-3 title-mobie">
                                                    <h6 className="text-muted">Số tháng thuê</h6>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "center" }} className="col-md-3 col-lg-3 col-xl-3 title-mobie">
                                                    <h6 className="text-muted">Giá tiền</h6>
                                                </div>
                                                <div className="col-md-1 col-lg-1 col-xl-1">
                                                    <h6 className="text-muted"></h6>                                                        </div>
                                            </div>
                                            <div className='scrollbar' style={{ boxShadow: 'none' }} id='style-1' >
                                                <hr className="mb-3 mt-1" />

                                                {arrayCart.length > 0 ? Object.entries(data).map((key, value) => (
                                                    <>
                                                        {renderMap(key)}
                                                    </>

                                                )) : <div style={{ width: '39%', margin: 'auto' }}>Hiện chưa có trụ nào ! </div>}
                                            </div>

                                            {/* <hr className="my-4" /> */}

                                            <div className="pt-3">
                                                <h6 className="mb-0">
                                                    <NavLink to={'/auth/homePage'} className="text-body">
                                                        <i className="fas fa-long-arrow-alt-left me-2 mr-2" />
                                                        Quay  lại trang chủ
                                                    </NavLink>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 bg-grey">
                                        <div className="p-5">
                                            <hr className="my-4" />

                                            <div className="d-flex justify-content-between mb-5">
                                                <h5 className="text-uppercase">Tổng giá</h5>
                                                <h5>{formatMoney(sum)}</h5>
                                            </div>

                                            {arrayCart.length > 0 ?
                                                token && decoded ? <button
                                                    style={{ marginTop: '' }}
                                                    disabled={btnDisabled}
                                                    type="button"
                                                    className="btn btn-dark btn-block btn-lg myDIV"
                                                    data-mdb-ripple-color="dark"
                                                    onClick={clickOrder}
                                                >

                                                    {btnDisabled ? 'Vui lòng chờ...' : 'Đặt trụ'}

                                                </button> : <NavLink to={'/auth/login'}> <button type="button"
                                                    className="btn btn-dark btn-block btn-lg"
                                                    data-mdb-ripple-color="dark">Vui lòng đăng nhập để thuê trụ ! </button> </NavLink> : null}

                                            <div className="hide">Nếu bạn muốn thanh toán trực tiếp tại doanh nghiệp, bạn chỉ cần nhấn đặt đơn hàng ở đây và không thao tác gì thêm !!!</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CartDatabase