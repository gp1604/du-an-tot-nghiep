import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  NavItem,
  NavLink,
  Container,
  DropdownItem,

  Row,
  Col
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";

// core components
import UserHeader from "components/Headers/UserHeader.js";
import jwt_decode from "jwt-decode";
import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_PROFILE_GET_USER } from "utils/const";
import { toast } from "react-toastify";
import { API_UPDATE_USER } from "utils/const";

const Profile = () => {
  const user = localStorage.getItem("user");
  console.log(decoded);
  let token = localStorage.getItem("token");
  let decoded
  if (token !== null) {
    decoded = jwt_decode(token);
  }
  console.log(token);
  console.log(decoded);
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useState([])

  useEffect(() => {
    getUserProfile()
    setEditUser({
      email: data.email || "",
      firstName: data.firstName || "",
      lastName: data.lastName || "",
    })
  }, [data])

  const getUserProfile = async () => {
    const response = await axios.get(API_PROFILE_GET_USER, {
      headers: {
        'authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 200) {
      setData(response.data)
    }
  }

  const [editUser, setEditUser] = useState({
    email: data.email || "",
    firstName: data.firstName || "",
    lastName: data.lastName || "",
  })

  console.log(editUser.lastName);

  const onUpdate = async (data) => {
    const response = await axios.put(API_UPDATE_USER, data, {
      headers: {
        'authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 200) {
      toast.success("Sửa thành công", { autoClose: 1500 })
      getUserProfile()
    }
  }

  const onChangeText = (event) => {
    setEditUser({ ...editUser, [event.target.name]: event.target.value })
  }

  const handleUpdate = () => {
    onUpdate({ ...editUser })
    setOpen(false)
  }
  console.log(editUser);

  // console.log(data);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='form-add-product'
          sx={{
            width: '40%',
            position: 'relative',
            transform: "translate(-50%, -50%)",
            backgroundColor: 'white',
            padding: '10px',
            top: "50%",
            left: "50%",
            // borderRadius: "10px"
          }}
        >
          <div style={{ borderBottom: "1px solid #ddd", margin: "0px 10px", color: "#333" }}>Lưu ý</div>
          <h2 style={{ textAlign: 'center', margin: "60px", }}>Xác nhận thay đổi ?</h2>

          <div style={{ borderBottom: "1px solid #ddd", margin: "0px 10px" }} />

          <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
            <button onClick={handleClose} style={{ width: "110px" }} type="button" class="btn btn-primary">Huỷ</button>
            <button onClick={handleUpdate} style={{ width: "110px" }} type="button" class="btn btn-primary">Xác nhận</button>
          </div>

        </Box>

      </Modal>
      {/* <div style={{ width: "100%" }}>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "400px",
            backgroundImage:
              "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            borderRadius: "9px"
          }}
        >
          <span style={{ borderRadius: '10px' }} className="mask bg-gradient-default opacity-8" />
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col style={{ maxWidth: "100%" }} lg="7" md="10">
                <h1 className="display-2 text-white">Xin chào {data.firstName} {data.lastName}</h1>
                <p className="text-white mt-0 mb-5">
                  Đây là trang cá nhân của bạn. Bạn có thể chỉnh sửa thông tin cá nhân của mình tại đây.
                </p>

              </Col>
            </Row>
          </Container>
        </div>
      </div> */}
      {/* Page content */}
      <Container className="mt-7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={data.avatar}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  {/* <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button> */}
                </div>
              </CardHeader>
              <CardBody style={{ height: 404 }} className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {data.firstName} {data.lastName}
                  </h3>
                  <div>
                    <Button color="info">
                      <NavLink className="nav-link-icon" to="/auth/changePassword" tag={Link}>
                        <span style={{ color: "#ffffff" }} className="">Đổi mật khẩu</span>
                      </NavLink>
                    </Button>
                  </div>
                  {/* <hr className="my-4" />
                  <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p> */}
                  {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Tài khoản của tôi</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    {/* <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button> */}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin tài khoản
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Số điện thoại
                          </label>
                          <Input
                            readOnly={true}
                            className="form-control-alternative"
                            defaultValue={data.phoneNumber}
                            id="input-username"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Địa chỉ email
                          </label>
                          <Input
                            name="email"
                            onChange={onChangeText}
                            className="form-control-alternative"
                            id="input-email"
                            defaultValue={editUser.email}
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Họ
                          </label>
                          <Input
                            name="firstName"
                            onChange={onChangeText}
                            className="form-control-alternative"
                            defaultValue={editUser.firstName}
                            id="input-first-name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Tên
                          </label>
                          <Input
                            name="lastName"
                            onChange={onChangeText}
                            className="form-control-alternative"
                            defaultValue={editUser.lastName}
                            id="input-last-name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button
                      color="info"
                      onClick={handleOpen}
                    >
                      Sửa thông tin
                    </Button>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  {/* <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            id="input-address"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="New York"
                            id="input-city"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="United States"
                            id="input-country"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div> */}
                  {/* <hr className="my-4" /> */}
                  {/* Description */}
                  {/* <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                        Open Source."
                        type="textarea"
                      />
                    </FormGroup>
                  </div> */}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
