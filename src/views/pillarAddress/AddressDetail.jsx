import React, { useEffect, useState } from 'react'
import './css.css'
import './detail.scss'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import {API_GET_ADDRESS_POINT_BY_ID, API_GET_PILLAR} from 'utils/const';
import ProductComponent from "./ProductComponent";
import { API_GET_ADDRESS_DETAIL_USER } from 'utils/const';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_GET_ADDRESS_DETAIL_NOT_TOKEN } from 'utils/const';
import { showError } from 'utils/error';
import { API_CART_REMOVE } from 'utils/const';
import { API_ADD_CART } from 'utils/const';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {Button} from "reactstrap";
import Map from "./UserMap";

const columns = [
    {
        id: 'Hình ảnh',
        label: 'Hình ảnh',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'name',
        label: 'Tên trụ',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'category',
        label: 'Loai trụ',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'price',
        label: 'Giá',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Hành động',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
];
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function AddressDetail() {
    const [dataAddressProduct, setDataAddressProduct] = useState([])
    const [address, setAddress] = useState({})
    const id = useState(window.location.pathname.replace(/\D/g, ""));
    // console.log(id[0]);
    let token = localStorage.getItem("token");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () =>
    {
        setOpen(false);
        setItem({ id: null,
            name: null,
            number: null,
            lat: null,
            lng: null,});
    }

    const history = useHistory();
    const getAddress = async (e) => {
        try {
            if (!token) {
                const response = await axios.get(API_GET_ADDRESS_DETAIL_USER + id[0]+ "?num1=" + selected.num1 + "&num2=" + selected.num2);
                if (response.status === 200) {
                    setDataAddressProduct(response.data.product)
                    setAddress(response.data.address)
                }
            } else {
                const response = await axios.get(API_GET_ADDRESS_DETAIL_NOT_TOKEN + id[0]+ "?num1=" + selected.num1 + "&num2=" + selected.num2, {
                    headers: {
                        'authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                if (response.status === 200) {
                    setDataAddressProduct(response.data.product)
                    setAddress(response.data.address)
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

    const onClickRemoveItemCart = async (id) => {
        console.log('id cart', id);
        if (token) {
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
            }
        } else {
            console.log('delete id cart local', id);
            let listCartItems = JSON.parse(localStorage.getItem("cartTemp"))
            let cartAddP = JSON.parse(localStorage.getItem('cartADD'))
            for (let i = 0; i < listCartItems.length; i++) {
                if (listCartItems[i].productId === id) {
                    console.log(listCartItems[i].productId);
                    listCartItems.splice(listCartItems[i], 1)
                    localStorage.setItem("cartTemp", JSON.stringify(listCartItems))
                    getAddress()

                }
            }

            for (let i = 0; i < cartAddP.length; i++) {
                if (cartAddP[i].productId === id) {
                    cartAddP.splice(cartAddP[i], 1)
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

        if (listCart && listCartADD != undefined) {
            listCartItem = JSON.parse(listCart)
            listCartADDItem = JSON.parse(listCartADD)
        }
        let checkCartHasBeen = true
        try {
            if (token) {
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
                    // history.push('/auth/cart')
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
                }
                toast.success('Đã thêm vào danh sách thanh toán', {
                    autoClose: 1500
                })
                getAddress()
                // history.push('/auth/cart')
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

    const [addressPoint, setAddressPoint] = useState([

    ])

    const [item, setItem] = useState({
        id: null,
        name: null,
        number: null,
        lat: null,
        lng: null,
    })

    const [mapAddress, setMapAddress] = useState([] )


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
            console.log('address point', addressPoint);
        }
    }


    const onClickSelected = (num1, num2) => {
        setSelected((old)=>{
            return {
                num1: num1 ===old.num1? 0 : num1,
                num2: num1 ===old.num2? 0 : num2,
                selected: false
            }
        })

    }
    useEffect(() => {
        getAddress()
        fetchAddressPointData()
    }, [])

    useEffect(() => {
        getAddress()
        console.log("The value after update", selected);
    }, [selected])

    useEffect(() => {
        if(item.id !==null){
            handleOpen()
            console.log("The value after update", item.lat);
        }

    }, [item.lat])



    return (
        <div >
            <div style={{ marginBottom: "15px" }} className='de'  >
                {address ?
                    <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: '#E7EBF0', width: "96.5%" }} className="address-detail">

                        <div style={{ position: 'sticky' }} className="container">

                            <div className="header">
                                <div className="header-logo">Thông tin trụ </div>
                                <nav className="header-nav">
                                    <i className="ion-ios-cart" />
                                    <div />
                                </nav>
                            </div>
                            <div className="product">
                                <div style={{ backgroundImage: `url(${address.photosImagePath})` }} className="product-photo">
                                    {/* <img style={{ width: '50%', height: '20vh' }} src={address.photosImagePath} />
                                    <img style={{ width: '40%', height: '35vh' }} src={'https://truyenthongacn.com/wp-content/uploads/2022/04/CTY-TRUYEN-THONG-ACN-1222.png'} /> */}
                                </div>
                                <div className="product-detail">
                                    <h1 className="product__title">{address.street} </h1>
                                    <div className="product__price">Thành phố {address.city}  </div>
                                    <div className="product__subtitle">
                                        {address.description}
                                    </div>

                                    <div class="line-loading"></div>
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
            <div style={{ display: "flex", justifyContent: "center"}}>
                {addressPoint.map?.((item, index) => (
                    <div key={index}  className="form-flex">
                        <div>
                            {addressPoint.length - 1 > index ?
                                <div >
                                        <div

                                        onClick={() =>
                                                           {
                                                               onClickSelected(item.number,addressPoint[index + 1].number)
                                                           }
                                                           }
                                        style={{display:"flex"}}

                                    ><div style={{padding:"5px",borderRadius: '20%', width: 'auto',backgroundColor: '#E7EBF0', margin:"10px 10px 0 10px"}}>
                                            {item.name}
                                        </div>
                                        <div className={
                                            item.id===null && selected.num1===0 ? "point selected" :
                                                selected.num1 === item.number ? "point selected" : "point"}
                                        style={{width: '100px',height: '10px', marginTop: '20px',}}></div>
                                        {index === addressPoint.length -2 ?
                                            <div style={{padding:"0px 10px",borderRadius: '20%', width: 'auto',backgroundColor: '#E7EBF0', margin:"10px 10px 0 10px"}}>
                                                <div>{addressPoint[index+1].name}</div>
                                            </div> : null
                                        }
                                        </div>
                                </div>
                                :null
                            }
                        </div>
                    </div>
                ))}
            </div>






            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Map
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            data={mapAddress}
                            productData={dataAddressProduct}
                            item={item}
                        />
                    </Box>
                </Modal>
            </div>
            {dataAddressProduct.length>0 ?
                <ProductComponent addCart={addCart} onClickRemoveItemCart={onClickRemoveItemCart} product={dataAddressProduct} setItem={setItem} />
                : <div style={{ width: `100px`}}> Không có trụ ở đoạn đường này</div>
            }


        </div>
    )
}

export default AddressDetail