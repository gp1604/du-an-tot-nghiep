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

import { Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import Modal from '@mui/material/Modal';
import ReactLoading from 'react-loading';

const label = { inputProps: { 'aria-label': 'Color switch demo' } };
const columns = [
    { id: 'Id', label: 'Id', minWidth: 70, maxWidth: 70 },
    {
        id: 'link',
        label: 'Ảnh',
        minWidth: 120,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Name',
        label: 'Đường dẫn hình ảnh',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'category',
        label: 'Loại ảnh',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'active',
        label: 'Hiện ảnh',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'action',
        label: 'Hành động',
        minWidth: 80,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },

];

export default function Picture({ loading, data, setOpen, search, onEdit, onDelete }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleOpen = () => setOpen(true);

    const onClickEdit = (item) => {
        onEdit(item)
    }


    //handle popup confirm
    const [openConfirm, setOpenConFirm] = React.useState(false);

    const [idSave, setIdSave] = React.useState(Number);


    const handleClickOpenConfirm = () => {
        setOpenConFirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConFirm(false);
    };
    console.log('dât image ', data)
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
                                Thêm ảnh
                            </Button>
                            <Box onClick={handleOpen} sx={{ padding: "4px 5px", textAlign: "center", display: "block", backgroundColor: "#2e7d32", borderRadius: "8px", mr: "5px" }}>
                                <AddIcon sx={{ color: "#FFFFFF", fontSize: "40px", width: "100%" }} />
                            </Box>
                        </Grid>
                        {/* <Grid item xs={10}>
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
                        </Grid> */}

                    </Grid>
                    <TableContainer sx={{ height: '61vh' }}>
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
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item, index) => (
                                        <TableRow hover role="checkbox" key={index}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', width: '20%' }}>
                                                <img style={{ width: '50%', height: '8vh' }} src={item.photosImagePath} alt="hihi" />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>  {item.image} </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {item.category}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> <Switch {...label} disabled checked={item.active} color="secondary" /></TableCell>
                                            {/* <TableCell sx={{ textAlign: 'center', display: "flex", justifyContent: "space-around" }}>
                                                <DeleteIcon sx={{ cursor: 'pointer', marginRight: '39%' }} onClick={e => {
                                                    handleClickOpenConfirm()
                                                    setIdSave(item.id)
                                                }} />
                                                <EditIcon sx={{ cursor: 'pointer' }} onClick={(e) => onClickEdit(item)} />
                                            </TableCell> */}
                                            <TableCell sx={{ textAlign: 'right' }}>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle
                                                        className="btn-icon-only text-light"
                                                        role="button"
                                                        size="sm"
                                                        color=""
                                                    >
                                                        <i className="fas fa-ellipsis-v" />
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                                        <DropdownItem
                                                            onClick={(e) => {
                                                                handleClickOpenConfirm()
                                                                setIdSave(item.id)
                                                            }}
                                                        >
                                                            <DeleteIcon></DeleteIcon>
                                                            Xoá

                                                        </DropdownItem>
                                                        <DropdownItem
                                                            onClick={(e) => onClickEdit(item)}
                                                        >
                                                            <EditIcon></EditIcon>
                                                            Sửa
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                <Dialog
                                    open={openConfirm}
                                    onClose={handleCloseConfirm}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Xác nhận xóa hình ảnh"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Bạn chắc chắn muốn xóa hình ảnh này ? Lưu ý: sau khi
                                            xóa không thể khôi phục lại hình ảnh này.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseConfirm}>Hủy</Button>
                                        <Button onClick={e => {
                                            onDelete(idSave)
                                            handleCloseConfirm()
                                        }} autoFocus>
                                            Đồng ý
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[4, 25, 100]}
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
