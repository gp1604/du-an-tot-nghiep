import { Link, useHistory } from "react-router-dom";
import '../Navbars/style.css'
import Badge from '@mui/material/Badge';
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  DropdownItem,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useEffect, useState } from 'react';
import Notification from './NotificationUser';
import { BsSuitHeartFill } from "react-icons/bs";
import axios from "axios";
import { API, API_GET_CART } from "../../utils/const";

const AdminNavbar = () => {

  let decoded;
  const history = useHistory();
  let token = localStorage.getItem("token");
  if (token !== null) {
    decoded = jwt_decode(token);
  }
  const logout = () => {
    // alert("ok")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("IdOrder")
    localStorage.removeItem("cartADD")
    localStorage.removeItem("cartTemp")
    localStorage.removeItem("countCart")
    localStorage.removeItem("count")
    localStorage.removeItem("locations")

    window.dispatchEvent(new Event("storage"));
    history.push('/auth/homePage')
    toast.success('Đăng xuất thành công !', { autoClose: 1500 })
  }

  const checkRole = () => {
    if (token && decoded.roles === "[ROLE_ADMIN]") {
      history.push('/admin/index')
    }
  }
  const styleLab = {
    marginRight: "7px",
    fontWeight: "400",
    fontSize: "1rem"
  }

  const styleFont = {
    fontSize: "0.9rem",
    fontWeight: "400"
  }


  if (token !== null) {
    decoded = jwt_decode(token);
  }

  const [local, setLocal] = useState(localStorage.getItem("countCart") || 0);

  useEffect(() => {
    const listenStorageChange = () => {
      if (localStorage.getItem("countCart") === null) {
        setLocal(0);
      } else {
        setLocal(localStorage.getItem("countCart"));
      }
    };
    window.addEventListener("storage", listenStorageChange);
    return () => window.removeEventListener("storage", listenStorageChange);
  }, []);

  const [dataImage, setDataImage] = React.useState([]);
  const getData = async () => {
    const response = await axios.get(API + '/admin/webImage/?category=logo')
    if (response.status === 200) {
      setDataImage(response.data)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <div class="typed-animation">
              <h1 style={{ color: 'white', margin: "0", borderRadius: "15px " }} class="typed-out">
                {
                  dataImage.map((value, index) => (
                    <img className='logo-home'
                      key={index}
                      alt="..."
                      src={value.photosImagePath} />
                  ))
                }
              </h1>
            </div>
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <div class="typed-animation">
                      <h1 style={{ color: 'white', margin: "0", borderRadius: "15px " }} class="typed-out">
                        {
                          dataImage.map((value, index) => (
                            <img className='logo-home'
                              key={index}
                              alt="..."
                              src={value.photosImagePath} />
                          ))
                        }
                      </h1>
                    </div>
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav style={{ marginRight: "40px" }} className="ml-auto" navbar >
              <NavItem>
                <NavLink className="nav-link-icon" to="/" tag={Link}>
                  <i className="ni ni-planet" />
                  <span className="nav-link-inner--text">Trang chủ</span>
                </NavLink>
              </NavItem>

              {
                token && decoded.roles === "[ROLE_ADMIN]"
                  ? ""
                  : <NavItem >
                    <NavLink className="nav-link-icon" to="/auth/cart" tag={Link}>
                      <div style={{ display: "flex", alignItems: "center" }}
                        className="notification">
                        <Badge badgeContent={local} color="error"
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                        >

                          <i className="ni ni-cart" />
                        </Badge >

                        <span className="nav-link-inner--text">Thanh Toán</span>
                      </div>

                    </NavLink>
                  </NavItem>
              }

              {token && decoded ?
                <NavItem >
                  <NavLink style={{ display: "flex" }} className="nav-link-icon" >
                    <Notification />
                  </NavLink>
                </NavItem> : ''}

              {token && decoded ? '' :
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/auth/register"
                    tag={Link}
                  >
                    <i className="ni ni-circle-08" />
                    <span className="nav-link-inner--text">Đăng ký</span>
                  </NavLink>
                </NavItem>}



              {token && decoded ?
                <div className="menu">
                  <ul className="menu-item" >
                    <li className="menu-item-title">
                      <NavLink onClick={checkRole} className="menu-hover nav-link-icon">
                        <i style={{ marginRight: "4px" }} className="ni ni-single-02" />
                        <span className="nav-link-inner--text">{decoded.firstName + " " + decoded.lastName} <ArrowDropDownIcon /></span>
                      </NavLink>
                      <ul className="menu-level-2">
                        {token && decoded.roles === "[ROLE_USER]" ?
                          <li className="item-menu-level-2">
                            <NavLink className="nav-link-icon" to="/auth/activity" tag={Link}>
                              {/* <CgMenuBoxed style={{ fontSize: "18.5px" }} /> */}
                              <i style={styleLab} className="ni ni-calendar-grid-58" />
                              <span style={styleFont} className="nav-link-inner--text">Hoạt động </span>
                            </NavLink>
                            <DropdownItem divider />
                            <NavLink className="nav-link-icon" to="/auth/profile" tag={Link}>
                              {/* <CgMenuBoxed style={{ fontSize: "18.5px" }} /> */}
                              <i style={styleLab} className="ni ni-single-02" />
                              <span style={styleFont} className="nav-link-inner--text">Hồ sơ</span>
                            </NavLink>
                            <DropdownItem divider />

                            <NavLink className="nav-link-icon" to="/auth/wishList" tag={Link}>
                              {/* <CgMenuBoxed style={{ fontSize: "18.5px" }} /> */}
                              <BsSuitHeartFill style={styleLab} className="ni ni-BsSuitHeartFill" />
                              <span style={styleFont} className="nav-link-inner--text">Yêu thích</span>
                            </NavLink>

                            <DropdownItem divider />
                          </li>
                          : ''}
                        {token && decoded.roles === '[ROLE_ADMIN]' ?
                          <React.Fragment>
                            <li className="item-menu-level-2">
                              <NavLink className="nav-link-icon" to="/admin/index" tag={Link}
                              >
                                <AdminPanelSettingsIcon sx={styleLab} />
                                <span style={styleFont} className="nav-link-inner--text">Quản trị</span>
                              </NavLink>
                            </li>
                            <DropdownItem divider />
                          </React.Fragment> : ''}
                        <li className="item-menu-level-2">
                          <NavLink className="nav-link-icon" to="/admin/index" tag={Link} onClick={logout}
                          >
                            <LogoutIcon sx={styleLab} />
                            <span style={styleFont} className="nav-link-inner--text">Đăng xuất</span>
                          </NavLink>
                        </li>


                      </ul>

                    </li>
                  </ul>
                </div>
                :
                <React.Fragment>
                  <NavItem>
                    <NavLink className="nav-link-icon" to="/auth/login" tag={Link}>
                      <i className="ni ni-key-25" />
                      <span className="nav-link-inner--text">Đăng nhập</span>
                    </NavLink>
                  </NavItem>


                </React.Fragment>
              }



            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
