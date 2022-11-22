import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function AddPictures({ open, setOpen, onSubmitAdd }) {
    const [data, setData] = useState({
        category: "",
        image: "",
    })
    const [selectedImage, setSelectedImage] = useState(null);

    const onChangeText = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onClickAdd = () => {
        onSubmitAdd(data)
    }


    const onChangeImage = (event) => {
        const value = event.target.files[0]
        setSelectedImage(event.target.files[0])
        setData({ ...data, image: event.target.files[0] })
    }

    const handleClose = () => setOpen(false)
    const [valueStateCategory, setValueStateCategory] = useState('');
    const handleChangeCategory = (event) => {
        const value = event.target.value;
        setValueStateCategory(event.target.value);
        setData({ ...data, category: (value) });
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={setOpen}
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
                        left: "50%"
                    }}
                >
                    <h2 style={{ textAlign: 'center' }}>Thêm ảnh</h2>
                    <div style={{ display: 'flex', flexDirection: "column", margin: "10px" }} className="form-flex">
                        <FormControl fullWidth sx={{ margin: "5px" }}>
                            <InputLabel id="demo-simple-select-label">Loại ảnh</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={valueStateCategory}
                                onChange={handleChangeCategory}>
                                <MenuItem value={'banner'}>Ảnh banner</MenuItem>
                                <MenuItem value={'logo'}>Ảnh logo</MenuItem>
                                <MenuItem value={'about'}>Ảnh about us</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField onChange={onChangeImage} style={{ margin: '5px -5px 5px 5px' }}
                            name="image" type="file" multiple accept="image/*" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={handleClose} sx={{ marginRight: "5px" }} variant="contained" color="success">
                            Đóng
                        </Button>
                        <Button onClick={onClickAdd} variant="contained" color="success">
                            Thêm
                        </Button>
                    </div>

                </Box>

            </Modal>
        </div>
    )
}
