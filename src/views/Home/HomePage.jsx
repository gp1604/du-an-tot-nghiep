import { IconButton, InputBase, ToggleButton } from '@mui/material';
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
import NorthIcon from '@mui/icons-material/North';
import ToggleButtonMui from '@mui/material/ToggleButton';
import { useEffect } from 'react';

function HomePage() {
    useEffect(() => {
        document.title = 'ACN | Trang chủ';
        let mybutton = document.getElementById("btn-to-top");

        // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = function () { scrollFunction() };

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        }
        var rootElement = document.documentElement;

        // When the user clicks on the button, scroll to the top of the document

    }, [])
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    return (
        <div  >
            <div id="toHome">
                <BannerSlide />
            </div>

            <div style={{ maxWidth: "1200px", margin: "auto" }}>
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
                        <span className="text-hotline">0905.184.871</span>
                    </a>
                </div>
            </div>
            <div className="social-button">
                <div className="social-button-content">
                    <a href="https://www.facebook.com/acn.digitalmarketing" target="_blank" className="mes">
                        <img src="https://nocodebuilding.com/wp-content/uploads/2020/07/fb.png" alt="Chat Messenger" />
                    </a>
                    <a href="http://zalo.me/0869773152" target="_blank" className="zalo">
                        <img src="https://nocodebuilding.com/wp-content/uploads/2020/07/zl.png" alt="Chat Zalo" />
                    </a>
                </div>
            </div>
            <div className="social-button2" style={{ height: '10%' }}>
                <NavLink to={'#toHome'}>
                    <ToggleButton onClick={topFunction} id="btn-to-top" sx={{
                        display: "none",
                        bottom: "20px",
                        right: "80px",
                        position: "fixed",
                        behavior: "smooth",

                        backgroundColor: 'white', borderRadius: '10px',
                        '&:hover': {
                            color: 'grey',
                            backgroundColor: 'white',
                        },
                    }} value="check">
                        <NorthIcon />
                    </ToggleButton>
                </NavLink>
            </div>

            {/* <TableProduct /> */}

        </div >



    )
}

export default HomePage