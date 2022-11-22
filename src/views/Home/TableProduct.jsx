// import React, { useEffect, useState } from 'react'
// import './css.css'
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import axios from 'axios';
// import { API_GET_PILLAR } from 'utils/const';

// const columns = [
//     {
//         id: 'name',
//         label: 'Tên trụ',
//         minWidth: 170,
//         align: 'left',
//         format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'size',
//         label: 'Ngày hết hạn',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toLocaleString('en-US'),
//     },
// ];

// function createData(name, code, population, size) {
//     const density = population / size;
//     return { name, code, population, size, density };
// }

// const rows = [
//     createData('India', 'IN', 1324171354, 3287263),
//     createData('China', 'CN', 1403500365, 9596961),
//     createData('Italy', 'IT', 60483973, 301340),
//     createData('United States', 'US', 327167434, 9833520),
//     createData('Canada', 'CA', 37602103, 9984670),
//     createData('Australia', 'AU', 25475400, 7692024),
//     createData('Germany', 'DE', 83019200, 357578),
//     createData('Ireland', 'IE', 4857000, 70273),
//     createData('Mexico', 'MX', 126577691, 1972550),
//     createData('Japan', 'JP', 126317000, 377973),
//     createData('France', 'FR', 67022000, 640679),
//     createData('United Kingdom', 'GB', 67545757, 242495),
//     createData('Russia', 'RU', 146793744, 17098246),
//     createData('Nigeria', 'NG', 200962417, 923768),
//     createData('Brazil', 'BR', 210147125, 8515767),
// ];

// function TableProduct() {

//     let path = window.location.pathname;


//     const [dataAddressProduct, setDataAddressProduct] = useState([])

//     useEffect(() => {
//         getAddress()
//     }, [])

//     const getAddress = async (e) => {
//         if ( path.match(/(\d+)/)[0]) {
//             const response = await axios.get(API_GET_PILLAR +  path.match(/(\d+)/)[0])
//             if (response) {
//                 setDataAddressProduct(response.data)
//             }
//         }
//     }

//     console.log("data address detail ", dataAddressProduct);

//     return (
//         <div className='de' >
//             <div className="container mt-5 mb-5">
//                 <div className="row d-flex justify-content-center">
//                     <div className="col-md-10">
//                         <div className="card">
//                             <div className="row">
//                                 <div className="col-md-6">
//                                     <div className="images p-3">
//                                         <div className="text-center p-4">
//                                             {" "}
//                                             <img
//                                                 id="main-image"
//                                                 src="https://i.imgur.com/Dhebu4F.jpg"
//                                                 width={250}
//                                             />{" "}
//                                         </div>
//                                         <div className="thumbnail text-center">
//                                             {" "}
//                                             <img

//                                                 src="https://i.imgur.com/Rx7uKd0.jpg"
//                                                 width={70}
//                                             />{" "}
//                                             <img

//                                                 src="https://i.imgur.com/Dhebu4F.jpg"
//                                                 width={70}
//                                             />{" "}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="product p-4">
//                                         <div className="d-flex justify-content-between align-items-center">
//                                             <div className="d-flex align-items-center">
//                                                 {" "}
//                                                 <i className="fa fa-long-arrow-left" />{" "}
//                                                 <span className="ml-1">Back</span>{" "}
//                                             </div>{" "}
//                                             <i className="fa fa-shopping-cart text-muted" />
//                                         </div>
//                                         <div className="mt-4 mb-3">
//                                             {" "}
//                                             <span className="text-uppercase text-muted brand">Orianz</span>
//                                             <h5 className="text-uppercase">Men's slim fit t-shirt</h5>
//                                             <div className="price d-flex flex-row align-items-center">
//                                                 {" "}
//                                                 <span className="act-price">$20</span>
//                                                 <div className="ml-2">
//                                                     {" "}
//                                                     <small className="dis-price">$59</small>{" "}
//                                                     <span>40% OFF</span>{" "}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <p className="about">
//                                             Shop from a wide range of t-shirt from orianz. Pefect for your
//                                             everyday use, you could pair it with a stylish pair of jeans or
//                                             trousers complete the look.
//                                         </p>
//                                         <div className="sizes mt-5">
//                                             <h6 className="text-uppercase">Size</h6>{" "}
//                                             <label className="radio">
//                                                 {" "}
//                                                 <input
//                                                     type="radio"
//                                                     name="size"
//                                                     defaultValue="S"
//                                                     defaultChecked=""
//                                                 />{" "}
//                                                 <span>S</span>{" "}
//                                             </label>{" "}
//                                             <label className="radio">
//                                                 {" "}
//                                                 <input type="radio" name="size" defaultValue="M" />{" "}
//                                                 <span>M</span>{" "}
//                                             </label>{" "}
//                                             <label className="radio">
//                                                 {" "}
//                                                 <input type="radio" name="size" defaultValue="L" />{" "}
//                                                 <span>L</span>{" "}
//                                             </label>{" "}
//                                             <label className="radio">
//                                                 {" "}
//                                                 <input type="radio" name="size" defaultValue="XL" />{" "}
//                                                 <span>XL</span>{" "}
//                                             </label>{" "}
//                                             <label className="radio">
//                                                 {" "}
//                                                 <input type="radio" name="size" defaultValue="XXL" />{" "}
//                                                 <span>XXL</span>{" "}
//                                             </label>
//                                         </div>
//                                         <div className="cart mt-4 align-items-center">
//                                             {" "}
//                                             <button className="btn btn-danger text-uppercase mr-2 px-4">
//                                                 Add to cart
//                                             </button>{" "}
//                                             <i className="fa fa-heart text-muted" />{" "}
//                                             <i className="fa fa-share-alt text-muted" />{" "}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//                 <TableContainer sx={{ maxHeight: 440 }}>
//                     <Table stickyHeader aria-label="sticky table">
//                         <TableHead>
//                             <TableRow>
//                                 {columns.map((column) => (
//                                     <TableCell
//                                         sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }}
//                                         key={column.id}
//                                         align={column.align}
//                                         style={{ minWidth: column.minWidth }}
//                                     >
//                                         {column.label}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {dataAddressProduct
//                                 .map((item, index) => (
//                                     <TableRow hover role="checkbox" key={index}>
//                                         <TableCell>{item.product.name}</TableCell>
//                                         <TableCell sx={{ textAlign: 'right' }}> {item.product.name}</TableCell>
//                                     </TableRow>
//                                 ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Paper>



//         </div>

//     )
// }

// export default TableProduct