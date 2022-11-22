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

    return (
        <div style={{ width: '80%', margin: 'auto',marginTop: '50px' }} >
            {token && decoded ? <CartDatabase /> : <CartLocal />}
        </div>
    )
}

export default Cart