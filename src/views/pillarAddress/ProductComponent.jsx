import Countdown from "react-countdown";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useHistory } from "react-router-dom";
import { API_ADD_CART } from "utils/const";
import { Button, createTheme, Pagination, Stack } from "@mui/material";
import { formatMoney } from "common/formatMoney";
import { API_ADD_CART_PRE_ORDER } from "utils/const";
import Moment from "react-moment";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import './ProductComponent.css'
import { API_WISHLIST_ADD } from "utils/const";
import usePagination from "./Pagination";
import './css.css'
import { ThemeProvider } from "styled-components";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { API_WISHLIST_REMOVE } from "utils/const";
import { API_WISHLIST_GET } from "utils/const";
import { API_CART_REMOVE } from "utils/const";
function ProductComponent({ product, onClickRemoveItemCart, addCart, setItem }) {

  const renderer = ({ hours, minutes, completed }) => {
    if (completed) {
      // Render a completed state
      return <div>Đã hết hạn</div>;
    } else {
      // Render a countdown
      return <span className="detail-time">{hours}:{minutes}</span>;
    }
  };

  const buttons = (isPreOrdered, isAvailable,) => {
    if (isAvailable) {
      return <button className="btn btn-success">Thêm vào giỏ</button>
    }
    if (!isPreOrdered) {
      return <button className="btn btn-success">Đặt hàng</button>
    }

  }

  const history = useHistory()
  let token = localStorage.getItem('token')

  const addCartPreOrder = async (item) => {
    // save product to cart local
    const { id, name } = item;
    try {
      if (token) {
        // when already login
        const response = await axios.post(API_ADD_CART_PRE_ORDER, {
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
          history.push('/auth/cart')
        };
      } else {
        // when don't login
        toast.warning('Vui lòng đăng nhập để sử dụng tính năng này !', {
          autoClose: 1500
        })
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

  let user = localStorage.getItem('user')

  const onClickAddWishList = async (id) => {
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
      }
    }

  }

  const onHandleRemoveWishList = async (id) => {
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

  let [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const count = Math.ceil(product.length / PER_PAGE);
  const _DATA = usePagination(product, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00ADB5',
        contrastText: '#EEE'
      },
      secondary: {
        main: '#EEE'
      },
      // background: 'none'
    },
    typography: {
      fontFamily: [
        'Poppins'
      ],
      fontSize: 18,
    }
  })

  let listCartItems = JSON.parse(localStorage.getItem("cartTemp"))
  if (listCartItems == null) {
    listCartItems = []
  }
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        {/* <Stack sx={{ mt: 8 }} alignItems="center">
          <Pagination
            sx={{ button: { color: '#ffffff', width: '100%', margin: 'auto' } }}
            count={count} page={page} color="secondary" onChange={handleChange} />
        </Stack> */}
        <div style={{
          display: "flex", width: '1300px', flexWrap: "wrap", justifyContent: "center"
          , marginTop: '50px', marginBottom: '70px'
        }}>
          {
            _DATA.currentData().map((item, index) => (
              <div key={index} style={{ flexDirection: "column", float: "left", position: 'relative', backgroundColor: "#E7EBF0", marginTop: '20px', width: "23%", margin: "5px", display: "flex", padding: "10px", borderRadius: "15px", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                <div style={{ width: "100%", height: "30vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <img style={{ width: '100%', height: "100%", borderRadius: "8px", objectFit: "cover" }} src={item.photosImagePath} alt="" />
                </div>
                <div style={{ width: "100%", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                  <h1 style={{ fontSize: "28px", fontWeight: "600", marginBottom: '1px', color: "#444444" }}> {item.name}</h1>
                  <h2 style={{ color: '#D70018' }}> {formatMoney(item.price)} VNĐ</h2>
                  <h3>Loại trụ: {item.category.name}</h3>
                  <h4> {item.description}</h4>
                  {token ?
                    //when already login
                    item.status === 'AVAILABLE' ?
                      // && listCartItems.filter(i => i.productId === item.id).length === 0
                      item.inCart === false ?
                        <Button className="btn-cart-cus" sx={{
                          '&:hover': {
                            bgcolor: '#007784',
                            outline: "none",
                            boxShadow: "none"
                          },
                          border: "3px solid #007784",
                          fontWeight: "500", width: "100%",
                          background: "none",
                          outline: "none",
                          color: "#007784",
                          borderRadius: "8px",
                          boxShadow: "none",
                        }}
                          onClick={(e) => addCart({ ...item })} variant="contained" color="success">
                          Thêm vào thanh toán
                        </Button>
                        :
                        <Button className="btn-cart-cus" sx={{
                          '&:hover': {
                            bgcolor: '#007784',
                            outline: "none",
                            boxShadow: "none"
                          },
                          border: "3px solid #007784",
                          bgcolor: '#007784',
                          fontWeight: "500", width: "100%",
                          outline: "none",
                          color: "#FFFFFF",
                          borderRadius: "8px",
                          boxShadow: "none",
                        }}
                          onClick={(e) => onClickRemoveItemCart(item.id)} variant="contained" color="success">
                          Xóa khỏi thanh toán
                        </Button>
                      :
                      <Button style={{
                        fontWeight: "500", width: "100%"
                        , border: "3px solid #333", background: "none", color: "#FFFFFF", boxShadow: "none", backgroundColor: '#333'
                      }} disabled variant="contained" >
                        Đã cho thuê
                      </Button> :
                    //when don't login
                    item.status === 'AVAILABLE' ?
                      listCartItems.filter(i => i.productId === item.id).length === 0 ?
                        <Button className="btn-cart-cus" sx={{
                          '&:hover': {
                            bgcolor: '#007784',
                            outline: "none",
                            boxShadow: "none"
                          },
                          border: "3px solid #007784",
                          fontWeight: "500", width: "100%",
                          background: "none",
                          outline: "none",
                          color: "#007784",
                          borderRadius: "8px",
                          boxShadow: "none",
                        }}
                          onClick={
                            (e) => addCart({ ...item })
                          } variant="contained" color="success">
                          Thêm vào thanh toán
                        </Button>
                        :
                        <Button className="btn-cart-cus" sx={{
                          '&:hover': {
                            bgcolor: '#007784',
                            outline: "none",
                            boxShadow: "none"
                          },
                          border: "3px solid #007784",
                          bgcolor: '#007784',
                          fontWeight: "500", width: "100%",
                          outline: "none",
                          color: "#FFFFFF",
                          borderRadius: "8px",
                          boxShadow: "none",
                        }}
                          onClick={(e) => onClickRemoveItemCart(item.id)} variant="contained" color="success">
                          Xóa khỏi thanh toán
                        </Button> :
                      <Button style={{
                        fontWeight: "500", width: "100%"
                        , border: "3px solid #333", background: "none", color: "#FFFFFF", boxShadow: "none", backgroundColor: '#333'
                      }} disabled variant="contained" >
                        Đã cho thuê
                      </Button>
                  }
                  <FmdGoodIcon onClick={(e) => {
                    setItem(item)
                  }} style={{ color: 'red', cursor: 'pointer', marginTop: '10px' }} />

                  {item.status === 'HIRING' && item.expiredDate !== null ? <div style={{ height: "28.5px" }}> <h4 style={{ marginTop: '15px', }}> Ngày hết hạn: <span style={{ color: 'red' }}> <Moment format="DD/MM/YYYY">{item.expiredDate}</Moment></span> </h4> </div> : ''}
                </div>
                {/* {
                  item.preOrdered === false ?
                    <Button sx={{ height: '9vh', fontSize: '0.6em', width: '10%', position: 'absolute', top: '0', right: '0', backgroundColor: ' #F4364C' }}
                      onClick={(e) => addCartPreOrder({ ...item })} variant="contained" >
                      Đặt trước
                    </Button> : ''
                } */}
                < div style={{ fontWeight: "600", display: "flex", alignItems: "center", marginTop: "7px", justifyContent: "end" }}>
                  Yêu thích
                  {
                    data.filter(i => i.id === item.id).length === 0 ?
                      <AiOutlineHeart
                        onClick={(e) => onClickAddWishList(item.id)}
                        className="colorHeart-cus"
                        style={{ fontSize: "25px", color: "rgb(215,0,24)", cursor: "pointer" }} /> :
                      <AiFillHeart
                        onClick={(e) => onHandleRemoveWishList(item.id)}
                        style={{ fontSize: "25px", color: "rgb(215,0,24)", cursor: "pointer" }} />
                  }
                </div>
              </div >
            ))
          }
        </div >
        <Stack alignItems="center">
          <Pagination
            sx={{ button: { color: '#ffffff', width: '100%', margin: 'auto' } }}
            count={count} page={page} color="secondary" onChange={handleChange} />
        </Stack>
      </ThemeProvider >
    </React.Fragment >

  )
}


export default ProductComponent;