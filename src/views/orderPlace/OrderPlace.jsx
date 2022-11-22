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
        id: 'Status',
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
        setSize(size)
        getOrderUserConfirmed()
    }, [size])


    const [data, setData] = useState([])
    const getOrderUserConfirmed = async (e) => {
        const response = await axios.get(API_GET_ORDER_ADMIN)
        if (response && response.status === 200) {
            setData(response.data)
        }
    }


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

    //handle status
    const [status, setStatus] = React.useState('');

    const handleChange = async (event) => {
        setStatus(event.target.value);
        console.log('status ', event.target.value);
        if (event.target.value !== 'ALL') {
            const response = await axios.get(API_GET_ORDER_ADMIN + '?status=' + event.target.value)
            if (response && response.status === 200) {
                setData(response.data)
            }
        } else {
            const response = await axios.get(API_GET_ORDER_ADMIN)
            if (response && response.status === 200) {
                setData(response.data)
            }
        }
    };

    const [keyword, setKeyword] = React.useState('');

    const search = async (e) => {
        const response = await axios.get(API_GET_ORDER_ADMIN + '?keyword=' + e.target.value)
        if (response && response.status === 200) {
            setData(response.data)
        }
    };
    return (
        <>
            <AdminSize changeCount={(data) => setSize(data)} ></AdminSize>

            <Container fluid style={{ height: "200px" }} className="header bg-gradient-info pb-8 pt-5 pt-md-8 ">
                <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>

                    <Grid container spacing={1} xs={12} style={{ width: '100%', display: "flex", flexDirection: "row" }}>
                        {/* <Button onClick={handleOpen} sx={{ padding: "10px 5px", marginRight: '2%', height: '3.2em', width: "15%" }} variant="contained" color="success">
                            Thêm Trụ
                        </Button> */}
                        <Grid item xs={9}>
                            <Paper sx={{ boxShadow: "none", border: "1px solid #ddd", display: 'flex', padding: '5px 7px 5px 7px', marginBottom: '20px', borderRadius: '7px' }}>
                                <IconButton type="button" sx={{ p: '0px', }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <InputBase
                                    sx={{ ml: 1, flex: 1, width: '90%', fontSize: '1.1em' }}
                                    placeholder="Tìm kiếm mã đơn hàng"
                                    onChange={e => search(e)}
                                />
                            </Paper>
                        </Grid>
                        {/* <Button onClick={search} sx={{ width: '15%', marginLeft: '1%', height: '6.3vh' }} variant="contained" color="success">
                            Tìm kiếm
                        </Button> */}
                        <Grid item xs={3}>
                            <FormControl sx={{ m: 1, width: "100%" }} size="small">
                                <InputLabel id="demo-select-small">Trạng thái</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={status}
                                    label="status"
                                    onChange={handleChange}>
                                    <MenuItem value={'ALL'}>Tất cả</MenuItem>
                                    <MenuItem value={'NEW'}>Mới </MenuItem>
                                    <MenuItem value={'CANCELLED'}>Đã hủy </MenuItem>
                                    <MenuItem value={'DONE'}>Xong </MenuItem>
                                    <MenuItem value={'USER_CONFIRMED'}>Đã xác nhận </MenuItem>
                                    <MenuItem value={'PAID'}>Đang thuê</MenuItem>
                                    <MenuItem value={'EXTEND'}>Gia hạn</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>


                    </Grid>

                    {/* <TextField sx={{ mt: "7px", width: "400px" }} id="outlined-basic" label="Search" variant="outlined" /> */}
                    {/* stickyHeader */}
                    <TableContainer sx={{ minHeight: '29em' }}>
                        <Table aria-label="sticky table">
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
                                            <TableCell sx={{ textAlign: 'center' }}> {item.phoneNumber}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {item.quantity}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{formatMoney(item.total)}</TableCell>
                                            {item.status === 'NEW' ? <TableCell sx={{ textAlign: 'center', color: 'green' }}> Mới</TableCell> : ''}
                                            {item.status === 'DONE' ? <TableCell sx={{ textAlign: 'center', color: 'blue' }}> Đã xong</TableCell> : ''}
                                            {item.status === 'CANCELLED' ? <TableCell sx={{ textAlign: 'center', color: 'red' }}> Đã hủy</TableCell> : ''}
                                            {item.status === 'PAID' ? <TableCell sx={{ textAlign: 'center', color: '#ffa700' }}> Đang thuê</TableCell> : ''}
                                            {item.status === 'EXTEND' ? <TableCell sx={{ textAlign: 'center', color: 'purple' }}> Gia hạn</TableCell> : ''}
                                            {item.status === 'USER_CONFIRMED' ? <TableCell sx={{ textAlign: 'center', color: 'green' }}> Đã xác nhận </TableCell> : ''}

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
                                        <TableCell style={{ borderBottom: '0px solid black' }}> <h4 style={{ fontStyle: 'italic', marginTop: '8px', position: 'absolute' }} > Hiện chưa có ai đặt hàng !</h4></TableCell>
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