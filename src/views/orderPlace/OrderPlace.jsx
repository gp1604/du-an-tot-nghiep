import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { Button, Grid, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import axios from 'axios';
import { API_CONFIRM_ORDER } from 'utils/const';
import { toast } from 'react-toastify';
import { API_GET_DETAIL_ORDER } from 'utils/const';
import Modal from '@mui/material/Modal';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import OrderDetailPopup from './OrderDetailPopup';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import InfoIcon from '@mui/icons-material/Info';
import { API_EXTEND_TIME } from 'utils/const';
import DialogExtendTime from './DialogExtendTimeTomorrow';
import DialogConfirmOrder from './DialogConfirmOrder';
import DialogRefuseOrder from './DialogRefuseOrder';
import DialogExtendTimeToday from './DialogExtendTimeToday';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { API_GET_ORDER_ADMIN } from 'utils/const';
import { showError } from 'utils/error';
import AdminSize from "../Realtime/AdminSize";
import { formatMoney } from './../../common/formatMoney';
import moment from 'moment';
import { parse } from "@fortawesome/fontawesome-svg-core";

const columns = [
    {
        id: 'detail', label: 'Chi tiết', minWidth: 90, maxWidth: 90, align: 'left',
    },
    // { id: 'id', label: 'Id', minWidth: 50 },
    {
        id: 'orderCode',
        label: 'Mã đặt hàng',
        minWidth: 150,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'nameCustomer',
        label: 'Tên khách',
        minWidth: 150,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'phoneNumber',
        label: 'Số điện thoại',
        minWidth: 150,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'quantity',
        label: 'Số lượng',
        minWidth: 50,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'total',
        label: 'Tổng tiền',
        minWidth: 150,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'status',
        label: 'Trạng thái',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },

    {
        id: 'Xác nhận',
        label: 'Xác nhận',
        minWidth: 50,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Huỷ',
        label: 'Huỷ',
        minWidth: 50,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Khác',
        label: 'Khác',
        minWidth: 50,
        align: 'right',
    },

];


function OrderPlace() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    const [size, setSize] = React.useState(0);
    const [data, setData] = useState([])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [open, setOpen] = useState(false);


    useEffect(() => {
        getOrderUserConfirmed()
    }, [])

    useEffect(() => {
        getOrderUserConfirmed()
    }, [size])

    let d = new Date();
    d.setMonth(d.getMonth() - 1);
    let fromDate = d.getDate() + '/' + parseInt(d.getMonth() + 1) + '/' + d.getFullYear()
    d.setMonth(d.getMonth() + 2);
    let toDate = d.getDate() + '/' + parseInt(d.getMonth() + 1) + '/' + d.getFullYear()
    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(null);
    const [keyword, setKeyword] = useState(null);

    const getOrderUserConfirmed = async (e) => {
        const response = await axios.get(API_GET_ORDER_ADMIN + '?fromDate=' + fromDate + '&toDate=' + toDate)
        if (response && response.status === 200) {
            setData(response.data)
        }
    }

    //search with date
    const searchWithDate = async (e) => {
        if (date1 == null) {
            toast.warning('Vui lòng chọn thời gian bắt đầu ', { autoClose: 1200 })
        } else if (date2 == null) {
            toast.warning('Vui lòng chọn thời gian kết thúc ', { autoClose: 1200 })

        }
        else if (date1 > date2) {
            toast.warning('Thời gian bắt đầu không được lớn hơn thời gian kết thúc ', { autoClose: 1200 })
        } else {
            if (keyword == null) {
                const response = await axios.get(API_GET_ORDER_ADMIN + '?fromDate=' + moment(date1).format("DD/MM/YYYY") + '&toDate=' + moment(date2).format("DD/MM/YYYY"))
                if (response && response.status === 200) {
                    setSize(size)
                    setData(response.data)
                    toast.success('Tìm kiếm thành công', { autoClose: 1000 })
                }
            } else {
                const response = await axios.get(API_GET_ORDER_ADMIN + '?fromDate=' + moment(date1).format("DD/MM/YYYY") + '&toDate=' + moment(date2).format("DD/MM/YYYY") + '&keyword=' + keyword)
                if (response && response.status === 200) {
                    setSize(size)
                    setData(response.data)
                    toast.success('Tìm kiếm thành công', { autoClose: 1000 })
                }
            }
        }
    }
    //handle status
    const [status, setStatus] = React.useState('');

    const handleChange = async (event) => {
        setStatus(event.target.value);
        if (date1 == null || date2 == null) {
            if (keyword == null) {
                if (event.target.value === '') {
                    const response = await axios.get(API_GET_ORDER_ADMIN +
                        '?fromDate=' + fromDate + '&toDate=' + moment().format("DD/MM/YYYY"))
                    if (response && response.status === 200) {
                        setData(response.data)
                    }
                } else {
                    const response = await axios.get(API_GET_ORDER_ADMIN + '?fromDate=' + fromDate + '&toDate=' + moment().format("DD/MM/YYYY") + '&status=' + event.target.value)
                    if (response && response.status === 200) {
                        setData(response.data)
                    }
                }
            } else {
                if (event.target.value === '') {
                    const response = await axios.get(API_GET_ORDER_ADMIN +
                        '?fromDate=' + fromDate + '&toDate=' + moment().format("DD/MM/YYYY") + '&keyword=' + keyword)
                    if (response && response.status === 200) {
                        setData(response.data)
                    }
                } else {
                    const response = await axios.get(API_GET_ORDER_ADMIN + '?fromDate=' + fromDate + '&toDate=' + moment().format("DD/MM/YYYY")
                        + '&status=' + event.target.value + '&keyword=' + keyword)
                    if (response && response.status === 200) {
                        setData(response.data)
                    }
                }
            }
        } else {
            if (keyword == null) {
                if (event.target.value === '') {
                    const response = await axios.get(API_GET_ORDER_ADMIN +
                        '?fromDate=' + moment(date1).format("DD/MM/YYYY") + '&toDate=' + moment(date2).format("DD/MM/YYYY"))
                    if (response && response.status === 200) {
                        setData(response.data)
                    }
                } else {
                    const response = await axios.get(API_GET_ORDER_ADMIN + '?fromDate=' + moment(date1).format("DD/MM/YYYY") + '&toDate=' + moment(date2).format("DD/MM/YYYY") + '&status=' + event.target.value)
                    if (response && response.status === 200) {
                        setData(response.data)
                    }
                }
            } else {
                if (event.target.value === '') {
                    const response = await axios.get(API_GET_ORDER_ADMIN +
                        '?fromDate=' + moment(date1).format("DD/MM/YYYY") + '&toDate=' + moment(date2).format("DD/MM/YYYY") + '&keyword=' + keyword)
                    if (response && response.status === 200) {
                        setData(response.data)
                    }
                } else {
                    const response = await axios.get(API_GET_ORDER_ADMIN + '?fromDate=' + moment(date1).format("DD/MM/YYYY") + '&toDate=' + moment(date2).format("DD/MM/YYYY")
                        + '&status=' + event.target.value + '&keyword=' + keyword)
                    if (response && response.status === 200) {
                        setData(response.data)
                    }
                }
            }
        }
    };
    //handle
    const handleOpen = () => setOpen(true)

    const [openConfirmOrder, setOpenConFirmOrder] = React.useState(false);

    const handleClickOpenConfirmOrder = () => {
        setOpenConFirmOrder(true);
    };

    const handleCloseConfirmOrder = () => {
        setOpenConFirmOrder(false);
    };

    const confirmOrder = async (id) => {
        try {
            const response = await axios.put(API_CONFIRM_ORDER + id + '/true')
            if (response.status === 200) {
                toast.success('Thao tác thành công ! ', { autoClose: 2000 })
                getOrderUserConfirmed()
            } else toast.error('Thất bại ! ', { autoClose: 2000 })
        } catch (error) {
            showError(error)
        }
    }
    const [openRefuseOrder, setOpenRefuseOrder] = React.useState(false);

    const handleClickOpenRefuseOrder = () => {
        setOpenRefuseOrder(true);
    };

    const handleCloseRefuseOrder = () => {
        setOpenRefuseOrder(false);
    };
    const refuseOrder = async (id) => {
        try {
            const response = await axios.put(API_CONFIRM_ORDER + id + '/false')
            if (response.status === 200) {
                toast.success('Thao tác thành công ! ', { autoClose: 2000 })
                getOrderUserConfirmed()
                // Sidebar
            } else toast.error('Thất bại ! ', { autoClose: 2000 })
        } catch (error) {
            showError(error)
        }
    }

    //handle click detail
    const [openDetail, setOpenDetail] = React.useState(false);
    const [dataDetail, setDataDetail] = useState([])
    const handleCloseDetailOrder = () => setOpenDetail(false);

    const handleOpenDetailOrder = async (id) => {
        console.log(id);
        const response = await axios.get(API_GET_DETAIL_ORDER + id)
        if (response.status === 200) {
            setDataDetail(response.data.orderDetail)
        }
        setOpenDetail(true)
    };

    //handle popup confirm
    const [openConfirmTomorrow, setOpenConFirmTomorrow] = React.useState(false);

    const handleClickOpenConfirmTomorrow = () => {
        setOpenConFirmTomorrow(true);
    };

    const handleCloseConfirmTomorrow = () => {
        setOpenConFirmTomorrow(false);
    };


    const [openConfirmToday, setOpenConFirmToday] = React.useState(false);

    const handleClickOpenConfirmToday = () => {
        setOpenConFirmToday(true);
    };

    const handleCloseConfirmToday = () => {
        setOpenConFirmToday(false);
    };

    const [idSave, setIdSave] = React.useState(Number);

    const extendTime = async (id) => {
        const response = await axios.post(API_EXTEND_TIME + id + '?day=tomorrow')
        if (response.status === 200) {
            toast.success('Thao tác thành công ! ', { autoClose: 1500 })
            getOrderUserConfirmed()
            // Sidebar
        } else toast.error('Thất bại ! ', { autoClose: 2000 })
    }

    const extendTimeToday = async (id) => {
        const response = await axios.post(API_EXTEND_TIME + id)
        if (response.status === 200) {
            toast.success('Thao tác thành công ! ', { autoClose: 1500 })
            getOrderUserConfirmed()
            // Sidebar
        } else toast.error('Thất bại ! ', { autoClose: 2000 })
    }

    const search = async (e) => {
        // .replace("0", "%2b84")
        if (date1 == null || date2 == null) {
            const response = await axios.get(API_GET_ORDER_ADMIN +
                '?fromDate=' + fromDate + '&toDate=' + moment().format("DD/MM/YYYY") + '&keyword=' + e.target.value)
            if (response && response.status === 200) {
                setData(response.data)
            }
        } else {
            const response = await axios.get(API_GET_ORDER_ADMIN + '?fromDate=' + moment(date1).format("DD/MM/YYYY")
                + '&toDate=' + moment(date2).format("DD/MM/YYYY") + '&keyword=' + e.target.value)
            if (response && response.status === 200) {
                setData(response.data)
            }
        }

    };
    console.log("key ", keyword);
    return (
        <>
            <AdminSize changeCount={(data) => setSize(data)} ></AdminSize>
            <Container fluid style={{ height: "200px" }} className="header bg-gradient-info pb-8 pt-5 pt-md-8 ">
                <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>

                    <Grid container spacing={1} xs={12} style={{ width: '100%', display: "flex", flexDirection: "row" }}>
                        {/* <Button onClick={handleOpen} sx={{ padding: "10px 5px", marginRight: '2%', height: '3.2em', width: "15%" }} variant="contained" color="success">
                            Thêm Trụ
                        </Button> */}
                        <Grid item xs={7}>
                            <Paper sx={{ boxShadow: "none", border: "1px solid #ddd", display: 'flex', padding: '5px 7px 5px 7px', marginBottom: '20px', borderRadius: '7px' }}>
                                <IconButton type="button" sx={{ p: '0px', }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <InputBase
                                    sx={{ ml: 1, flex: 1, width: '90%', fontSize: '1.1em' }}
                                    placeholder="Tìm kiếm mã đơn hàng"
                                    onChange={e => {
                                        // const ket = e.target.value.replace("0", '%2b84');

                                        // setKeyword(ket)
                                        setKeyword(e.target.value)
                                        search(e)
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={5} style={{ display: 'flex', flexDirection: "row" }}>
                            <input onChange={e => setDate1(e.target.value)} name="date1" style={{ width: '33%', height: '6vh', padding: "5px 10px", borderRadius: "8px" }} className="mr-3" id='date1' type="date" />
                            <input onChange={e => setDate2(e.target.value)} style={{ width: '33%', height: '6vh', padding: "5px 10px", borderRadius: "8px" }} className="mr-3" id='date2' type="date" />
                            <Button
                                color="success"
                                variant="contained"
                                sx={{ height: '6vh', width: '34%' }}
                                onClick={searchWithDate}
                                style={{ marginLeft: '5px', padding: '10px 20px' }}
                            >
                                Tìm kiếm
                            </Button>
                        </Grid>
                    </Grid>
                    <TableContainer sx={{ minHeight: '29em' }}>
                        <Table aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        column.id !== "status" ?
                                            <TableCell
                                                sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }}
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}>
                                                {column.label}
                                            </TableCell>
                                            :
                                            <TableCell
                                                align={'center'}>
                                                <FormControl variant="standard" sx={{ minWidth: 120, color: 'black', fontWeight: '600', fontSize: '1.1em' }}>
                                                    <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="demo-simple-select-standard"
                                                        value={status}
                                                        onChange={handleChange}
                                                        label="Age"
                                                        displayEmpty
                                                        sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }}>
                                                        <MenuItem sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }} value=''>
                                                            Trạng Thái
                                                        </MenuItem>
                                                        <MenuItem sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }} value={"NEW"}>Mới</MenuItem>
                                                        <MenuItem sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }} value={"EXTEND"}>Gia hạn</MenuItem>
                                                        <MenuItem sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }} value={"USER_CONFIRMED"}>Chờ phê duyệt</MenuItem>
                                                        <MenuItem sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }} value={"PAID"}>Đang thuê</MenuItem>
                                                        <MenuItem sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }} value={"DONE"}>Xong</MenuItem>
                                                        <MenuItem sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }} value={"CANCELLED"}>Đã hủy</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.length > 0 ? data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item, index) => (
                                        <TableRow hover sx={{ cursor: 'pointer' }} role="checkbox" key={index}>
                                            <TableCell sx={{ textAlign: 'left' }}>
                                                <InfoIcon style={{ color: '#1E90FF' }} onClick={() => handleOpenDetailOrder(item.id)} />
                                            </TableCell>
                                            {/* <TableCell>{item.id}</TableCell> */}
                                            <TableCell sx={{ textAlign: 'center' }}> {item.orderCode}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {item.fullName}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {item.phoneNumber.replace("+84", "0")}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {item.quantity}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{formatMoney(item.total)}</TableCell>
                                            {item.status === 'NEW' ? <TableCell sx={{ textAlign: 'center', color: 'green' }}> Mới</TableCell> : ''}
                                            {item.status === 'DONE' ? <TableCell sx={{ textAlign: 'center', color: 'blue' }}> Đã xong</TableCell> : ''}
                                            {item.status === 'CANCELLED' ? <TableCell sx={{ textAlign: 'center', color: 'red' }}> Đã hủy</TableCell> : ''}
                                            {item.status === 'PAID' ? <TableCell sx={{ textAlign: 'center', color: '#ffa700' }}> Đang thuê</TableCell> : ''}
                                            {item.status === 'EXTEND' ? <TableCell sx={{ textAlign: 'center', color: 'purple' }}> Gia hạn</TableCell> : ''}
                                            {item.status === 'USER_CONFIRMED' ? <TableCell sx={{ textAlign: 'center', color: 'orange' }}> Đã thanh toán </TableCell> : ''}

                                            {item.status === 'NEW' || item.status === 'USER_CONFIRMED' || item.status === 'EXTEND' ?
                                                <React.Fragment>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        <Button variant="contained" onClick={e => {
                                                            handleClickOpenConfirmOrder()
                                                            setIdSave(item.id)
                                                        }} color="success">
                                                            <CheckIcon />
                                                        </Button>

                                                        {/* <MoreTimeIcon sx={{ ml: 2 }} onClick={e => {
                                                    handleClickOpenConfirm()
                                                    setIdSave(item.id)
                                                }} ></MoreTimeIcon> */}
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        <Button variant="contained" onClick={e => {
                                                            handleClickOpenRefuseOrder()
                                                            setIdSave(item.id)
                                                        }} color="error">
                                                            <DoDisturbIcon />
                                                        </Button>
                                                    </TableCell>

                                                    <TableCell sx={{ textAlign: "right" }}>
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle
                                                                className="btn-icon-only text-light"
                                                                href="#pablo"
                                                                role="button"
                                                                size="sm"
                                                                color=""
                                                                onClick={(e) => e.preventDefault()}
                                                            >
                                                                <i className="fas fa-ellipsis-v" />
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                                <DropdownItem
                                                                    onClick={e => {
                                                                        handleClickOpenConfirmTomorrow()
                                                                        setIdSave(item.id)
                                                                    }}>
                                                                    <MoreTimeIcon />
                                                                    Gia hạn sang ngày mai

                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    onClick={e => {
                                                                        handleClickOpenConfirmToday()
                                                                        setIdSave(item.id)
                                                                    }}>
                                                                    <MoreTimeIcon />
                                                                    Gia hạn đến hết hôm nay
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </TableCell>
                                                </React.Fragment> :
                                                //disable
                                                <React.Fragment>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        <Button variant="contained" disabled={true}>
                                                            <CheckIcon />
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        <Button variant="contained" disabled={true} >
                                                            <DoDisturbIcon />
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: "right" }}>
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle
                                                                className="btn-icon-only text-light"
                                                                href="#pablo"
                                                                role="button"
                                                                size="sm"
                                                                color=""
                                                                onClick={(e) => e.preventDefault()}
                                                            >
                                                                <i className="fas fa-ellipsis-v" />
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                                <DropdownItem
                                                                    disabled>
                                                                    <MoreTimeIcon />
                                                                    Gia hạn sang ngày mai

                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    disabled>
                                                                    <MoreTimeIcon />
                                                                    Gia hạn đến hết hôm nay
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </TableCell>
                                                </React.Fragment>}
                                        </TableRow>
                                    )) :
                                    <TableRow >
                                        <TableCell style={{ borderBottom: '0px solid black' }}> <h4 style={{ fontStyle: 'italic', marginTop: '8px', position: 'absolute' }} > Hiện không có đơn hàng nào !</h4></TableCell>
                                    </TableRow>}
                                <DialogExtendTime openConfirm={openConfirmTomorrow} handleCloseConfirm={handleCloseConfirmTomorrow} idSave={idSave} extendTime={extendTime} />
                                <DialogExtendTimeToday openConfirmToday={openConfirmToday} handleCloseConfirmToday={handleCloseConfirmToday} idSave={idSave} extendTimeToday={extendTimeToday} />
                                <DialogConfirmOrder openConfirmOrder={openConfirmOrder} handleCloseConfirmOrder={handleCloseConfirmOrder} idSave={idSave} confirmOrder={confirmOrder} />
                                <DialogRefuseOrder openRefuseOrder={openRefuseOrder} handleCloseRefuseOrder={handleCloseRefuseOrder} idSave={idSave} refuseOrder={refuseOrder} />

                                <OrderDetailPopup dataDetail={dataDetail} openDetail={openDetail} handleCloseDetailOrder={handleCloseDetailOrder} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[6, 10, 25, 100]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </Container>
        </>
    )
}

export default OrderPlace