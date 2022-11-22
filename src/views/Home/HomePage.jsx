import { IconButton, InputBase } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Link, NavLink } from 'react-router-dom'
import './css.css'
import TableAddress from './TableAddress';
import TableProduct from './TableProduct';
import BannerSlide from './BannerSlide';
import About from './About';
import Categories from './Categories';

function HomePage() {

    return (
        <div  >
            <BannerSlide />
            <hr />

            <Categories />
            <div>
                <TableAddress />
            </div>
            <div>
                <About />
            </div>
            <hr />
            <div className="hotline-phone-ring-wrap">
                <div className="hotline-phone-ring">
                    <div className="hotline-phone-ring-circle" />
                    <div className="hotline-phone-ring-circle-fill" />
                    <div className="hotline-phone-ring-img-circle">
                        <a href="tel:0987654321" className="pps-btn-img">
                            <img src="https://nguyenhung.net/wp-content/uploads/2019/05/icon-call-nh.png" alt="Gọi điện thoại" width={50} />
                        </a>
                    </div>
                </div>
                <div className="hotline-bar">
                    <a href="tel:0987654321">
                        <span className="text-hotline">0987.654.321</span>
                    </a>
                </div>
            </div>
            <div className="social-button">
                <div className="social-button-content">
                    <a href="https://m.me/gp.1604/" target="_blank" className="mes">
                        <img src="https://nocodebuilding.com/wp-content/uploads/2020/07/fb.png" alt="Chat Messenger" />
                    </a>
                    <a href="http://zalo.me/0869773152" target="_blank" className="zalo">
                        <img src="https://nocodebuilding.com/wp-content/uploads/2020/07/zl.png" alt="Chat Zalo" />
                    </a>
                </div>
            </div>


            {/* <TableProduct /> */}

        </div>



    )
}

export default HomePage