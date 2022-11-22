import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Moment from 'react-moment';
import { Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import './activity.css'
import { formatMoney } from 'common/formatMoney';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { showError } from 'utils/error';
import { API_WISHLIST_GET } from 'utils/const';
import { API_WISHLIST_REMOVE } from 'utils/const';
const columns = [
    { id: 'id', label: 'Ảnh', minWidth: 70, align: 'left' },
    {
        id: 'date',
        label: 'Tên sản phẩm',
        minWidth: 100,
        align: 'center',
    },
    { id: 'Mô tả', label: 'Mô tả', minWidth: 100, align: 'center', },
    { id: 'a', label: 'Giá', minWidth: 100, align: 'center', },
    { id: 'Loại trụ', label: 'Loại trụ', minWidth: 100, align: 'center', },
    { id: 'Địa chỉ', label: 'Địa chỉ', minWidth: 170, align: 'center', },
    { id: 'Địa chỉ', label: 'Tình trạng', minWidth: 100, align: 'center', },

    { id: 's', label: 'Hành động', minWidth: 40, align: 'right', },
];
export default function WishList() {
    let decoded;
    let token = localStorage.getItem("token");
    if (token !== null) {
        decoded = jwt_decode(token);
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

    const onHandleRemoveWishList = async (id) => {
        const response = await axios.post(API_WISHLIST_REMOVE + id, {}, {
            headers: {
                'authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            toast.success("Đã xoá khỏi danh sách yêu thích.", { autoClose: "1500" })
            getWishList()
        }

    }
    console.log(data);
    return (
        <div className='activity'>
            <div className='activity-content'>
                <div className='activity-title'>
                    Xin chào  {decoded.firstName + " " + decoded.lastName}
                </div>
                <div className="activity-decription">
                    Đây là trang sản phẩm yêu thích của bạn. Bạn có thể xem theo dõi thông tin các sản phẩm.
                </div>
            </div>

            <Box className='activity-history' sx={{ width: '85%', typography: 'body1', margin: 'auto' }}>
                <TabContext>
                    <Box sx={{ display: "flex", justifyContent: "center", borderBottom: 1, borderColor: 'divider', color: 'white', paddingTop: '30px !important' }}>
                        <TabList textColor='white' aria-label="lab API tabs example ">

                            <Tab label="Trụ đang theo dõi" />
                        </TabList>
                    </Box>
                    <TabPanel >
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 500 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {data.length <= 0 ? '' : columns.map((column) => (
                                                <TableCell
                                                    sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }}
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.length <= 0 ? <TableCell sx={{ fontSize: "17px" }} align="center">Danh sách yêu thích đang trống :(</TableCell> :
                                            data.map((item, index) => (
                                                <TableRow key={index} >
                                                    <TableCell align="left">
                                                        <img style={{ width: '50px', height: '50px' }} src={item.photosImagePath} alt="" />
                                                    </TableCell>
                                                    {/* <TableCell align="center"><Moment format='MMMM Do YYYY, h:mm:ss a'>{item.orderTime}</Moment></TableCell> */}
                                                    <TableCell align="center">{item.name}</TableCell>

                                                    <TableCell align="center">{item.description}</TableCell>
                                                    <TableCell align="center">{formatMoney(item.price)}</TableCell>
                                                    <TableCell align="center">{item.category.name}</TableCell>
                                                    <TableCell align="center">{item.address.fullAddress}</TableCell>
                                                    <TableCell align="center">{item.status}</TableCell>

                                                    <TableCell align="right">
                                                        <DeleteIcon sx={{ cursor: 'pointer' }}
                                                            onClick={(e) => onHandleRemoveWishList(item.id)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper>
                    </TabPanel>


                </TabContext>
            </Box>


        </div>
    )
}
