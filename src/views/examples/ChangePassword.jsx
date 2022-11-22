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
import { API_CHANGE_PASSWORD } from './../../utils/const';
import { showError } from "utils/error";

import './forgotPassword.css'
export default function ChangePassword() {
    const history = useHistory();
    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
    });
    console.log(data);
    let token = localStorage.getItem("token");

    const [isLoading, setIsLoading] = useState('Đổi mật khẩu')
    const [disabled, setDisabled] = useState(false)

    const ChangePassword = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(API_CHANGE_PASSWORD + "?oldPassword=" + data.oldPassword + "&newPassword=" + data.newPassword, {
                headers: {
                    'authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                toast.success("Đổi mật khẩu thành công", { autoClose: "1500" })
            }
        } catch (error) {
            showError()
        }
    }

    const styledBtn = styled.input`
    border:none;
    `
    return (
        <div>
            <Col style={{ marginTop: "30px" }}>
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                        <div style={{ textAlign: "center", fontSize: "33px", color: "#172B4D" }}>
                            <small style={{ fontWeight: "500" }}>Đổi mật khẩu</small>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Vui lòng nhập mật khẩu cũ và mật khẩu mới để thay đổi.</small>
                        </div>
                        <Form role="form" >
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        onChange={(e) => setData({ ...data, oldPassword: e.target.value })}
                                        placeholder="Nhập mật khẩu cũ"
                                        type="text"
                                        autoComplete="new-email"
                                        require
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
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
                                <Button onClick={(e) => ChangePassword(e)} style={{ width: "100%", margin: "0" }} disabled={disabled} className="" color="primary" type="submit">
                                    {isLoading}
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </div>
    )
}
