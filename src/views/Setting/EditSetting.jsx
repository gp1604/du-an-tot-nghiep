import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { QuizTwoTone } from '@mui/icons-material';
export default function EditSetting({ openEdit, setOpenEdit, item, onSubmitEdit }) {
    const { key, value, category } = item;

    const [data, setData] = useState({
        category: "GENERAL",
        key: item.key || "",
        value: item.value || "",
    })

    const onChangeText = (e) => {
        setData({ ...data, [e.target.name]: e.target.value, key: (item.key) })
    }

    console.log(data);
    const handleClose = () => setOpenEdit(false)
    return (
        <div>
            <Modal
                open={openEdit}
                onClose={setOpenEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='form-add-product'
                    sx={{
                        maxWidth: "450px !important",
                        width: '30%',
                        position: 'relative',
                        transform: "translate(-50%, -50%)",
                        backgroundColor: 'white',
                        padding: '10px',
                        top: "50%",
                        left: "50%"
                    }}
                >
                    <h2 style={{ textAlign: 'center' }}>Sửa: {key}</h2>
                    <div style={{ display: 'flex', flexDirection: "column-reverse", margin: "10px" }} className="form-flex">
                        <TextField onChange={onChangeText} defaultValue={value} name="value" style={{ margin: '5px' }} fullWidth label='Tên danh mục' />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={handleClose} sx={{ marginRight: "5px" }} variant="contained" color="success">
                            Đóng
                        </Button>
                        <Button onClick={() => onSubmitEdit(data)} variant="contained" color="success">
                            Sửa
                        </Button>
                    </div>

                </Box>

            </Modal>
        </div>
    )
}
