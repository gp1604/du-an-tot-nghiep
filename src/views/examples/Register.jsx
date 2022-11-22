import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { API_SIGNUP } from "utils/const";
import PhoneBluetoothSpeakerIcon from '@mui/icons-material/PhoneBluetoothSpeaker';
import PhoneInput from 'react-phone-number-input';
import { NavLink, useHistory } from "react-router-dom";
import './register.css'

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: ""
  })

  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log("onchange: ", e.target.value);
  }

  const onSignup = async (e) => {
    e.preventDefault();
    try {
      if (user.phoneNumber.length < 10) {
        toast.warning('Số điện thoại phải có 10 kí tự', {
          autoClose: 3000
        })
      } else {
        const response = await axios.post(API_SIGNUP, user)
        if (response && response.status === 201) {
          toast.success('Đăng ký thành công', {
            autoClose: 3000
          })
          history.push('/auth/login')
        }
      }
    } catch (error) {
      console.log(error.response.data)
      if (error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
          autoClose: 2000
        })
      }
      else if (error.response.data.error) {
        toast.error(`${error.response.data.error}`, {
          autoClose: 2000
        })
      }
      else if (error.response.data.error && error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
          autoClose: 2000
        })
      }
      else {
        toast.error('Error', {
          autoClose: 2000
        })
      }
    }
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div style={{ textAlign: "center", fontSize: "33px", color: "#172B4D", marginBottom: "-20px" }}>
              <small style={{ fontWeight: "500" }}>Đăng ký</small>
            </div>
            {/* <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div> */}
          </CardHeader>
          <CardBody className="px-lg-5 ">
            <div className="text-center text-muted mb-4">
              <small>Vui lòng nhập thông tin của bạn</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input onChange={onchange} placeholder="Nhập tên của bạn" type="text" name="firstName" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input onChange={onchange} placeholder=" Nhập họ của bạn" type="text" name="lastName" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input onChange={onchange}
                    name="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                {/* <InputGroup className="input-group-alternative mb-3"> */}
                {/* <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <PhoneBluetoothSpeakerIcon style={{ fontSize: '1.3em' }}></PhoneBluetoothSpeakerIcon>
                    </InputGroupText>
                  </InputGroupAddon> */}
                <PhoneInput
                  style={{ border: "1px solid #ddd", backgroundColor: 'white', borderRadius: "5px", padding: "0.625rem 0.75rem", width: "100%" }}
                  defaultCountry="VN"
                  placeholder="Nhập số điện thoại"
                  onChange={(value) => {
                    setUser({ ...user, phoneNumber: value })
                  }} />
                {/* </InputGroup> */}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    onChange={onchange}
                    name="password"
                    placeholder="Mật khẩu"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                {/* <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small> */}
              </div>
              <Row className="my-1">
                <Col xs="12">
                  {/* <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div> */}
                </Col>
              </Row>
              <div className="text-center">
                <Button style={{ width: "100%" }} onClick={onSignup} className="" color="primary" type="button">
                  Đăng ký
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <NavLink
              to={'/auth/forgotPassword'}
              className="text-light"
            >
              <small>Quên mật khẩu?</small>
            </NavLink>
          </Col>
          <Col className="text-right" xs="6">
            <div
              className="text-light"
            >
              <small>Đã có tài khoản ?  <NavLink to={'/auth/login'}> Đăng nhập</NavLink></small>
            </div>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Register;
