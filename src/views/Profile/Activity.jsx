import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
import './activity.css'
import axios from 'axios';
import { API_GET_ALL_ORDER } from 'utils/const';
import Moment from 'react-moment';
import { Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { API_GET_EXTEND_ORDER_USER } from 'utils/const';
import { toast } from 'react-toastify';
import { API_EXTEND_ORDER_USER } from 'utils/const';
import { showError } from 'utils/error';
import Expired from './Expired';
import { API_GET_EXPIRED_ORDER_USER } from 'utils/const';
import { showError2 } from 'utils/error';


const columns = [
    { id: 'id', label: 'Id đơn hàng', minWidth: 170, align: 'left' },
    {
        id: 'date',
        label: 'Ngày đặt hàng',
        minWidth: 170,
        align: 'center',
    },
    { id: 'code', label: 'Số lượng sản phẩm', minWidth: 100, align: 'center', },
    { id: 'a', label: 'Trạng thái', minWidth: 100, align: 'right', },
    { id: 's', label: 'Hành động', minWidth: 100, align: 'right', },
];

const columns3 = [
    // { id: 'id', label: 'Id', minWidth: 60, align: 'left' },
    { id: 'j', label: 'Tên trụ', minWidth: 100, align: 'center', },
    { id: 'code', label: 'Giá', minWidth: 100, align: 'center', },
    { id: 'a', label: 'Địa chỉ', minWidth: 100, align: 'center', },
    { id: 'a2', label: 'Loại trụ', minWidth: 100, align: 'center', },
    { id: 'a22', label: 'Số tháng thuê', minWidth: 100, align: 'center', },
    {
        id: 'date',
        label: 'Ngày bắt đầu',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'date2',
        label: 'Ngày kết thúc',
        minWidth: 170,
        align: 'center',
    },
    // { id: 's', label: 'Hành động', minWidth: 100, align: 'center', },
];

function Activity() {
    const [showCheckbox, setShowCheckbox] = useState(false)
    const columns2 = [
        // { id: 'id', label: 'Id', minWidth: 60, align: 'left' },
        showCheckbox == true ? { id: 'id22', label: 'Số tháng', minWidth: 20, align: 'center' } : { id: 'id82', label: '', minWidth: 10, align: 'center' },
        { id: 'j', label: 'Tên trụ', minWidth: 100, align: 'center', },
        { id: 'code', label: 'Giá', minWidth: 100, align: 'center', },
        { id: 'a', label: 'Địa chỉ', minWidth: 100, align: 'center', },
        { id: 'a2', label: 'Loại trụ', minWidth: 100, align: 'center', },
        { id: 'a22', label: 'Số tháng thuê', minWidth: 100, align: 'center', },
        {
            id: 'date',
            label: 'Ngày bắt đầu',
            minWidth: 170,
            align: 'center',
        },
        {
            id: 'date2',
            label: 'Ngày kết thúc',
            minWidth: 170,
            align: 'center',
        },
        // { id: 's', label: 'Hành động', minWidth: 100, align: 'center', },
    ];



    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let decoded;
    let token = localStorage.getItem("token");
    if (token !== null) {
        decoded = jwt_decode(token);
    }

    // get all orrder
    const [data, setData] = useState([])
    const getALLOrder = async (e) => {
        const response = await axios.get(API_GET_ALL_ORDER, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (response) {
            setData(response.data)
        }
    }

    // get order detail expired
    const [dataOrderDetailExpred, setDataOrderDetailExpired] = useState([])
    const getALLOrderDetailExpired = async (e) => {
        const response = await axios.get(API_GET_EXPIRED_ORDER_USER, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (response && response.status === 200) {
            setDataOrderDetailExpired(response.data)
        }
    }

    // get order detail extend
    const [dataOrderDetail, setDataOrderDetail] = useState([])
    const getALLOrderDetail = async (e) => {
        const response = await axios.get(API_GET_EXTEND_ORDER_USER, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (response && response.status === 200) {
            setDataOrderDetail(response.data)
        }
    }

    //handle checkbox
    const [listIds, setListIds] = useState([]);
    const [month, setMonth] = useState(Number(1));

    let checkIdHasBeen = true
    const handleChangeCheckbox = (event, id, month) => {
        // setMonth(1)
        if (event.target.checked) {
            setMonth(1)
            listIds.map((item => {
                if (item.productId === id) {
                    checkIdHasBeen = false
                }
            }))
            if (checkIdHasBeen === true) {
                setListIds([...listIds, {
                    productId: id,
                    month: Number(month) || 1
                }]);
            }
        }
        else {
            console.log('⛔️ Checkbox is NOT checked');
            listIds.splice(listIds.indexOf(data.id), 1)
            console.log('list ids when remove ', listIds);
        }
    }
    const onchangeMonth = (event, id) => {
        setMonth(event.target.value)
        listIds.map((item => {
            if (item.productId === id) {
                item.month = Number(event.target.value)
            }
        }))
    }
    console.log('list ids ', listIds);

    const [showExtend, setShowExtend] = useState(true)
    const extend = async () => {
        handleClose()
        try {
            var map = new Map()
            listIds.map((item) => {
                map.set(item.productId, item.month);
            })
            const objData = Object.fromEntries(map);
            const dataAPI = {
                productInfo: objData
            }
            const response = await axios.put(API_EXTEND_ORDER_USER, dataAPI, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response && response.status === 200) {
                toast.success('Gia hạn thành công ! ', {
                    autoClose: 1500
                })
            };
        } catch (error) {
            showError2(error)
        }
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        getALLOrder()
        getALLOrderDetail()
        getALLOrderDetailExpired()
    }, [])
    return (
        <div style={{marginTop : '50px'}} className='activity'>
            <div className='activity-content'>
                <div className='activity-title'>
                    Xin chào  {decoded.firstName + " " + decoded.lastName}
                </div>
                <div className="activity-decription">
                    Đây là trang hoạt động của bạn. Bạn có thể xem lịch sử đặt hàng và đơn hàng đã đặt của bạn.
                </div>
            </div>

            <Box className='activity-history' sx={{ width: '85%', typography: 'body1', margin: 'auto' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', color: 'white', paddingTop: '30px !important' }}>
                        <TabList textColor='white' onChange={handleChange} aria-label="lab API tabs example ">
                            <Tab label="Đơn hàng đã đặt " value="1" />
                            <Tab label="Trụ đang thuê" value="2" />
                            <Tab label="Trụ đã hết hạn" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 500 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
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
                                        {data.map((item, index) => (
                                            <TableRow key={index} >
                                                <TableCell align="left">{item.id}</TableCell>
                                                <TableCell align="center"> <Moment format="DD/MM/YYYY">{item.orderTime}</Moment></TableCell>
                                                <TableCell align="center">{item.totalProduct} sản phẩm</TableCell>
                                                {item.status === 'USER_CONFIRMED' ? <TableCell sx={{ fontWeight: '600', color: 'blue' }} align="right">Chờ admin phê duyệt</TableCell> : null}
                                                {item.status === 'NEW' ? <TableCell sx={{ fontWeight: '600', color: 'purple' }} align="right">Chờ thanh toán</TableCell> : null}
                                                {item.status === 'DONE' ? <TableCell sx={{ fontWeight: '600', color: 'green' }} align="right">Xong</TableCell> : null}
                                                {item.status === 'CANCELLED' ? <TableCell sx={{ fontWeight: '600', color: 'red' }} align="right">Đã hủy</TableCell> : null}
                                                {item.status === 'PAID' ? <TableCell sx={{ fontWeight: '600', color: 'orange' }} align="right">Đang thuê</TableCell> : null}
                                                {item.status === 'EXTEND' ? <TableCell sx={{ fontWeight: '600', color: 'pink' }} align="right">Gia hạn</TableCell> : null}
                                                <TableCell align="right">
                                                    <NavLink to={'order/' + item.id}>
                                                        <Button variant="contained" color="success">
                                                            Chi tiết
                                                        </Button>
                                                    </NavLink>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper>
                    </TabPanel>
                    <TabPanel value="2">
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 467 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns2.map((column) => (
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
                                        {dataOrderDetail.map((item, index) => {
                                            return (
                                                <TableRow key={index} >
                                                    {/* <TableCell align="left">{item.id}</TableCell> */}
                                                    {showCheckbox ? <TableCell sx={{ width: '9%' }} align="center"> <input style={{ float: 'left', marginTop: '5px' }} type="checkbox" onChange={e => handleChangeCheckbox(e, item.product.id, month)} />
                                                        <input onChange={e => onchangeMonth(e, item.product.id)} defaultValue={'1'} style={{ float: 'left', width: '70%', marginLeft: '6%' }} type="number" min={'1'} max={'100'} />
                                                    </TableCell> : <TableCell align="center"> </TableCell>}
                                                    <TableCell align="center">{item.product.name} </TableCell>
                                                    <TableCell align="center">{item.product.price} </TableCell>
                                                    <TableCell align="center">{item.product.address.fullAddress} </TableCell>
                                                    <TableCell align="center">{item.product.category.name} </TableCell>
                                                    <TableCell align="center">{item.month} tháng </TableCell>
                                                    <TableCell align="center"> <Moment format="DD/MM/YYYY">{item.startDate}</Moment></TableCell>
                                                    <TableCell align="center"> <Moment format="DD/MM/YYYY">{item.expiredDate}</Moment></TableCell>
                                                    {/* <TableCell align="right">
                                                        <NavLink to={'order/' + item.id}>
                                                            <Button variant="contained" color="success">
                                                                Chi tiết
                                                            </Button>
                                                        </NavLink>
                                                    </TableCell> */}
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        {showExtend == true ? <Grid sx={{ mt: 1 }} container justifyContent="flex-end">
                            <Button onClick={e => {
                                setShowCheckbox(true)
                                setShowExtend(false)
                            }} variant="contained" color="success">
                                Gia hạn
                            </Button>
                        </Grid> :
                            <Grid sx={{ mt: 1 }} container justifyContent="flex-end">
                                <Button onClick={handleClickOpen} variant="contained" color="success">
                                    Xác nhận
                                </Button>
                                <Button sx={{ ml: 1 }} onClick={e => {
                                    setShowExtend(true)
                                    setShowCheckbox(false)
                                }} variant="contained" color="error">
                                    Đóng
                                </Button>
                            </Grid>}
                    </TabPanel>
                    <TabPanel value='3'>
                        <Expired columns3={columns3} dataOrderDetailExpired={dataOrderDetailExpred} />
                    </TabPanel>
                </TabContext>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Xác nhận gia hạn"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       Bạn có chắc chắc muốn gia hạn thêm không ?
                       Lưu ý sau khi đồng ý không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Từ chối</Button>
                    <Button onClick={extend} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>

        </div>

    )
}

export default Activity