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
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputBase } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
const columns = [
    { id: 'Id', label: 'Id', minWidth: 70, maxWidth: 70 },
    {
        id: 'Name',
        label: 'Tên ngân hàng',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'desc',
        label: 'Mã ngân hàng',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'desc',
        label: 'Số tài khoản',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'desc',
        label: 'Tên chủ tài khoản',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'action',
        label: 'Hành động',
        minWidth: 70,
        maxWidth: 90,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },

];
export default function Banks({ setOpen, data, handleOpenDelete, openDelete, handleCloseDelete, onDelete, onEdit }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleOpen = () => setOpen(true);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [id, setId] = useState()
    return (
        <div>
            <Container fluid style={{ height: "200px" }} className="header bg-gradient-info pb-8 pt-5 pt-md-8 ">
                <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>

                    <Grid container spacing={1}>
                        <Grid item xs={2} >
                            <Button onClick={handleOpen} sx={{ padding: "10px 5px", marginRight: '2%', height: '3.2em', width: "100%" }} variant="contained" color="success">
                                Thêm tài khoản
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
                                    sx={{ ml: 1, flex: 1, width: '90%', fontSize: '1.1em' }}
                                    placeholder="Tìm kiếm loại trụ"
                                />
                            </Paper>
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
                                            <TableCell sx={{ textAlign: 'center' }}>  {item.bankName} </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {item.bankCode}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {item.bankAccountNumber}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {item.bankAccountName}</TableCell>

                                            <TableCell sx={{ textAlign: 'right' }}>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle
                                                        className="btn-icon-only text-light"
                                                        href="#pablo"
                                                        role="button"
                                                        size="sm"
                                                        color=""
                                                    >
                                                        <i className="fas fa-ellipsis-v" />
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                                        <DropdownItem
                                                            onClick={(e) => {
                                                                handleOpenDelete()
                                                                setId(item.id)
                                                            }}
                                                        >
                                                            <DeleteIcon></DeleteIcon>
                                                            Delete

                                                        </DropdownItem>
                                                        <DropdownItem
                                                            onClick={(e) => onEdit(item)}
                                                        >
                                                            <EditIcon></EditIcon>
                                                            Update
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
                                        }}
                                    >
                                        <div style={{ borderBottom: "1px solid #ddd", margin: "0px 10px", color: "#333" }}>Lưu ý</div>
                                        <h2 style={{ textAlign: 'center', margin: "60px", }}>Xác nhận xoá ?</h2>

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
                        rowsPerPageOptions={[6, 25, 100]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </div >
    )
}
