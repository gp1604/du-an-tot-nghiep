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
import { Button, Grid, MenuItem, Select } from '@mui/material';
import { NavLink, useHistory } from 'react-router-dom';
import { API_GET_EXTEND_ORDER_USER } from 'utils/const';
import { toast } from 'react-toastify';
import { API_EXTEND_ORDER_USER } from 'utils/const';
import { showError } from 'utils/error';
import { API_GET_EXPIRED_ORDER_USER } from 'utils/const';
import { showError2 } from 'utils/error';
import AreRenting from './AreRenting';
import AboutToExpire from './AboutToExpire';
import Expired from './Expired';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OrderStatus from "../../components/OrderStatus";


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

const columns4 = [
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
];

function Activity() {
    const [showCheckbox, setShowCheckbox] = useState(false)
    const history = useHistory();
    const columns2 = [
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
    const [dataOrderDetailExpried, setDataOrderDetailExpired] = useState([])
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
            listIds.splice(listIds.indexOf(data.id), 1)
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
                const id = response.data.message.replace(/\D/g, "")
                history.push('/auth/order/' + id)
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
        document.title = 'ACN | Lịch sử đặt hàng';
        getALLOrder()
        getALLOrderDetail()
        getALLOrderDetailExpired()
    }, [])

    const [status, setStatus] = React.useState('');
    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };
    const getALLOrderWithStatus = async (e) => {
        const response = await axios.get(API_GET_ALL_ORDER + "?status=" + status, {
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
    console.log("month ", listIds);
    useEffect(() => {
        getALLOrderWithStatus()
    }, [status])
    return (
        <div className='activity'>
            <div className='activity-content'>
                <div className='activity-title'>

                </div>
                <div className="activity-decription">
                    Bạn có thể xem lịch sử đặt hàng và đơn hàng đã đặt của bạn ở đây.
                </div>
            </div>

            <Box className='activity-history' sx={{ width: '85%', typography: 'body1', margin: 'auto' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', color: 'white', paddingTop: '30px !important' }}>
                        <TabList textColor='white' onChange={handleChange} aria-label="lab API tabs example ">
                            <Tab label="Đơn hàng đã đặt " value="1" />
                            <Tab label="Trụ đang thuê" value="2" />
                            <Tab label="Trụ sắp hết hạn" value="3" />
                            <Tab label="Trụ đã hết hạn" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 500 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>

                                            <TableCell
                                                sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }}
                                                align={'center'}
                                                width={330}
                                            >
                                                Id
                                            </TableCell>
                                            <TableCell
                                                sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }}
                                                align={'center'}

                                            >
                                                Ngày đặt hàng
                                            </TableCell>
                                            <TableCell
                                                sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }}
                                                align={'center'}

                                            >
                                                Số lượng sản phẩm
                                            </TableCell>

                                            <TableCell
                                                align={'center'}
                                            >
                                                <FormControl variant="standard" sx={{ minWidth: 120, color: 'black', fontWeight: '600', fontSize: '1.1em' }}>

                                                    <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="demo-simple-select-standard"
                                                        value={status}
                                                        onChange={handleChangeStatus}
                                                        label="Age"
                                                        displayEmpty
                                                        sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }}
                                                    >
                                                        <MenuItem sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }} value=''>
                                                            Trạng Thái
                                                        </MenuItem>
                                                        <MenuItem sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }} value={"NEW"}>Mới</MenuItem>
                                                        <MenuItem sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }} value={"EXTEND"}>Gia hạn</MenuItem>
                                                        <MenuItem sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }} value={"USER_CONFIRMED"}>Chờ admin phê duyệt</MenuItem>
                                                        <MenuItem sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }} value={"PAID"}>Đang thuê</MenuItem>
                                                        <MenuItem sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }} value={"DONE"}>Xong</MenuItem>
                                                        <MenuItem sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }} value={"CANCELLED"}>Đã hủy</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell
                                                sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }}
                                                align={'center'}
                                                width={150}
                                            >
                                                Chi tiết
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.length > 0 ? data.map((item, index) => (
                                            <TableRow key={index} >
                                                <TableCell align="center">{item.id}</TableCell>
                                                <TableCell align="center"> <Moment format="DD/MM/YYYY">{item.orderTime}</Moment></TableCell>
                                                <TableCell align="center">{item.totalProduct} sản phẩm</TableCell>
                                                {item.status !== "" ? <TableCell align="center">
                                                    <OrderStatus status={item.status}></OrderStatus>
                                                </TableCell> : null}
                                                <TableCell align="right">
                                                    <NavLink to={'order/' + item.id}>
                                                        <Button variant="contained" color="success">
                                                            Chi tiết
                                                        </Button>
                                                    </NavLink>
                                                </TableCell>
                                            </TableRow>
                                        )) :
                                            <TableRow >
                                                <TableCell align="center">Bạn chưa có đơn hàng nào, hãy <NavLink to={'/auth/homePage'}>đặt hàng</NavLink> ngay nhé ! .</TableCell>
                                            </TableRow>}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </TabPanel>
                    <TabPanel value="2">
                        <AreRenting columns2={columns2} dataOrderDetail={dataOrderDetail} showCheckbox={showCheckbox}
                            onchangeMonth={onchangeMonth} showExtend={showExtend} setShowCheckbox={setShowCheckbox} setShowExtend={setShowExtend}
                            handleClickOpen={handleClickOpen} setListIds={setListIds} handleChangeCheckbox={handleChangeCheckbox} month={month} />
                    </TabPanel>
                    <TabPanel value='3'>
                        <AboutToExpire columns4={columns2}
                            dataOrderDetailExpired={dataOrderDetail} showCheckbox={showCheckbox} showExtend={showExtend}
                            setShowCheckbox={setShowCheckbox} setShowExtend={setShowExtend} handleClickOpen={handleClickOpen}
                            onchangeMonth={onchangeMonth} setListIds={setListIds} handleChangeCheckbox={handleChangeCheckbox} month={month} />
                    </TabPanel>

                    <TabPanel value='4'>
                        <Expired columns4={columns4}
                            dataOrderDetailExpired={dataOrderDetailExpried} />
                    </TabPanel>
                </TabContext>
            </Box>
            {/* confirm value 2,3  */}
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