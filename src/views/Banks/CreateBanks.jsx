import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function CreateBanks({ open, setOpen, onSubmitAdd }) {
    const [data, setData] = useState({
        bankAccountName: "",
        bankAccountNumber: "",
        bankCode: "",
        bankName: ""
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
                    <h2 style={{ textAlign: 'center' }}>Thêm thông tin tài khoản ngân hàng</h2>
                    <div style={{ display: 'flex', flexDirection: "column-reverse", margin: "10px" }} className="form-flex">
                        <TextField onChange={onChangeText} name="bankAccountName" style={{ margin: '5px' }} fullWidth label='Tên chủ tài khoản' />
                        <TextField type={'number'} onChange={onChangeText} name="bankAccountNumber" style={{ margin: '5px' }} fullWidth label='Số tài khoản' />
                        <TextField onChange={onChangeText} name="bankCode" style={{ margin: '5px' }} fullWidth label='Mã ngân hàng' />
                        <TextField onChange={onChangeText} name="bankName" style={{ margin: '5px' }} fullWidth label='Tên ngân hàng' />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={e => {
                            handleClose()
                            setData({
                                bankAccountName: "",
                                bankAccountNumber: "",
                                bankCode: "",
                                bankName: ""
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
