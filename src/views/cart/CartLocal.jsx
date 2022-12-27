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

function CartLocal() {

    if (localStorage.getItem('cartTemp') == undefined || null) {
        localStorage.setItem('cartTemp', JSON.stringify([]))
    }
    if (localStorage.getItem('cartADD') == undefined || null) {
        localStorage.setItem('cartADD', JSON.stringify([]))
    }

    const [dataLocal, setDataLocal] = useState(JSON.parse(localStorage.getItem('cartTemp')))

    const [up, setUp] = useState(1)
    // const [btnOrders, setBtnOrders] = useState('Đặt hàng')
    const [showDate, setShowDate] = useState(new Date())
    const [btnDisabled, setBtnDisabled] = useState(false)
    const history = useHistory()
    let decoded;
    let token = localStorage.getItem("token");
    if (token !== null) {
        decoded = jwt_decode(token);
    }

    const handleUpdateMonth = (id) => {
        let cartAddP = JSON.parse(localStorage.getItem('cartADD'))
        for (let i = 0; i < dataLocal.length; i++) {
            if (dataLocal[i].productId === id && cartAddP[i].productId === id) {
                dataLocal[i].month += 1
                cartAddP[i].month += 1
                setUp(up + 1)
                setShowDate(new Date(showDate.setMonth(showDate.getMonth() + 1)))
                localStorage.setItem("cartTemp", JSON.stringify(dataLocal))
                localStorage.setItem("cartADD", JSON.stringify(cartAddP))
            }
        }
    }

    const handleMonth = (id) => {
        let cartAddP = JSON.parse(localStorage.getItem('cartADD'))
        for (let i = 0; i < dataLocal.length; i++) {
            if (dataLocal[i].productId === id && cartAddP[i].productId === id) {
                if (dataLocal[i].month > 1 && cartAddP[i].month > 1) {
                    dataLocal[i].month -= 1
                    cartAddP[i].month -= 1
                    setUp(up + 1)
                    setShowDate(new Date(showDate.setMonth(showDate.getMonth() - 1)))
                    localStorage.setItem("cartTemp", JSON.stringify(dataLocal))
                    localStorage.setItem("cartADD", JSON.stringify(cartAddP))
                }
            }
        }
    }
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
        // setBtnDisabled(true)
        try {
            if (token) {
                const response = await axios.post(API_PLACE_ORDER, {}, {
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
                    setTimeout(() => {
                        history.push('/auth/order/' + response.data.message.replace(/\D/g, ""))
                    }, 2000);
                    setBtnDisabled(true);
                };
                // setBtnOrders('Vui lòng chờ...')
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
    let sum = 0
    dataLocal.map((item) => {
        sum += (Number(item.priceProduct) * Number(item.month))
    })

    useEffect(() => {

    }, [up])

    const onClickRemoveItemCart = async (id) => {
        console.log('id cart', id);
        const response = await axios.put(API_CART_REMOVE + id, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            toast.success("Xoá thành công", { autoClose: 1500 })

        }
    }

    const handleRemoveCartItem = (id) => {
        let listCartItems = JSON.parse(localStorage.getItem("cartTemp"))
        let cartAddP = JSON.parse(localStorage.getItem('cartADD'))
        cartAddP.splice(id, 1)
        listCartItems.splice(id, 1)
        localStorage.setItem("cartTemp", JSON.stringify(listCartItems))
        localStorage.setItem("cartADD", JSON.stringify(cartAddP))
        localStorage.setItem('countCart', JSON.stringify(cartAddP.length));
        setDataLocal(JSON.parse(localStorage.getItem("cartTemp")))
        window.dispatchEvent(new Event("storage"));
        toast.success("Xoá thành công", { autoClose: 1500 })
    }
    return (
        <React.Fragment>
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
                                        <div className="col-lg-8 col-mobie ">
                                            <div className="p-5 mb-2 margin-right-mobie">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <h1 className="fw-bold mb-0 text-black">Thanh toán</h1>
                                                    {/* <ChatRoom/> */}
                                                    <h6 className="mb-0 text-muted">Số lượng trụ: {dataLocal.length} </h6>
                                                </div>
                                                {dataLocal.length ?
                                                    <div style={{ display: "flex", flexDirection: "row", width: "100%" }} className="row mb-2 d-flex justify-content-between align-items-center">
                                                        <div className="col-md-2 col-lg-2 col-xl-2 ">

                                                        </div>
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
                                                    </div> : ''}
                                                <div className='scrollbar' style={{ boxShadow: 'none' }} id='style-1' >

                                                    <hr className="mb-3 mt-1" />
                                                    {dataLocal.length ? dataLocal.map((item, index) => (
                                                        <div key={index} style={{ display: "flex", flexDirection: "row", width: "100%" }} className="row mb-4 d-flex justify-content-between align-items-center">
                                                            <div className="col-md-2 col-lg-2 col-xl-2 img-mobie">
                                                                <img
                                                                    src={item.imageProduct}
                                                                    className="img-fluid rounded-3"
                                                                    alt="Cotton T-shirt"
                                                                />
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                                {/* <h6 className="text-muted">Shirt</h6> */}
                                                                <h6 className="text-black mb-0">{item.nameProduct.substring(0, 17)}</h6>
                                                            </div>
                                                            <div style={{ alignItems: "center", justifyContent: "end" }} className="col-md-3 col-lg-3 col-xl-3 d-flex">
                                                                <button
                                                                    className="btn btn-link px-2"
                                                                    onClick={(e) => handleMonth(item.productId)}
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
                                                                    onClick={(e) => handleUpdateMonth(item.productId)}
                                                                >
                                                                    <i className="fas fa-plus" />
                                                                </button>
                                                            </div>
                                                            <div style={{ display: "flex", justifyContent: "center" }} className="col-md-3 col-lg-3 col-xl-3 cus-text-spgp">
                                                                {/* <h6 className="text-muted">Price</h6> */}
                                                                <h6 style={{ fontSize: "14px" }} className="text-black mb-0">{formatMoney(item.priceProduct * item.month)}</h6>
                                                            </div>
                                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end cus-text-spgp">
                                                                <div style={{ cursor: 'pointer' }} className="text-muted">
                                                                    <i onClick={(e) => handleRemoveCartItem(item.id)} className="fas fa-times" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                <div style={{ cursor: 'pointer' }} className="text-muted">
                                                                    {/* hide this div */}
                                                                </div>
                                                            </div>
                                                            <div style={{}} className="date-cus-sps">Ngày bắt đầu:
                                                                <span> {new Date().getDate()}{"/"}{new Date().getMonth() + 1}{"/"}{new Date().getFullYear()}
                                                                    -{showDate2(0, item.month)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )) :
                                                        <div style={{ width: "100%" }} >
                                                            <div style={{ width: '500px', clear: 'both', textAlign: 'center' }}>
                                                                <p>Chưa có trụ nào !</p>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                {/* <hr className="my-4" /> */}

                                                <div className="pt-5">
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

                                                {token && decoded ? <button
                                                    disabled={btnDisabled}
                                                    type="button"
                                                    className="btn btn-dark btn-block btn-lg"
                                                    data-mdb-ripple-color="dark"
                                                    onClick={clickOrder}
                                                >

                                                    {btnDisabled ? 'Vui lòng chờ...' : 'Đặt trụ'}
                                                </button> : <NavLink to={'/auth/login'}> <button style={{ marginTop: '' }} type="button"
                                                    className="btn btn-dark btn-block btn-lg"
                                                    data-mdb-ripple-color="dark">Vui lòng đăng nhập để thuê trụ ! </button> </NavLink>}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}

export default CartLocal