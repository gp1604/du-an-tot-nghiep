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
import Moment from 'react-moment';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { data } from 'jquery';
import { formatMoney } from './../../common/formatMoney';
const columns = [
    { id: 'Id', label: 'Id', minWidth: 70, maxWidth: 70 },
    {
        id: 'name',
        label: 'Tên trụ',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'price',
        label: 'Giá tiền',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },

    { id: 'description', label: 'Tên khách', minWidth: 150, align: 'center', },
    {
        id: 'status',
        label: 'Số điện thoại',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'address', label: 'Địa chỉ trụ', minWidth: 150, align: 'center', },
    { id: 'timeStart', label: 'Ngày bắt đầu', minWidth: 150, align: 'center', },

    { id: 'expriedDate', label: 'Ngày hết hạn', minWidth: 150, align: 'center', },

    // { id: 'street', label: 'street', minWidth: 150, align: 'center', },
    // { id: 'action', label: 'Hành động', minWidth: 150, align: 'right', },
];
export default function HiringPillar({ data, page, search, rowsPerPage, totalPages, handleChangePage, handleChangeRowsPerPage }) {

    return (
        <>
            <Container fluid style={{ height: "200px" }} className="header bg-gradient-info pb-8 pt-5 pt-md-8 ">
                <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>

                    <div style={{ width: '100%', display: "flex", flexDirection: "row" }}>
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
                    </div>

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
                                            <TableCell sx={{ textAlign: 'center' }}>  {item.name} </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}> {formatMoney(item.price)}</TableCell>
                                            {item.status === 'HIRING' ? <TableCell sx={{ textAlign: 'center' }}> {JSON.parse(item.user).firstName + ' ' + JSON.parse(item.user).lastName}</TableCell> : <TableCell sx={{ textAlign: 'center' }}>Chưa thuê</TableCell>}
                                            {item.status === 'HIRING' ? <TableCell sx={{ textAlign: 'center' }}> {JSON.parse(item.user).phoneNumber}</TableCell> : <TableCell sx={{ textAlign: 'center' }}>Chưa thuê</TableCell>}

                                            {/* {item.status === 'HIRING' ? <TableCell sx={{ textAlign: 'center' }}> {JSON.parse(item.user).firstName + ' ' + JSON.parse(item.user).lastName}</TableCell> : <TableCell sx={{ textAlign: 'center' }}>''</TableCell>} */}
                                            <TableCell sx={{ textAlign: 'center', height: '65px' }}> {item.address.fullAddress}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Moment format="MMMM Do YYYY">
                                                    {item.startDate}
                                                </Moment>
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Moment format="MMMM Do YYYY">
                                                    {item.expiredDate}
                                                </Moment>
                                            </TableCell>

                                            {/* <TableCell sx={{ textAlign: 'right' }}><Button variant="contained" color='success' >Accept</Button></TableCell> */}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[6, 10, 25, 100]}
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
