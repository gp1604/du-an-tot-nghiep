import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, InputBase, Tabs } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { formatMoney } from './../../common/formatMoney';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import './Pillar.css'
import ProductStatus from "../../components/ProductStatus";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import Typography from "@mui/material/Typography";
import Map from "./MapPillar";
import ReactLoading from 'react-loading';

const columns = [
    { id: 'id', label: 'Id', minWidth: 10, maxWidth: 10 },
    {
        id: 'image',
        label: 'Hình ảnh',
        minWidth: 90,
        align: 'center',

    },
    {
        id: 'name',
        label: 'Tên',
        minWidth: 90,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'price',
        label: 'Giá',
        minWidth: 90,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Description',
        label: 'Chú thích',
        minWidth: 130,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'AddressId',
        label: 'Địa chỉ',
        minWidth: 70,
        align: 'center',
    },
    {
        id: 'categoryId',
        label: 'Loại trụ',
        minWidth: 70,
        align: 'center',
    },
    {
        id: 'Status',
        label: 'Trạng thái',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'action',
        label: 'Hành động',
        minWidth: 70,
        align: 'right',
    },
];

export default function Pillar({ loading, handleOpenDelete, openDelete, search, handleCloseDelete, handleChangeRowsPerPage, totalPages, data, setOpen, onDelete, onEdit, page, rowsPerPage, handleChangePage }) {
    const [id, setId] = useState(Number)

    const handleOpen = () => setOpen(true)
    const onClickEdit = (data) => {
        onEdit(data)
    }
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };
    return (
        <>
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
            <Container fluid style={{ height: "200px" }} className="header bg-gradient-info pb-8 pt-5 pt-md-8 ">
                <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>

                    <Grid container spacing={1}>
                        <Grid item xs={2} >
                            <Button onClick={handleOpen} sx={{ padding: "10px 5px", marginRight: '2%', height: '3.2em', width: "100%" }} variant="contained" color="success">
                                Thêm Trụ
                            </Button>
                            <Box onClick={handleOpen} sx={{ padding: "4px 5px", textAlign: "center", display: "block", backgroundColor: "#2e7d32", borderRadius: "8px", mr: "5px" }}>
                                <AddIcon sx={{ color: "#FFFFFF", fontSize: "40px", width: "100%" }} />
                            </Box>
                        </Grid>
                        <Grid item xs={10}>
                            <Paper sx={{ boxShadow: "none", border: "1px solid #ddd", display: 'flex', padding: '7px 7px 3px 7px', width: '100%', marginBottom: '20px', borderRadius: '7px' }}>
                                <IconButton type="button" sx={{ p: '0px', }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <InputBase
                                    onChange={e => search(e.target.value)}
                                    sx={{ ml: 1, flex: 1, width: '90%', fontSize: '1.1em' }}
                                    placeholder="Tìm kiếm"
                                />
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* <TextField sx={{ mt: "7px", width: "400px" }} id="outlined-basic" label="Search" variant="outlined" /> */}
                    {/* stickyHeader */}
                    <TableContainer sx={{ height: '62vh' }}>
                        <Table aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }}
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data
                                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item, index) => (
                                        <TableRow hover role="checkbox" key={index}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <img style={{ width: '50px', height: '50px' }} src={item.image} alt="" />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {item.name}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {formatMoney(item.price)}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {item.description}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {item.address.fullAddress}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {item.category && item.category.name}</TableCell>

                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <ProductStatus status={item.status}></ProductStatus>
                                            </TableCell>


                                            <TableCell sx={{ textAlign: 'right' }}>
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
                                                                handleOpenDelete()
                                                                setId(item.id)
                                                            }}>
                                                            <DeleteIcon></DeleteIcon>
                                                            Xóa
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            href="#pablo"
                                                            onClick={(e) => onClickEdit(item)}>
                                                            <EditIcon></EditIcon>
                                                            Sửa
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                <Modal
                                    open={openDelete}
                                    onClose={handleCloseDelete}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box className='form-add-address'
                                        sx={{
                                            width: '40%',
                                            position: 'relative',
                                            transform: "translate(-50%, -50%)",
                                            backgroundColor: 'white',
                                            padding: '10px',
                                            top: "50%",
                                            left: "50%"
                                            // borderRadius: "10px"
                                        }}
                                    >
                                        <div style={{ borderBottom: "1px solid #ddd", margin: "0px 10px", color: "#333" }}>Lưu ý</div>
                                        <h2 style={{ textAlign: 'center', margin: "60px", }}>Xác nhận xoá trụ quảng cáo ?</h2>

                                        <div style={{ borderBottom: "1px solid #ddd", margin: "0px 10px" }} />

                                        <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
                                            <button onClick={handleCloseDelete} style={{ width: "110px" }} type="button" className="btn btn-primary">Huỷ</button>
                                            <button onClick={(e) => onDelete(id)} style={{ width: "110px" }} type="button" className="btn btn-primary">Xác nhận</button>
                                        </div>

                                    </Box>

                                </Modal>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={totalPages}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        // pageSize={1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </>
    )
}
