import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { API_GET_PILLAR } from 'utils/const';
import { API_GET_ADDRESS_DETAIL_USER } from 'utils/const';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_GET_ADDRESS_DETAIL_NOT_TOKEN } from 'utils/const';
import CategoryComponent from './CategoryComponent';
import { API_GET_CATEGORY_BY_ID } from 'utils/const';
import { showError } from 'utils/error';
import usePagination from 'views/pillarAddress/Pagination';
import { Pagination, Stack } from '@mui/material';
import { API_ADD_CART } from 'utils/const';
import { API_CART_REMOVE } from 'utils/const';
import { API_GET_CATEGORY_BY_ID_2 } from 'utils/const';

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


function CategoryDetail() {
    const [dataCategory, setDataCategory] = useState([])
    const [dataCategoryMap, setDataCategoryMap] = useState([])
    const [address, setAddress] = useState({})
    const id = useState(window.location.pathname.replace(/\D/g, ""));
    console.log(id[0]);
    let token = localStorage.getItem("token");


    const history = useHistory();
    // const getCategory = async (e) => {
    //     try {
    //         const response = await axios.get(API_GET_CATEGORY_BY_ID + id[0])
    //         if (response.status === 200) {
    //             setDataCategory(response.data.category)
    //             setDataCategoryMap(response.data.categoryMap)
    //         }
    //     } catch (error) {
    //         showError(error)
    //     }
    // }

    const getCategory = async (e) => {
        try {
            if (!token) {
                const response = await axios.get(API_GET_CATEGORY_BY_ID + id[0])
                if (response.status === 200) {
                    setDataCategory(response.data.category)
                    setDataCategoryMap(response.data.categoryMap)
                }
            } else {
                const response = await axios.get(API_GET_CATEGORY_BY_ID_2 + id[0], {
                    headers: {
                        'authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                if (response.status === 200) {
                    setDataCategory(response.data.category)
                    setDataCategoryMap(response.data.categoryMap)
                }
            }
        } catch (error) {
            // if (error && error.response.status === 400 || error.response.status === 404) {
            //     toast.warning('Không có địa chỉ này !', {
            //         autoClose: 3000
            //     })
            //     history.push('/auth/pageNotFound')
            // }
            // else 
            showError(error)
        }
    }

    // const arrayDataAddress = []
    // const arrayDataPillar = []
    // const dataCategoryMapEntries = new Map(Object.entries(dataCategoryMap));
    // dataCategoryMapEntries.forEach(function (value, key) {
    //     arrayDataAddress.push(key)
    //     arrayDataPillar.push(value)
    // })
    // console.log('arrayDataAddress ', arrayDataAddress);
    // console.log('arrayDataPillar ', dataCategoryMap);

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
                    getCategory()
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
                getCategory()
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
                getCategory()
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
                    getCategory()
                }
            }
            for (let i = 0; i < cartAddP.length; i++) {
                if (cartAddP[i].productId === id) {
                    cartAddP.splice(cartAddP[i], 1)
                    localStorage.setItem("cartADD", JSON.stringify(cartAddP))
                    getCategory()
                }
            }
            toast.success("Xoá khỏi danh sách thanh toán thành công", { autoClose: 1500 })
            getCategory()
        }
    }
    useEffect(() => {
        getCategory()
    }, [])
    let [page, setPage] = useState(1);
    const PER_PAGE = 1;


    const count = Math.ceil(Object.entries(dataCategoryMap).length / PER_PAGE);
    const _DATA = usePagination(Object.entries(dataCategoryMap), PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };
    console.log('error this', dataCategoryMap);
    console.log('error this', Object.entries(dataCategoryMap));

    // const object2 = Object.fromEntries(
    //     Object.entries(dataCategoryMap)
    //     .map(([ key, val ]) => [ key, val * 2 ])
    //   );

    //   console.log(object2);

    return (
        <div >
            <div style={{ marginBottom: "15px" }} className='de'  >
                {address ?
                    <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: 'white', width: "96.5%" }} className="address-detail">
                        <div style={{ position: 'sticky' }} className="container">
                            <div className="header">
                                <div className="header-logo">Thông tin trụ </div>
                                <nav className="header-nav">
                                    <i className="ion-ios-cart" />
                                    <div />
                                </nav>
                            </div>
                            <div className="product">
                                <div style={{ backgroundImage: `url(${address.photosImagePath})`, width: '800px' }} className="product-photo">
                                    {/* <img style={{ width: '50%', height: '20vh' }} src={address.photosImagePath} />
                                    <img style={{ width: '40%', height: '35vh' }} src={'https://truyenthongacn.com/wp-content/uploads/2022/04/CTY-TRUYEN-THONG-ACN-1222.png'} /> */}
                                </div>
                                <div className="product-detail">
                                    <h1 className="product__title">{dataCategory.name} </h1>
                                    {/* <div className="product__price">Thành phố {address.city}  </div> */}
                                    <div className="product__subtitle">
                                        Mô tả:    {dataCategory.description}
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
                            {/* <img style={{ width: "200px", borderRadius: "8px" }} src={address.photosImagePath} alt="" /> */}
                        </div>
                    </div>
                }
            </div>
            <Stack sx={{ mt: 8 }} alignItems="center">
                <Pagination
                    sx={{ button: { color: '#ffffff', width: '100%', margin: 'auto' } }}
                    count={count} page={page} color="secondary" onChange={handleChange} />
            </Stack>
            {
                _DATA.currentData().length > 0 ? _DATA.currentData().map(([key, value]) => (
                    <CategoryComponent addCart={addCart} onClickRemoveItemCart={onClickRemoveItemCart} address={JSON.parse(key)} products={value} />
                )) : <h1 style={{ fontSize: "28px", fontWeight: "600", width: '100%', marginTop: '1px', color: "white", textAlign: 'center' }}> Chưa có trụ nào ! </h1>
            }
        </div>
    )
}

export default CategoryDetail