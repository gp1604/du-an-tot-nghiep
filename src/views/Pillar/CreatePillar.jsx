import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './CreatePillar.css'
import axios from "axios";
import {
    API_GET_ADDRESS_DETAIL_USER,
    API_GET_ADDRESS_POINT_BY_ID
} from "../../utils/const";
import Map from "./MapPillar";

export default function CreatePillar({ onSubmit, open, setOpen, dataAddress, dataCategory, added, isLoading }) {
    const [addressPoint, setAddressPoint] = useState([])

    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [productData, setProductData] = useState([]
    )
    const [addressId, setAddressId] = useState(0)
    const [selected, setSelected] = useState({
        num1: 0,
        num2: 0,
        selected: false
    })
    const [data, setData] = useState({
        addressId: 0,
        categoryId: 0,
        description: "",
        status: "AVAILABLE",
        multipartFile: '',
        name: "",
        price: 0,
        lat: 0,
        lng: 0,
        num1: 0,
        num2: 0,
    })

    const [valueStateAddress, setValueStateAddress] = useState(0);
    const [valueStateCategory, setValueStateCategory] = useState(0);
    const handleClose = () => {
        setOpen(false);
        setData({
            addressId: 0,
            categoryId: 0,
            description: "",
            status: "AVAILABLE",
            multipartFile: '',
            name: "",
            price: 0,
            lat: 0,
            lng: 0,
            num1: 0,
            num2: 0,
        })
        setValueStateAddress(0)
        setValueStateCategory(0)
    }


    const onChangeText = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onClickAdd = (e) => {
        e.preventDefault()
        onSubmit(data, setData)
    }

    const fetchData = async (id) => {
        const response = await axios.get(API_GET_ADDRESS_POINT_BY_ID + id)
        if (response) {
            setAddressPoint(response.data)
            setSelected({ num1: response.data[0].number, num2: response.data[1].number, selected: true })
            setData({ ...data, num1: response.data[0].number, num2: response.data[1].number })
        }
    };


    useEffect(() => {
        setValueStateAddress(0)
        setValueStateCategory(0)
        setAddressPoint([])

    }, [added])

    const fetchAddressData = async () => {
        const response = await axios.get(API_GET_ADDRESS_DETAIL_USER + valueStateAddress)
        if (response.status === 200) {
            setProductData(response.data.product)
        }
    }
    const handleChangeAddress = (event) => {
        setAddressId(event.target.value)
        const value = event.target.value;
        setValueStateAddress(event.target.value);
        setData({ ...data, addressId: (value) });
    };

    const handleChangeCategory = (event) => {
        const value = event.target.value;
        setValueStateCategory(event.target.value);
        setData({ ...data, categoryId: (value) });
    };

    useEffect(() => {
        if (valueStateAddress !== 0) {
            fetchAddressData()
            fetchData(valueStateAddress)
        }
    }, [valueStateAddress])

    useEffect(() => {
        setData({ ...data, lat: lat, lng: lng })
    }, [lat, lng])

    useEffect(() => {
        setData({ ...data, num1: selected.num1, num2: selected.num2 })
    }, [selected])


    //scroll select
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    return (
        <Modal
            open={open}
            onClose={setOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='form-add-product'
                sx={{
                    width: '100%',
                    position: 'relative',
                    transform: "translate(-50%, -50%)",
                    backgroundColor: 'white',
                    padding: '10px',
                    top: "50%",
                    left: "50%",
                    height: "96% !important"
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Thêm trụ</h2>
                <div className='modal-contents'>
                    <div style={{
                        display: 'flex', flexDirection: "column", margin: '5px 0px', overflowY: "auto",
                        overflowX: "hidden",
                    }} className="form-flex content-1">
                        <TextField style={{ margin: '5px 0px' }} accept="image/*" name='multipartFile' onChange={(e) => setData({ ...data, multipartFile: e.target.files[0] })} multiple type="file" />
                        <TextField onChange={onChangeText} defaultValue='' name="name" style={{ margin: '5px 0px' }} fullWidth label='Tên' />
                        <TextField type="number" onChange={onChangeText} defaultValue='' name="price" style={{ margin: '5px 0px' }} fullWidth label='Giá' />
                        <TextField onChange={onChangeText} defaultValue='' name="description" style={{ margin: '5px 0px' }} fullWidth label='Chú thích' />
                        <TextField defaultValue='' value={lat} name="lat" style={{ margin: '5px 0px' }} fullWidth />
                        <TextField defaultValue='' value={lng} name="lng" style={{ margin: '5px 0px' }} fullWidth />

                        <FormControl fullWidth sx={{ margin: '5px 0px' }}>
                            <InputLabel id="demo-simple-select-label">Loại trụ</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={valueStateCategory}
                                label="Mã địa chỉ"
                                MenuProps={MenuProps}
                                onChange={handleChangeCategory}
                            >
                                {dataCategory.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ margin: '5px 0px' }}>
                            <InputLabel id="demo-simple-select-label">Địa chỉ</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={valueStateAddress}
                                MenuProps={MenuProps}
                                label="Mã địa chỉ"
                                onChange={handleChangeAddress}
                            >
                                {dataAddress.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.city} {item.street}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {addressPoint.map?.((item, index) => (
                            <div key={index} style={{ display: 'flex', flexDirection: "column", margin: "10px" }} className="form-flex">
                                <div>
                                    {addressPoint.length - 1 > index ?
                                        <div
                                            onClick={() =>
                                                setSelected({ num1: item.number, num2: addressPoint[index + 1].number, selected: true })}
                                            className={selected.num1 === item.number ? "point selected" : "point"}
                                        >
                                            {item.name + ' '} -
                                            {' ' + addressPoint[index + 1].name}
                                        </div> : null
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="content-2">
                        <Map
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: `90%` }} />}
                            containerElement={<div style={{ height: `96%`, margin: `auto`, border: '2px solid black' }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            setLatMap={setLat}
                            setLngMap={setLng}
                            data={addressPoint}
                            productData={productData}
                            selected={selected}
                        />

                    </div>
                </div>
                <div style={{
                    display: "flex", position: "absolute",
                    left: "inherit",
                    bottom: "30px"
                }}>
                    <Button sx={{ marginRight: "5px" }} onClick={handleClose} variant="contained" color="success">
                        Đóng
                    </Button>
                    <Button disabled={isLoading} onClick={onClickAdd} type='submit' variant="contained" color="success">
                        {isLoading ? "Xin chờ..." : "Thêm"}
                    </Button>
                </div>

            </Box>
        </Modal>
    )
}
