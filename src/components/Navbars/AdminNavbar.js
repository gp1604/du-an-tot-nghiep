
import { Link, NavLink, useHistory } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
  NavItem,
  Card
} from "reactstrap";
import jwt_decode from "jwt-decode";
import Notification from "./NotificationUser";
import NotificationAdmin from "./NotificationAdmin";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
const AdminNavbar = (props) => {
  const history = useHistory();
  const logout = () => {
    // alert("ok")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("IdOrder")
    localStorage.removeItem("cartADD")
    localStorage.removeItem("cartTemp")
    localStorage.removeItem("countCart")
    localStorage.removeItem("count")
    history.push('/auth/homePage')
    toast.success('Đăng xuất thành công !', { autoClose: 1500 })
    // window.location.reload(false)

  }
  let decoded;
  let token = localStorage.getItem("token");
  if (token !== null) {
    decoded = jwt_decode(token);
  }
  //autocomplete search
  const items = [
    {
      id: 0,
      name: 'Địa chỉ',
      path: '/admin/pillars'
    },
    {
      id: 1,
      name: 'Trụ',
      path: '/admin/product'
    },
    {
      id: 2,
      name: 'Trụ chưa cho thuê',
      path: '/admin/availablePillar'
    },
    {
      id: 3,
      name: 'Trụ đã cho thuê',
      path: '/admin/hiringPillar'
    },
    {
      id: 4,
      name: 'Loại trụ',
      path: '/admin/category'
    },
    {
      id: 5,
      name: 'Khách hàng',
      path: '/admin/customers'
    },
    {
      id: 6,
      name: 'Đơn đặt trụ',
      path: '/admin/orderPlace'
    },
    {
      id: 7,
      name: 'Thông tin ngân hàng',
      path: '/admin/banks'
    },
    {
      id: 8,
      name: 'Ảnh website',
      path: '/admin/pictures'
    },
    {
      id: 9,
      name: 'Cài đặt email',
      path: '/admin/setting'
    },
    {
      id: 10,
      name: 'Bản đồ',
      path: '/admin/maps'
    },
    {
      id: 11,
      name: 'Bảng điều khiển',
      path: '/admin/index'
    },
  ]
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
    history.push(item.path)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left', cursor: 'pointer' }}> {item.name}</span>
      </>
    )
  }
  return (
    <>
      <Navbar style={{marginBottom:'-5rem'}} className="navbar-top navcustom-ss navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <p
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
          >
            {props.brandText}
          </p>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <div style={{ width: 350 }}>
                <ReactSearchAutocomplete
                  items={items}
                  onSearch={handleOnSearch}
                  placeholder='Tìm kiếm danh sách thành phần'
                  onHover={handleOnHover}
                  onSelect={handleOnSelect}
                  onFocus={handleOnFocus}
                  autoFocus
                  formatResult={formatResult}
                />
              </div>
            </FormGroup>
          </Form>
          <div style={{ marginTop: '15px', cursor: 'pointer' }}>
            <NotificationAdmin />
          </div>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt=""
                      src={decoded.avatar}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    {token && decoded ? <span className="mb-0  text-sm font-weight-bold">
                      {decoded.firstName + ' ' + decoded.lastName}
                    </span> : <span className="mb-0  text-sm font-weight-bold">
                      Giang Fam
                    </span>}
                    <i className="ni ni-bold-down ml-1"></i>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu lassName="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem> */}
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem> */}
                <DropdownItem to="/auth/homePage" tag={Link}>
                  {/* <i className="ni ni-calendar-grid-58" /> */}
                  <i className="ni ni-support-16" />
                  <span>Trang chủ</span>
                </DropdownItem>
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={logout}>
                  <i className="ni ni-user-run" />
                  <span  >Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
