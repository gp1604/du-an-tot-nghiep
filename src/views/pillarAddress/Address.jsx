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
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import './css.css'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { IconButton, InputBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import "./PillarAddress.css"
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import {
    API_GET_ADDRESS_POINT_BY_ID,
    API_GET_DETAIL_ORDER
} from "../../utils/const";
import AddressPointBox from "./AddressPointBox";
import { Fragment } from 'react';
const columns = [
    { id: 'add', label: 'Map', minWidth: 70 },
    { id: 'Id', label: 'Id', minWidth: 70 },
    { id: 'image', label: 'Hình ảnh', align: 'center', minWidth: 100 },
    { id: 'City', label: 'Thành phố', align: 'center', minWidth: 100 },
    {
        id: 'Street',
        label: 'Đường',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'fullAddress',
        label: 'Địa chỉ',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Description',
        label: 'Chú thích',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Action',
        label: 'Hành động',
        maxWidth: 70,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
];

export default function Address({ handleOpenDelete, handleCloseDelete, openDelete, search, rowsPerPage, data, onDelete, onEdit, open, setOpen, totalPages, handleChangePage, handleChangeRowsPerPage, page }) {

    const [detailData, setDetailData] = useState([]);
    const [openDetailData, setOpenDetailData] = useState(false);
    const closeDetailData = () => setOpenDetailData(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleOpen = () => setOpen(true);

    const onClickEdit = (data) => {
        onEdit(data)
    }

    const [id, setId] = useState()

    function openDetailPoint(id) {
        setId(id)
        setOpenDetailData(true)
    }

    return (
        < >
            {openDetailData ? <AddressPointBox openDetail={openDetailData} closeDetail={closeDetailData} addressId={id} /> : null}
            <Container fluid style={{ height: "200px" }} className="header bg-gradient-info pb-8 pt-5 pt-md-8 ">
                <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>
                    <div className='header-custom-search' style={{ marginBottom: "10px", width: '100%', display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <Button onClick={handleOpen} sx={{ padding: "10px 5px", marginRight: '2%', height: '3.2em', width: "15%" }} variant="contained" color="success">
                            Thêm địa chỉ
                        </Button>

                        <Box onClick={handleOpen} sx={{ display: "block", padding: "12px", backgroundColor: "#2e7d32", borderRadius: "8px", mr: "5px" }}>
                            <AddIcon sx={{ color: "#FFFFFF" }} />
                        </Box>

                        {/* <TextField sx={{display: 'flex',padding: '7px 7px 3px 7px', width: '100%', borderRadius: '7px' }} id="outlined-basic" label="Search" variant="outlined" /> */}

                        <Paper sx={{ boxShadow: "none", border: "1px solid #ddd", display: 'flex', padding: '7px 7px 3px 7px', width: '100%', borderRadius: '7px', '&:focus': { border: "1px solid blue" } }}>
                            {/* <IconButton type="button" sx={{ p: '0px', }} aria-label="search">
                                <SearchIcon />
                            </IconButton> */}
                            <InputBase
                                onChange={(e) => search(e.target.value)}
                                sx={{ ml: 1, flex: 1, width: '90%', fontSize: '1.1em' }}
                                placeholder="Tìm kiếm"
                            />
                        </Paper>
                    </div>

                    {/* <TextField sx={{ mt: "7px", width: "400px" }} id="outlined-basic" label="Search" variant="outlined" /> */}
                    {/* stickyHeader */}
                    <TableContainer sx={{ height: '65vh' }}>
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
                                            <TableCell sx={{ textAlign: 'left', color: 'green', cursor: 'pointer' }}>
                                                <AddLocationAltIcon onClick={() => openDetailPoint(item.id)}>
                                                </AddLocationAltIcon>
                                            </TableCell>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <img style={{ width: '50px', height: '50px' }} src={item.photosImagePath} alt="" />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {item.city} </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>  {item.street} </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>  {item.fullAddress} </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>  {item.description} </TableCell>

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
                                                            href="#pablo"
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
                                                            Cập nhập
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
                                    <Box className='form-add-product'
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
                                        <h2 style={{ textAlign: 'center', margin: "60px", }}>Xác nhận xoá địa chỉ ?</h2>

                                        <div style={{ borderBottom: "1px solid #ddd", margin: "0px 10px" }} />

                                        <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
                                            <button onClick={handleCloseDelete} style={{ width: "110px" }} type="button" class="btn btn-primary">Huỷ</button>
                                            <button onClick={(e) => onDelete(id)} style={{ width: "110px" }} type="button" class="btn btn-primary">Xác nhận</button>
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
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container >
        </>
    )
}
