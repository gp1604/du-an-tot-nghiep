import React, { useEffect, useState } from 'react'
import './cart.css'
import jwt_decode from "jwt-decode";
import CartLocal from './CartLocal'
import CartDatabase from './CartDatabase'

function Cart() {
    let decoded;
    let token = localStorage.getItem("token");
    if (token !== null) {
        decoded = jwt_decode(token);
    }
    useEffect(() => {
        document.title = 'ACN | Giỏ hàng thanh toán';
    })
    return (
        <div className='container-mobie' style={{ width: '80%', }} >
            {token && decoded ? <CartDatabase /> : <CartLocal />}
        </div>
    )
}

export default Cart