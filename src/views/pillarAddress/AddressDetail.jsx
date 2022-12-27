import React, { useEffect, useState } from 'react'
import './css.css'
import './detail.scss'

import axios from 'axios';
import {
    API_GET_ADDRESS_POINT_BY_ID,
    API_GET_CART,
} from 'utils/const';
import ProductComponent from "./ProductComponent";
import { API_GET_ADDRESS_DETAIL_USER } from 'utils/const';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_GET_ADDRESS_DETAIL_NOT_TOKEN } from 'utils/const';
import { API_CART_REMOVE } from 'utils/const';
import { API_ADD_CART } from 'utils/const';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Map from "./UserMap";
import Nouislider from "nouislider-react";
import { API_ADD_COMBO_TO_CART } from "../../utils/const";
import { Button } from '@mui/material';
import { API_WISHLIST_REMOVE } from "utils/const";
import { API_WISHLIST_GET } from "utils/const";
import { API_WISHLIST_ADD } from "utils/const";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '1px 10px 10px 10px'
};

function AddressDetail() {
    const [dataAddressProduct, setDataAddressProduct] = useState([])
    const [address, setAddress] = useState({})
    const id = useState(window.location.pathname.replace(/\D/g, ""));
    let token = localStorage.getItem("token");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setItem({
            id: null,
            name: null,
            number: null,
            lat: null,
            lng: null,
        });
    }

    const history = useHistory();
    const [count, setCount] = useState(null);
    const getAddress = async () => {
        try {
            if (!token) {
                const response = selected.num1 === 0 && selected.num2 === 0 ?
                    await
                        toast.promise(
                            axios.get(API_GET_ADDRESS_DETAIL_USER + id[0])
                           ,{
                                pending: 'Đang tải dữ liệu... ',
                            }, {
                            style: {
                                boxShadow: '5px 5px 20px 5px #black',
                            },
                        }
                        )
                    : await axios.get(API_GET_ADDRESS_DETAIL_USER + id[0] + "?num1=" + selected.num1 + "&num2=" + selected.num2);
                if (response.status === 200) {
                    setDataAddressProduct(response.data.product)
                    setAddress(response.data.address)
                }

            } else {
                const response = selected.num1 === 0 ?
                    await
                        toast.promise(
                            axios.get(API_GET_ADDRESS_DETAIL_NOT_TOKEN + id[0], {
                                headers: {
                                    'authorization': 'Bearer ' + token,
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            })
                            ,
                            {
                                pending: 'Đang xử lý ... ',
                            }, {
                            style: {
                                boxShadow: '5px 5px 20px 5px #black',
                            },
                        }
                        )
                    : await axios.get(API_GET_ADDRESS_DETAIL_NOT_TOKEN + id[0] + "?num1=" + selected.num1 + "&num2=" + selected.num2, {
                        headers: {
                            'authorization': 'Bearer ' + token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                if (response.status === 200) {
                    setDataAddressProduct(response.data.product)
                    setAddress(response.data.address)
                    setCount(response.data.product.filter(product => product.status === "AVAILABLE" && product.inCart !== true).length)
                }
            }

        } catch (error) {
            if (error && error.response.status === 400 || error.response.status === 404) {
                toast.warning('Không có địa chỉ này !', {
                    autoClose: 3000
                })
                history.push('/auth/pageNotFound')
            }
            if (error && error.response.status === 500 || error.response.status === 500) {
                console.log(error);
                setDataAddressProduct({})
                console.log(dataAddressProduct);
            }

        }
    }

    const getAddressNotPending = async () => {
        try {
            if (!token) {
                const response = selected.num1 === 0 && selected.num2 === 0 ?
                    await axios.get(API_GET_ADDRESS_DETAIL_USER + id[0])
                    : await axios.get(API_GET_ADDRESS_DETAIL_USER + id[0] + "?num1=" + selected.num1 + "&num2=" + selected.num2);
                if (response.status === 200) {
                    setDataAddressProduct(response.data.product)
                    setAddress(response.data.address)
                }

            } else {
                const response = selected.num1 === 0 ? await axios.get(API_GET_ADDRESS_DETAIL_NOT_TOKEN + id[0], {
                    headers: {
                        'authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }) : await axios.get(API_GET_ADDRESS_DETAIL_NOT_TOKEN + id[0] + "?num1=" + selected.num1 + "&num2=" + selected.num2, {
                    headers: {
                        'authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                if (response.status === 200) {
                    setDataAddressProduct(response.data.product)
                    setAddress(response.data.address)
                    setCount(response.data.product.filter(product => product.status === "AVAILABLE" && product.inCart !== true).length)

                }
            }

        } catch (error) {
            if (error && error.response.status === 400 || error.response.status === 404) {
                toast.warning('Không có địa chỉ này !', {
                    autoClose: 3000
                })
                history.push('/auth/pageNotFound')
            }
            if (error && error.response.status === 500 || error.response.status === 500) {
                console.log(error);
                setDataAddressProduct({})
                console.log(dataAddressProduct);
            }

        }
    }
    useEffect(() => {
        getWishList()
    }, [])
    const [data, setData] = useState([])
    const getWishList = async (id) => {
        const response = await axios.get(API_WISHLIST_GET + 0, {
            headers: {
                'authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            setData(response.data)
        }
    }

    let user = localStorage.getItem('user')

    const onClickAddWishList = async (id) => {
        setLoading(true)
        if (!token && !user) {
            history.push('/auth/login')
            toast.warning("Vui lòng đăng nhập!")
        } else {
            const response = await axios.post(API_WISHLIST_ADD + id, {}, {
                headers: {
                    'authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                getWishList()
                toast.success("Đã thêm vào danh sách yêu thích.", { autoClose: 1500 })
                setLoading(false)
            }
        }

    }

    const onHandleRemoveWishList = async (id) => {
        setLoading(true)
        const response = await axios.post(API_WISHLIST_REMOVE + id, {}, {
            headers: {
                'authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            getWishList()
            toast.success("Đã xoá khỏi danh sách yêu thích.", { autoClose: "1500" })
            setLoading(false)
        }

    }
    const [loading, setLoading] = useState(false)

    const onClickRemoveItemCart = async (id) => {
        if (token) {
            setLoading(true)
            const response = await axios.put(API_CART_REMOVE + id, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                toast.success("Xoá khỏi danh sách thanh toán thành công", { autoClose: 1300 })
                getAddress()
                const responseCount = await axios.get(API_GET_CART, {
                    headers: {
                        'authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                let arrayCart = []
                Object.entries(responseCount.data).forEach(function (value, key) {
                    Object.entries(value[1]).forEach(function (value, key) {
                        arrayCart.push(value[1])
                    })
                })
                localStorage.setItem('countCart', JSON.stringify(arrayCart.length));
                window.dispatchEvent(new Event("storage"));
                setLoading(false)

            }
        } else {
            let listCartItems = JSON.parse(localStorage.getItem("cartTemp"))
            let cartAddP = JSON.parse(localStorage.getItem('cartADD'))
            for (let i = 0; i < listCartItems.length; i++) {
                if (listCartItems[i].productId === id) {
                    console.log(listCartItems[i]);
                    listCartItems.splice(i, 1)
                    // console.log(listCartItems.splice(i, 1));
                    localStorage.setItem("cartTemp", JSON.stringify(listCartItems))
                    localStorage.setItem('countCart', JSON.stringify(listCartItems.length));
                    window.dispatchEvent(new Event("storage"));
                    getAddress()
                }
            }

            for (let i = 0; i < cartAddP.length; i++) {
                if (cartAddP[i].productId === id) {
                    cartAddP.splice(i, 1)
                    localStorage.setItem("cartADD", JSON.stringify(cartAddP))
                    getAddress()
                }
            }
            toast.success("Xoá khỏi danh sách thanh toán thành công", { autoClose: 1500 })
            getAddress()

        }
    }

    //add cart
    const addCart = async (item) => {
        // save product to cart local
        const { id, name } = item;
        let listCart = localStorage.getItem("cartTemp")
        let listCartADD = localStorage.getItem("cartADD")

        let listCartItem = []
        let listCartADDItem = []

        if (listCart && listCartADD !== undefined) {
            listCartItem = JSON.parse(listCart)
            listCartADDItem = JSON.parse(listCartADD)
        }
        let checkCartHasBeen = true
        try {
            if (token) {
                setLoading(true)
                // when already login
                const response = await axios.post(API_ADD_CART, {
                    month: 1,
                    productId: id
                }, {
                    headers: {
                        'authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                if (response && response.status === 201) {
                    toast.success('Đã thêm vào danh sách thanh toán', {
                        autoClose: 1500
                    })
                    getAddress()
                    const responseCount = await axios.get(API_GET_CART, {
                        headers: {
                            'authorization': 'Bearer ' + localStorage.getItem('token'),
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                    let arrayCart = []
                    Object.entries(responseCount.data).forEach(function (value, key) {
                        Object.entries(value[1]).forEach(function (value, key) {
                            arrayCart.push(value[1])
                        })
                    })
                    localStorage.setItem('countCart', JSON.stringify(arrayCart.length));
                    window.dispatchEvent(new Event("storage"));
                    // history.push('/auth/cart')
                    setLoading(false)
                };
            } else {
                // when don't login
                for (let i = 0; i < listCartItem.length; i++) {
                    if (listCartItem[i].productId === item.id && listCartADDItem[i].productId === item.id) {
                        // localStorage.setItem('cartTemp', JSON.stringify(listCartItem));
                        checkCartHasBeen = false
                    }
                }
                if (checkCartHasBeen == true) {
                    let items = {
                        month: 1,
                        productId: item.id,
                        nameProduct: item.name,
                        priceProduct: item.price,
                        imageProduct: item.photosImagePath
                    }
                    let itemsADD = {
                        month: 1,
                        productId: item.id
                    }

                    listCartItem.push(items)
                    listCartADDItem.push(itemsADD)
                    localStorage.setItem('cartTemp', JSON.stringify(listCartItem));
                    localStorage.setItem('cartADD', JSON.stringify(listCartADDItem));
                    localStorage.setItem('countCart', JSON.stringify(listCartADDItem.length));
                    window.dispatchEvent(new Event("storage"));
                }
                toast.success('Đã thêm vào danh sách thanh toán', {
                    autoClose: 1500
                })
                getAddress()

                // history.push('/auth/cart')
            }
        } catch (error) {
            setLoading(false)
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

    const [addressPoint, setAddressPoint] = useState([

    ])

    const [item, setItem] = useState({
        id: null,
        name: null,
        number: null,
        lat: null,
        lng: null,
    })

    const [mapAddress, setMapAddress] = useState([])


    const [selected, setSelected] = useState({
        num1: 0,
        num2: 0,
        selected: false
    })



    const fetchAddressPointData = async () => {
        const response = await axios.get(API_GET_ADDRESS_POINT_BY_ID + id[0])
        if (response) {
            setAddressPoint(response.data)
            setMapAddress(response.data)
            setSelected({
                num1: addressPoint[0].number,
                num2: addressPoint[addressPoint.length - 1].number,
                selected: true
            })
        }
    }
    const addComboToCart = async () => {
        setLoading(true)
        const response = await axios.post(API_ADD_COMBO_TO_CART + '?addressId=' + id[0] + '&num1=' + selected.num1 + '&num2=' + selected.num2, {}, {
            headers: {
                'authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 201) {
            getAddress()
            toast.success('Đã thêm tất cả trụ vào danh sách thanh toán', {
                autoClose: 1200,
            })
            const responseCount = await axios.get(API_GET_CART, {
                headers: {
                    'authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (responseCount) {
                let arrayCart = []
                Object.entries(responseCount.data).forEach(function (value, key) {
                    Object.entries(value[1]).forEach(function (value, key) {
                        arrayCart.push(value[1])
                    })
                })
                localStorage.setItem('countCart', JSON.stringify(arrayCart.length));
                window.dispatchEvent(new Event("storage"));
            }
            setLoading(false);

        }
    }

    const onchangeRange = (value) => {
        setSelected({
            num1: value[0],
            num2: value[1],
            selected: true
        })
    }

    useEffect(() => {
        fetchAddressPointData()
    }, [])

    useEffect(() => {
        if (item.id !== null) {
            handleOpen()

        }

    }, [item.lat])

    useEffect(() => {
        getAddress()
    }, [selected.num1, selected.num2])


    return (
        <div style={{ maxWidth: "1200px", margin: "auto" }} >
            <div style={{ marginBottom: "15px", maxWidth: "1200px" }} className='de'  >
                {address ?
                    <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: '#E7EBF0', width: "100%" }} className="address-detail">

                        <div style={{ position: 'sticky' }} className="container">

                            <div className="header">
                                <div className="header-logo">Thông tin trụ </div>

                                <nav className="header-nav">
                                    <i className="ion-ios-cart" />
                                    <div />
                                </nav>
                            </div>
                            <div className="product">
                                <div style={{}} className="product-photo">
                                    <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={address.photosImagePath} alt="" />
                                </div>
                                <div className="product-detail">
                                    <h3 className="product__title">{address.street} </h3>
                                    <div className="product__price">Thành phố {address.city}  </div>
                                    <div className="product__subtitle">
                                        {address.description}
                                    </div>
                                    <div>

                                    </div>
                                    <div class="line-loading">

                                    </div>
                                    <div style={{ margin: "auto" }}>
                                        {count > 0 ? <Button className="btn-header-ad-detail" sx={{
                                            '&:hover': {
                                                bgcolor: '#007784',
                                                outline: "none",
                                                boxShadow: "none"
                                            },
                                            border: "3px solid #007784",
                                            fontWeight: "500", width: "100%",
                                            background: "#007784",
                                            outline: "none",
                                            color: "#FFFFFF",
                                            borderRadius: "8px",
                                            boxShadow: "none",
                                            marginTop: "10px",

                                        }} variant="contained" onClick={() => addComboToCart()}>Thêm tất cả trụ ({count}) </Button> : null}
                                        {token == null ? <Button className="btn-header-ad-detail" sx={{
                                            '&:hover': {
                                                bgcolor: '#007784',
                                                outline: "none",
                                                boxShadow: "none"
                                            },
                                            border: "3px solid #007784",
                                            fontWeight: "500", width: "100%",
                                            background: "#007784",
                                            outline: "none",
                                            color: "#FFFFFF",
                                            borderRadius: "8px",
                                            boxShadow: "none",
                                            marginTop: "10px",
                                        }} variant="contained" onClick={() => {
                                            history.push('/auth/login')
                                            toast.warning('Vui lòng đăng nhập để thêm hết tất cả trụ vào thanh toán', { autoClose: 1500 })
                                        }}>Thêm tất cả trụ </Button> : null}</div>
                                </div>
                            </div>
                        </div>

                    </div> :
                    <div style={{ display: "flex", justifyContent: "space-between" }} className="address-detail">
                        <div style={{ fontSize: "18px" }}>
                            <div>Không có địa chỉ này !</div>
                        </div>
                        <div >
                        </div>
                    </div>
                }

            </div>
            {addressPoint.length - 1 > 0 ?
                <div className='form-range'>
                    <Nouislider
                        start={[1, addressPoint[addressPoint.length - 1].number]}
                        connect
                        range={{
                            min: 1,
                            max: addressPoint[addressPoint.length - 1].number
                        }}

                        pips={{
                            mode: "steps", values: addressPoint[addressPoint.length - 1].number,
                            density: 100,
                            format: {
                                to: function (value) {
                                    return addressPoint[value - 1].name;
                                },
                                from: function (value) {
                                    return value;
                                }
                            }
                        }}
                        clickablePips
                        step={1}
                        onUpdate={value => onchangeRange(value)}
                    >
                    </Nouislider>
                </div> : null
            }

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div onClick={e => setOpen(false)} style={{ textAlign: 'right', color: 'red', cursor: 'pointer', fontWeight: '700', fontSize: '1.2em' }}>X</div>
                        <Map
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `90vh`, maxHeight: "1000px", width: "85vw", maxWidth: "1200px", margin: `auto`, border: '2px solid black' }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            data={mapAddress}
                            productData={dataAddressProduct}
                            item={item}
                        />
                    </Box>
                </Modal>
            </div>
            {dataAddressProduct.length > 0 ?
                <ProductComponent data={data} onClickAddWishList={onClickAddWishList} onHandleRemoveWishList={onHandleRemoveWishList}
                    loading={loading} addCart={addCart} onClickRemoveItemCart={onClickRemoveItemCart} product={dataAddressProduct} setItem={setItem} />
                : <div style={{ width: `300px`, color: 'white', fontSize: '1.1em', margin: '50px auto auto auto', }}> Chưa có trụ nào ở đoạn đường này !</div>
            }
        </div>
    )
}

export default AddressDetail