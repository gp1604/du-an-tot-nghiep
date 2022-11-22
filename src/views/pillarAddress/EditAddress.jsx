import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function EditPillar({ openEdit, setOpenEdit, item, onSubmitEdit }) {

  // const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [dataAddressEdit, setDataAddressEdit] = useState({
    city: item.city || '',
    street: item.street || '',
    description: item.description || '',
    multipartFile: item.image || ''
  })
  console.log(item.image);
  const { city, street, description, multipartFile, image, photosImagePath } = item

  const onChangeText = (e) => {
    console.log(e.target.value);
    setDataAddressEdit({ ...dataAddressEdit, [e.target.name]: e.target.value })
  }

  const onChangeImage = (event) => {
    const value = event.target.files[0]
    setSelectedImage(event.target.files[0])
    setDataAddressEdit({ ...dataAddressEdit, multipartFile: (value) })
  }

  const onClickEdit = (e) => {
    onSubmitEdit({ ...item, ...dataAddressEdit, id: item.id })
  }

  console.log(dataAddressEdit);

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
          <h2 style={{ textAlign: 'center' }}>Sửa địa chỉ</h2>
          <div>
            {selectedImage && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img alt="not fount" width={"130px"} src={URL.createObjectURL(selectedImage)} />
                {/* <button onClick={() => setSelectedImage(null)}>Remove</button> */}
              </div>
            )}

          </div>
          <div style={{ display: 'flex', flexDirection: "column-reverse", margin: "10px" }} className="form-flex">
            <TextField onChange={onChangeText} defaultValue={description} name="description" style={{ margin: '5px' }} fullWidth label='Chú thích' />
            <TextField onChange={onChangeText} defaultValue={street} name="street" style={{ margin: '5px' }} fullWidth label='Đườmg' />
            <TextField onChange={onChangeText} defaultValue={city} name="city" style={{ margin: '5px' }} fullWidth label='Thành phố' />
            <TextField onChange={onChangeImage} style={{ margin: '5px -5px 5px 5px' }} name="multipartFile" type="file" multiple accept="image/*" />

          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button sx={{ marginRight: "5px" }} onClick={handleCloseEdit} variant="contained" color="success">
              Đóng
            </Button>
            <Button onClick={onClickEdit} variant="contained" color="success">
              Xác nhận
            </Button>
          </div>
        </Box>

      </Modal>

    </div>

  )
}
