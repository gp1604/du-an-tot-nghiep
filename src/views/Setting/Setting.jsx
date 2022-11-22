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

const columns = [
    {
        id: 'Name',
        label: 'Tên ',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'desc',
        label: 'Thuộc tính',
        minWidth: 170,
        align: 'left',
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
export default function Setting({ data, setOpen, onEdit }) {
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
    return (
        <div>
            <Container fluid style={{ height: "200px" }} className="header bg-gradient-info pb-8 pt-5 pt-md-8 ">
                <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>

                    <div style={{ width: '100%', display: "flex", flexDirection: "row" }}>

                    </div>

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
                                    .map((item, index) => (
                                        <TableRow hover role="checkbox" key={index}>
                                            <TableCell sx={{ textAlign: 'left' }}>{item.key}</TableCell>
                                            <TableCell sx={{ textAlign: 'left' }}>{item.value}</TableCell>
                                            {item.key === "MAIL_FROM" || item.key === "MAIL_PASSWORD" || item.key === "MAIL_SENDER_NAME" ||
                                                item.key === "MAIL_USERNAME" ?
                                                <TableCell sx={{ textAlign: 'right', display: "flex", justifyContent: "space-around" }}>
                                                    <EditIcon onClick={(e) => onEdit(item)} sx={{ cursor: 'pointer' }} />
                                                </TableCell> :
                                                <TableCell sx={{ textAlign: 'left' }}></TableCell>
                                            }
                                            {/* <Modal
                                                open={openDelete}
                                                onClose={handleCloseDelete}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box className='form-add-product'
                                                    sx={{
                                                        width: '40%',
                                                        margin: 'auto',
                                                        marginTop: '270px',
                                                        backgroundColor: 'white',
                                                        padding: '10px',
                                                        // borderRadius: "10px"
                                                    }}
                                                >
                                                    <div style={{ borderBottom: "1px solid #ddd", margin: "0px 10px", color: "#333" }}>Lưu ý</div>
                                                    <h2 style={{ textAlign: 'center', margin: "60px", }}>Xác nhận xoá loại trụ này ?</h2>

                                                    <div style={{ borderBottom: "1px solid #ddd", margin: "0px 10px" }} />

                                                    <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
                                                        <button onClick={handleCloseDelete} style={{ width: "110px" }} type="button" class="btn btn-primary">Huỷ</button>
                                                        <button onClick={(e) => onDelete(item.id)} style={{ width: "110px" }} type="button" class="btn btn-primary">Xác nhận</button>
                                                    </div>

                                                </Box>

                                            </Modal> */}
                                        </TableRow>

                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[8, 25, 100]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </div>
    )
}
