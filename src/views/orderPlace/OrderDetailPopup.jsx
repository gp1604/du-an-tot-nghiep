import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const columnsDetail = [
    { id: 'id', label: 'Id', minWidth: 70 },
    {
        id: 'month',
        label: 'Số tháng thuê',
        minWidth: 150,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    }, {
        id: 'name',
        label: 'Tên trụ',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    }, {
        id: 'price',
        label: 'Giá tiền',
        minWidth: 150,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    }, {
        id: 'description',
        label: 'Mô tả',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    }, {
        id: 'address',
        label: 'Địa chỉ',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
];
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 1000,
    width: "95%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function OrderDetailPopup({ dataDetail, openDetail, handleCloseDetailOrder }) {
    return (
        <React.Fragment>
            <Modal
                open={openDetail}
                onClose={handleCloseDetailOrder}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>
                        <TableContainer sx={{ height: '350px' }}>
                            <Table aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columnsDetail.map((column) => (
                                            <TableCell
                                                sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }}
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataDetail
                                        .map((item, index) => (
                                            <TableRow key={index} hover role="checkbox" >
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>{item.month} tháng</TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>{item.product.name}</TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>{item.product.price}</TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>{item.product.description}</TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>{item.product.address.fullAddress}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </Modal>

        </React.Fragment >
    )
}

export default OrderDetailPopup