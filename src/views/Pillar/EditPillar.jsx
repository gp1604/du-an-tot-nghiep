import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Map from "./MapPillar";
import axios from "axios";
import {
    API_GET_ADDRESS_DETAIL_USER,
    API_GET_ADDRESS_POINT_BY_ID
} from "../../utils/const";

export default function EditPillar({ isLoading, item, dataAddress, openEdit, setOpenEdit, onSubmitEdit, dataCategory, updated, setClickedProduct }) {
    const [selected, setSelected] = useState({
        num1: 0,
        num2: 0,
        selected: false
    })
    const [dataEdit, setDataEdit] = useState({
        addressId: item.address.id || 0,
        categoryId: item.category.id || 0,
        description: item.description || "",
        status: item.status || "",
        name: item.name || "",
        price: item.price || 0,
        lat: item.lat || 0,
        lng: item.lng || 0,
        num1: selected.num1 || 0,
        num2: selected.num2 || 0,
        multipartFile: item.image || ''
    })

    const { addressId, description, status, name, price, multipartFile, image } = item;
    const [selectedImage, setSelectedImage] = useState(null);

    const [addressPoint, setAddressPoint] = useState([])
    const [productData, setProductData] = useState([])
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [valueStateAddress, setValueStateAddress] = useState(item.address.id);
    const [valueStateCategory, setValueStateCategory] = useState(0);
    const [valueStatus, setValueStatus] = useState('')

    // {num1: Math.floor(item.number), num2: Math.ceil(item.number)
    useEffect(() => {
        setDataEdit({
            addressId: item.address.id || 0,
            categoryId: item.category.id || 0,
            description: item.description || "",
            status: item.status || "",
            name: item.name || "",
            price: item.price || 0,
            lat: item.lat ? item.lat : 0,
            lng: item.lng ? item.lng : 0,
            num1: Math.floor(item.number) || 0,
            num2: Math.ceil(item.number) || 0,
            multipartFile: item.image || ''
        })
        console.log("dataEdit, ", item.lat)
    }, [item])

    useEffect(() => {
        setDataEdit({
            ...dataEdit,
            lat: lat,
            lng: lng
        })
        console.log("dataEdit effect", dataEdit.lat)
    }, [lat, lng])


    console.log("dataEdit2", dataEdit)

    const statusO = [
        {
            value: "HIRING",
            name: "Đã cho thuê"
        },
        {
            value: "AVAILABLE",
            name: "Có sẵn"
        },
        {
            value: "DISABLED",
            name: "Dừng hoạt động"
        },
    ]


    const handleClose = () => setOpenEdit(false);

    const onChangeText = (e) => {
        setDataEdit({ ...dataEdit, [e.target.name]: e.target.value })
        console.log("onchange:", e.target.value);
    }

    const onChangeImage = (event) => {
        const value = event.target.files[0]
        console.log(value);
        setSelectedImage(event.target.files[0])
        setDataEdit({ ...dataEdit, multipartFile: (value) })
    }

    const onClickEdit = (e) => {
        onSubmitEdit({ ...item, ...dataEdit, id: item.id })
    }

    const fetchAddressPointData = async () => {
        const response = await axios.get(API_GET_ADDRESS_POINT_BY_ID + valueStateAddress)
        if (response) {
            setAddressPoint(response.data)
            setSelected({ num1: Math.floor(item.number), num2: Math.ceil(item.number), selected: true })
        }
    }
    const fetchAddressData = async () => {
        const response = await axios.get(API_GET_ADDRESS_DETAIL_USER + valueStateAddress)
        if (response.status === 200) {
            setProductData(response.data.product)
        }
    }


    const handleChangeAddress = (event) => {
        const value = event.target.value;
        setValueStateAddress(event.target.value);
        setDataEdit({ ...dataEdit, addressId: (value) });
        console.log("value address", value);
    };

    const handleChangeCategory = (event) => {
        console.log(event.target.value);
        const value = event.target.value;
        setValueStateCategory(event.target.value);
        setDataEdit({ ...dataEdit, categoryId: value });
    };

    const handlChangeStatus = (e) => {
        const valueSta = e.target.value
        setValueStatus(e.target.value);
        setDataEdit({ ...dataEdit, status: (valueSta) });
    }
    useEffect(() => {
        setValueStateAddress(item.address.id)
    }, [item.address.id, item.address])

    useEffect(() => {
        fetchAddressData()
        fetchAddressPointData()
        setValueStatus(dataEdit.status)
        setValueStateCategory(dataEdit.categoryId)
        setValueStateAddress(dataEdit.addressId)
    }, [valueStateAddress, updated, dataEdit.status, dataEdit.addressId, dataEdit.addressId, dataAddress, dataCategory])

    function onClickSelected(number1, number2) {
        setSelected({ num1: number1, num2: number2, selected: true })

    }

    useEffect(() => {
        setDataEdit({ ...dataEdit, num1: selected.num1, num2: selected.num2 })
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
            open={openEdit}
            onClose={setOpenEdit}
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
                    height: "89% !important"
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Sửa thông tin trụ</h2>
                <div className='modal-contents'>
                    <div style={{
                        display: 'flex', flexDirection: "column", maxHeight: "100%",
                        overflowY: "scroll",
                        overflowX: "hidden",

                    }} className="form-flex content-1">
                        <TextField
                            onChange={onChangeImage} style={{ margin: '5px 0px' }} name="multipartFile" type="file" multiple accept="image*/*" />
                        <TextField
                            value={dataEdit.name} onChange={onChangeText} name="name" style={{ margin: '5px 0px' }} fullWidth label='Tên' />
                        {/* <img style={{ width: "20px" }} src={dataEdit.multipartFile} alt="" /> */}
                        <TextField
                            value={dataEdit.price} type="number" onChange={onChangeText} name="price" style={{ margin: '5px 0px' }} fullWidth label='Giá' />
                        <TextField value={dataEdit.description} onChange={onChangeText} name="description" style={{ margin: '5px 0px' }} fullWidth label='Chú thích' />
                        <FormControl fullWidth sx={{ margin: '5px 0px' }}>
                            <InputLabel id="demo-simple-select-label">Loại trụ</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={dataEdit.categoryId}
                                label="Mã địa chỉ"
                                onChange={handleChangeCategory}
                            >
                                {dataCategory.map((item, index) => (
                                    <MenuItem
                                        key={index} value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ margin: '5px 0px' }}>
                            <InputLabel id="demo-simple-select-label">Mã trạng thái</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                MenuProps={MenuProps}
                                value={dataEdit.status}
                                label="Mã địa chỉ"
                                onChange={handlChangeStatus}
                            >
                                {statusO.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                        <TextField inputProps={{
                            style: {
                                padding: 7
                            }
                        }} defaultValue='' value={dataEdit.lng} name="lng" style={{ padding: "5px 0px", margin: '5px 0px' }} fullWidth />
                        <TextField inputProps={{
                            style: {
                                padding: 7
                            }
                        }} defaultValue='' value={dataEdit.lat} name="lat" style={{ margin: '5px 0px' }} fullWidth />
                        <FormControl fullWidth sx={{ margin: '5px 0px' }}>
                            <InputLabel id="demo-simple-select-label">Mã địa chỉ</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={dataEdit.addressId}
                                defaultValue={addressId}
                                label="Mã địa chỉ"
                                MenuProps={MenuProps}
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
                                            onClick={() => {
                                                onClickSelected(item.number, addressPoint[index + 1].number)
                                            }
                                            }
                                            className={dataEdit.num1 === item.number ? "point selected" : "point"}
                                        >
                                            {item.name ? item.name + " " : ""} -
                                            {addressPoint[index + 1].name ? " " + addressPoint[index + 1].name : ""}
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
                            containerElement={<div style={{ height: `100%`, margin: `auto`, border: '2px solid black' }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            setLatMap={setLat}
                            setLngMap={setLng}
                            data={addressPoint}
                            productData={productData}
                            updatingProduct={item}
                            updatingZoom={12}
                            selected={selected}
                            setProduct={setClickedProduct}
                        />
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button sx={{ marginRight: "5px" }} onClick={handleClose} variant="contained" color="success">
                        Đóng
                    </Button>
                    <Button disabled={isLoading} onClick={onClickEdit} variant="contained" color="success">
                        {isLoading ? "Xin chờ..." : "Sửa"}
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}
