import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
export default function EditBanks({ openEdit, setOpenEdit, onHandleEdit, item, isLoading }) {
    const { bankName, bankCode, bankAccountNumber, bankAccountName } = item

    const [data, setData] = useState({
        bankAccountName: item.bankAccountName || "",
        bankAccountNumber: item.bankAccountNumber || "",
        bankCode: item.bankCode || "",
        bankName: item.bankName || "",
    })

    const onChangeText = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onClickUpdate = () => {
        onHandleEdit({ ...data, id: (item.id) })
    }
    useEffect(() => {
        setData({
            bankAccountName: item.bankAccountName || "",
            bankAccountNumber: item.bankAccountNumber || "",
            bankCode: item.bankCode || "",
            bankName: item.bankName || "",
        })
    }, [item])
    const handleClose = () => setOpenEdit(false)
    return (
        <div>
            <Modal
                open={openEdit}
                onClose={setOpenEdit}
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
                    <h2 style={{ textAlign: 'center' }}>Sửa thông tin tài khoản ngân hàng</h2>
                    <div style={{ display: 'flex', flexDirection: "column-reverse", margin: "10px" }} className="form-flex">
                        <TextField onChange={onChangeText} defaultValue={bankAccountName} name="bankAccountName" style={{ margin: '5px' }} fullWidth label='Tên chủ tài khoản' />
                        <TextField type={'number'} onChange={onChangeText} defaultValue={bankAccountNumber} name="bankAccountNumber" style={{ margin: '5px' }} fullWidth label='Số tài khoản' />
                        <TextField onChange={onChangeText} defaultValue={bankCode} name="bankCode" style={{ margin: '5px' }} fullWidth label='Mã ngân hàng' />
                        <TextField onChange={onChangeText} defaultValue={bankName} name="bankName" style={{ margin: '5px' }} fullWidth label='Tên ngân hàng' />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={handleClose} sx={{ marginRight: "5px" }} variant="contained" color="success">
                            Đóng
                        </Button>
                        <Button disabled={isLoading} onClick={onClickUpdate} variant="contained" color="success">
                            {isLoading ? "Xin chờ ..." : "Xác nhận"}
                        </Button>
                    </div>

                </Box>

            </Modal>
        </div>
    )
}
