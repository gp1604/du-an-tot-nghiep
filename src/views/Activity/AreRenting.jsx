import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import jwt_decode from "jwt-decode";
import './activity.css'
import axios from 'axios';
import { API_GET_ALL_ORDER } from 'utils/const';
import Moment from 'react-moment';
import { Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { API_GET_EXTEND_ORDER_USER } from 'utils/const';
import { toast } from 'react-toastify';
import { API_EXTEND_ORDER_USER } from 'utils/const';
import { showError } from 'utils/error';
import Expired from './Expired';
import { API_GET_EXPIRED_ORDER_USER } from 'utils/const';
import { showError2 } from 'utils/error';
import { Fragment } from 'react'

function AreRenting({ columns2, dataOrderDetail, showCheckbox, setListIds, onchangeMonth, showExtend, setShowCheckbox, setShowExtend, handleClickOpen, handleChangeCheckbox, month }) {
    return (
        <Fragment>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 467 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns2.map((column) => (
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
                            {dataOrderDetail.length > 0 ? dataOrderDetail.map((item, index) => {
                                return (
                                    <TableRow key={index} >
                                        {/* <TableCell align="left">{item.id}</TableCell> */}
                                        {showCheckbox ? <TableCell sx={{ width: '9%' }} align="center"> <input style={{ float: 'left', marginTop: '5px' }} type="checkbox" onChange={e => handleChangeCheckbox(e, item.product.id, month)} />
                                            <input onChange={e => onchangeMonth(e, item.product.id)} defaultValue={'1'} style={{ float: 'left', width: '70%', marginLeft: '6%' }} type="number" min={'1'} max={'100'} />
                                        </TableCell> : <TableCell align="center"> </TableCell>}
                                        <TableCell align="center">{item.product.name} </TableCell>
                                        <TableCell align="center">{item.product.price} </TableCell>
                                        <TableCell align="center">{item.product.address.fullAddress} </TableCell>
                                        <TableCell align="center">{item.product.category.name} </TableCell>
                                        <TableCell align="center">{item.product.month} tháng </TableCell>
                                        <TableCell align="center"> <Moment format="DD/MM/YYYY">{item.product.startDate}</Moment></TableCell>
                                        <TableCell align="center"> <Moment format="DD/MM/YYYY">{item.product.expiredDate}</Moment></TableCell>
                                    </TableRow>
                                )
                            }) : <TableRow >
                                <TableCell align="center">Bạn chưa thuê trụ nào.</TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            {dataOrderDetail.length > 0 ?
                showExtend == true ? <Grid sx={{ mt: 1 }} container justifyContent="flex-end">
                    {dataOrderDetail.length > 0 ?
                        < Button onClick={e => {
                            setShowCheckbox(true)
                            setShowExtend(false)
                        }} variant="contained" color="success">
                            Gia hạn
                        </Button> :
                        <NavLink to={'/auth/homePage'} className="text-body">
                            <Button variant="contained" color="success" disabled>Mua hàng</Button>
                        </NavLink>
                    }
                </Grid> :
                    <Grid sx={{ mt: 1 }} container justifyContent="flex-end">
                        <Button onClick={handleClickOpen} variant="contained" color="success">
                            Xác nhận
                        </Button>
                        <Button sx={{ ml: 1 }} onClick={e => {
                            setShowExtend(true)
                            setShowCheckbox(false)
                            setListIds([]);
                        }} variant="contained" color="error">
                            Đóng
                        </Button>
                    </Grid> : null}
        </Fragment>
    )
}

export default AreRenting