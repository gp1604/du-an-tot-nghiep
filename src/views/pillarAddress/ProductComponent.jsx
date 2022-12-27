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
import usePagination from "./Pagination";
import './css.css'
import { ThemeProvider } from "styled-components";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import ReactLoading from 'react-loading';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function ProductComponent({ product, onClickRemoveItemCart, addCart, setItem, loading, onHandleRemoveWishList, onClickAddWishList, data }) {

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
      <ThemeProvider theme={theme}>
        {/* <Stack sx={{ mt: 8 }} alignItems="center">
          <Pagination
            sx={{ button: { color: '#ffffff', width: '100%', margin: 'auto' } }}
            count={count} page={page} color="secondary" onChange={handleChange} />
        </Stack> */}
        <div className="container-add-detail" style={{
          display: "flex", width: '100%', flexWrap: "wrap", justifyContent: "center"
          , marginTop: '50px', marginBottom: '70px'
        }}>
          {
            _DATA.currentData().map((item, index) => (
              <div className="add-detail-pro" key={index} style={{ flexDirection: "column", float: "left", position: 'relative', backgroundColor: "#E7EBF0", marginTop: '20px', width: "23.5%", margin: "5px", display: "flex", padding: "10px", borderRadius: "15px", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                <div className="image-add-detail-pro" style={{ width: "100%", height: "200px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <img style={{ width: '100%', height: "100%", borderRadius: "8px", objectFit: "cover" }} src={item.photosImagePath} alt="" />
                </div>
                <div style={{ width: "100%", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                  <h1 style={{ fontSize: "16px", margin: "0", color: "#444444" }}> {item.name}</h1>
                  <h2 style={{ fontSize: "18px", margin: "0", fontWeight: "600", color: '#D70018' }}> {formatMoney(item.price)} VNĐ</h2>
                  <h3 style={{ fontSize: "14px", margin: "0", }}>Loại trụ: {item.category.name}</h3>
                  <h4 style={{ fontSize: "14px", }}> {item.description}</h4>
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
                      <Button className="btn-cart-cus-bl" style={{
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
                      <Button className="btn-cart-cus-bl" style={{
                        fontWeight: "500", width: "100%"
                        , border: "3px solid #333", background: "none", color: "#FFFFFF", boxShadow: "none", backgroundColor: '#333'
                      }} disabled variant="contained" >
                        Đã cho thuê
                      </Button>
                  }
                  {item.status === 'HIRING' && item.expiredDate !== null ? <div style={{ height: "" }}> <h4 style={{ fontSize: "14px", marginTop: '5px', marginBottom: "0" }}> Ngày hết hạn: <span style={{ fontSize: "14px", color: 'red' }}> <Moment style={{ fontSize: "14px" }} format="DD/MM/YYYY">{item.expiredDate}</Moment></span> </h4> </div> : ''}
                </div>
                {/* {
                  item.preOrdered === false ?
                    <Button sx={{ height: '9vh', fontSize: '0.6em', width: '10%', position: 'absolute', top: '0', right: '0', backgroundColor: ' #F4364C' }}
                      onClick={(e) => addCartPreOrder({ ...item })} variant="contained" >
                      Đặt trước
                    </Button> : ''
                } */}
                <div style={{ width: '100%', display: 'flex', justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", marginTop: '5px' }}>
                    <FmdGoodIcon onClick={(e) => {
                      setItem(item)
                    }} style={{ color: 'black', cursor: 'pointer', fontSize: "22px", }} />
                    <span className="vt-yt-dt" onClick={(e) => {
                      setItem(item)
                    }} style={{ fontSize: "14px", fontWeight: "600", cursor: 'pointer', }}>Vị trí</span>
                  </div>
                  <div className="vt-yt-dt" style={{ fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", marginTop: "5px", justifyContent: "end" }}>
                    Yêu thích
                    {
                      data.filter(i => i.id === item.id).length === 0 ?
                        <AiOutlineHeart
                          onClick={(e) => onClickAddWishList(item.id)}
                          className="colorHeart-cus"
                          style={{ fontSize: "22px", color: "rgb(215,0,24)", cursor: "pointer" }} /> :
                        <AiFillHeart
                          onClick={(e) => onHandleRemoveWishList(item.id)}
                          style={{ fontSize: "22px", color: "rgb(215,0,24)", cursor: "pointer" }} />
                    }
                  </div>
                </div>
              </div >
            ))
          }
        </div >
      </ThemeProvider >
    </React.Fragment >

  )
}


export default ProductComponent;