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
import { NavLink, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import styled from "styled-components";
import './forgotPassword.css'
import { API_RESET_PASSWORD } from "utils/const";
export default function ChangePasswordForgot() {
    const history = useHistory();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const token = params.get('token');
    const [data, setData] = useState({
        newPassword: "",
    });

    const [isLoading, setIsLoading] = useState(false)

    const [showMessage, setShowMessage] = useState(false)
    console.log('data ,', data);
    const onForgetPassword = async (e) => {
        e.preventDefault();
        if (data.newPassword === '') {
            toast.error('Mật khẩu không được để trống', {
                autoClose: 2000
            })
        }
        else if (data.newPassword.length < 8) {
            toast.error('Mật khẩu phải lớn hơn 8 kí tự', {
                autoClose: 2000
            })
        }
        else {
            setIsLoading(true)
            try {
                const response = await axios.put(API_RESET_PASSWORD + "?newPassword=" + data.newPassword + "&token=" + token)
                if (response.status === 200) {
                    toast.success('Đổi mật khẩu thành công', {
                        autoClose: 2000
                    })
                    history.push('/auth/login')
                }
            } catch (error) {
                setIsLoading(false)
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
    }
    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                        <div style={{ textAlign: "center", fontSize: "33px", color: "#172B4D" }}>
                            <small style={{ fontWeight: "500" }}>Đổi mật khẩu</small>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Vui lòng nhập mật khẩu mới.</small>
                        </div>
                        {/* {showMessage && (
                            <div style={{ backgroundColor: "#F0F9EB", borderRadius: "5px", padding: "7px" }} className="text-center text-muted mb-4">
                                <small style={{ color: "#67c23a" }}>
                                    Chúng tôi đã gửi <div style={{ fontWeight: "600", display: "inline-block" }}>một email</div>
                                    có liên kết để đặt lại mật khẩu của bạn.
                                    Có thể mất từ 1 đến 2 phút để hoàn thành. Hãy kiểm tra hộp thư đến của bạn
                                    <div style={{ fontWeight: "600", display: "inline-block" }}>{data.email}</div></small>
                            </div>
                        )} */}
                        <Form role="form" >
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        onChange={(e) => setData({ ...data, newPassword: e.target.value })}
                                        placeholder="Nhập mật khẩu mới"
                                        type="password"
                                        autoComplete="new-password"
                                        require
                                    />
                                </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                                <Button style={{ width: "100%", margin: "0" }} disabled={isLoading} color="primary" type="submit" onClick={(e) => onForgetPassword(e)}>
                                    {/* {isLoading ? "Vui lòng chờ..." : "Gửi email cho tôi"} */}
                                    Đổi mật khẩu
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Row className="mt-3">
                    <Col xs="6">
                        <div
                            to={'/auth/login'}
                            className="text-light"
                        >
                            <small>Đã có tài khoản?
                                <NavLink to={'/auth/login'}>Đăng nhập</NavLink>
                            </small>
                        </div>
                    </Col>
                    <Col className="text-right" xs="6">
                        <NavLink
                            className="text-light"
                            to={'/auth/register'}
                        >
                            <small>Đăng ký tài khoản</small>
                        </NavLink>
                    </Col>
                </Row>
            </Col>
        </>
    )
}
