import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function CreateCategory({ open, setOpen, onSubmitAdd }) {
    const [data, setData] = useState({
        name: "",
        description: ""
    })

    const onChangeText = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onClickAdd = () => {
        onSubmitAdd(data, setData)
    }

    const handleClose = () => setOpen(false)
    return (
        <div>
            <Modal
                open={open}
                onClose={setOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='form-add-address'
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
                    <h2 style={{ textAlign: 'center' }}>Thêm danh mục</h2>
                    <div style={{ display: 'flex', flexDirection: "column", margin: "10px" }} className="form-flex">
                        <TextField onChange={onChangeText} defaultValue='' name="name" style={{ margin: '5px' }} fullWidth label='Tên danh mục' />
                        <TextField onChange={onChangeText} defaultValue='' name="description" style={{ margin: '5px' }} fullWidth label='Chú thích' />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={e => {
                            handleClose()
                            setData({
                                name: "",
                                description: ""
                            })
                        }} sx={{ marginRight: "5px" }} variant="contained" color="success">
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
