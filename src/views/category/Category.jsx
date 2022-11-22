import React from 'react'
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
import { Button, IconButton, InputBase } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Moment from 'react-moment';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { data } from 'jquery';
import { OndemandVideoTwoTone, SettingsPowerRounded } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
const columns = [
    { id: 'Id', label: 'Id', minWidth: 70, maxWidth: 70 },
    {
        id: 'Name',
        label: 'Tên loại trụ',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'desc',
        label: 'Mô tả',
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

export default function Category({ handleOpenDelete, search, openDelete, handleCloseDelete, data, setOpen, onEdit, onDelete, totalPages, handleChangePage, handleChangeRowsPerPage, page, rowsPerPage }) {
    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(6);

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };
    const handleOpen = () => setOpen(true);
    const [idDelete, setIdDelete] = React.useState(Number);

    const onClickEdit = (item) => {
        onEdit(item)
    }
    return (
        <>
            <Container fluid style={{ height: "200px" }} className="header bg-gradient-info pb-8 pt-5 pt-md-8 ">
                <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>

                    <Grid container spacing={1}>
                        <Grid item xs={2.3} >
                            <Button onClick={handleOpen} sx={{ padding: "10px 5px", marginRight: '2%', height: '3.2em', width: "100%" }} variant="contained" color="success">
                                Thêm loại trụ
                            </Button>
                            <Box onClick={handleOpen} sx={{ padding: "4px 5px", textAlign: "center", display: "block", backgroundColor: "#2e7d32", borderRadius: "8px", mr: "5px" }}>
                                <AddIcon sx={{ color: "#FFFFFF", fontSize: "40px", width: "100%" }} />
                            </Box>
                        </Grid>
                        <Grid item xs={8.7}>
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
                                            <TableCell sx={{ textAlign: 'center' }}>  {item.name} </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {item.description}</TableCell>

                                            <TableCell sx={{ textAlign: 'right', display: "flex", justifyContent: "space-around" }}>
                                                <DeleteIcon sx={{ cursor: 'pointer' }} onClick={e => {
                                                    handleOpenDelete()
                                                    setIdDelete(item.id)
                                                }} />
                                                <EditIcon sx={{ cursor: 'pointer' }} onClick={(e) => onClickEdit(item)} />
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
                                        <h2 style={{ textAlign: 'center', margin: "60px", }}>Xác nhận xoá loại trụ này ?</h2>

                                        <div style={{ borderBottom: "1px solid #ddd", margin: "0px 10px" }} />

                                        <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
                                            <button onClick={handleCloseDelete} style={{ width: "110px" }} type="button" class="btn btn-primary">Huỷ</button>
                                            <button onClick={(e) => onDelete(idDelete)} style={{ width: "110px" }} type="button" class="btn btn-primary">Xác nhận</button>
                                        </div>

                                    </Box>

                                </Modal>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[7, 25, 100]}
                        component="div"
                        count={totalPages}
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