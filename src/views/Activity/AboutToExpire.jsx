
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
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
import Moment from 'react-moment';
import { Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
function AboutToExpire({ columns4, dataOrderDetailExpired, setListIds, showExtend, showCheckbox, onchangeMonth, setShowCheckbox, setShowExtend, handleClickOpen, handleChangeCheckbox, month }) {
    var today = new Date();
    return (
        <React.Fragment>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 467 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns4.map((column) => (
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
                            {dataOrderDetailExpired.filter((data) => Math.round((new Date(data.product.expiredDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) < 3).length > 0 ?
                                dataOrderDetailExpired.filter((data) => Math.round((new Date(data.product.expiredDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) < 3)
                                    .map((item, index) => {
                                        return (
                                            <TableRow key={index} >
                                                {showCheckbox ? <TableCell sx={{ width: '9%' }} align="center"> <input style={{ float: 'left', marginTop: '5px' }} type="checkbox" onChange={e => handleChangeCheckbox(e, item.product.id, month)} />
                                                    <input onChange={e => onchangeMonth(e, item.product.id)} defaultValue={'1'} style={{ float: 'left', width: '70%', marginLeft: '6%' }} type="number" min={'1'} max={'100'} />
                                                </TableCell> : <TableCell align="center"> </TableCell>}
                                                <TableCell align="center">{item.product.name} </TableCell>
                                                <TableCell align="center">{item.product.price} </TableCell>
                                                <TableCell align="center">{item.product.address.fullAddress} </TableCell>
                                                <TableCell align="center">{item.product.category.name} </TableCell>
                                                <TableCell align="center">{item.product.month} tháng </TableCell>
                                                <TableCell align="center"> <Moment format="DD/MM/YYYY">{item.product.startDate}</Moment></TableCell>
                                                <TableCell align="center">
                                                    <Moment style={{ marginRight: '5px' }} format="DD/MM/YYYY">{item.product.expiredDate}</Moment>
                                                    (<Moment style={{ color: 'red', fontWeight: '600' }} fromNow>{item.product.expiredDate}</Moment>)
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                :
                                <TableRow >
                                    <TableCell align="center">Bạn chưa có đơn hàng nào sắp hết hạn.</TableCell>
                                </TableRow>}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            {dataOrderDetailExpired.filter((data) => Math.round((new Date(data.product.expiredDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) < 3).length > 0 ?
                showExtend == true ? <Grid sx={{ mt: 1 }} container justifyContent="flex-end">
                    {dataOrderDetailExpired.length > 0 ?
                        < Button onClick={e => {
                            setShowCheckbox(true)
                            setShowExtend(false)
                            setListIds([]);
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
                        }} variant="contained" color="error">
                            Đóng
                        </Button>
                    </Grid> : null}
        </React.Fragment>
    )
}

export default AboutToExpire