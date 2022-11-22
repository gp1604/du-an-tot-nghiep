
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
function Expired({ columns3, dataOrderDetailExpired }) {
    return (
        <React.Fragment>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 467 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns3.map((column) => (
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
                            {dataOrderDetailExpired.map((item, index) => {
                                return (
                                    <TableRow key={index} >
                                        <TableCell align="center">{item.product.name} </TableCell>
                                        <TableCell align="center">{item.product.price} </TableCell>
                                        <TableCell align="center">{item.product.address.fullAddress} </TableCell>
                                        <TableCell align="center">{item.product.category.name} </TableCell>
                                        <TableCell align="center">{item.month} tháng </TableCell>
                                        <TableCell align="center"> <Moment format="DD/MM/YYYY">{item.startDate}</Moment></TableCell>
                                        <TableCell align="center">
                                            <Moment style={{ marginRight: '5px' }} format="DD/MM/YYYY">{item.expiredDate}</Moment>
                                            (<Moment style={{ color: 'red', fontWeight: '600' }} fromNow>{item.expiredDate}</Moment>)
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </React.Fragment>
    )
}

export default Expired