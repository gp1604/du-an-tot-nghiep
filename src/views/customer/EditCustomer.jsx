import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function EditCustomer({ item, openEdit, setOpenEdit, handleCloseEdit, onSubmitEdit, isLoading }) {
  const listRoles = [
    {
      value: "[ROLE_USER]",
      name: "User"
    },
    {
      value: "[ROLE_ADMIN]",
      name: "Admin"
    }
  ]
  const { firstName, roles } = item

  console.log(item);
  const [data, setData] = useState({
    roleName: item.roles || '',
  })
  useEffect(() => {
    setData({
      roleName: item.roles || '',
    })
  }, [item])

  console.log(item.roles);

  const [valueState, setValueState] = useState()


  const handleChange = (event) => {
    const value = event.target.value
    setValueState(event.target.value)
    setData({ ...data, roleName: (value) })
    console.log(value);
  }

  const onClickEdit = () => {
    onSubmitEdit({ ...item, ...data, id: item.id });
  }
  // console.log(data);
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
          <h2 style={{ textAlign: 'center' }}>Cập nhập vai trò</h2>
          <div style={{ display: 'flex', flexDirection: "column-reverse", margin: "10px" }} className="form-flex">
            <FormControl fullWidth sx={{ margin: "5px" }}>
              <InputLabel id="demo-simple-select-label">Vai trò</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.roleName}
                label="Vai trò"
                onChange={handleChange}
              >
                {listRoles.map((item, index) => (
                  <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                ))}

              </Select>
            </FormControl>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button sx={{ marginRight: "5px" }} onClick={handleCloseEdit} variant="contained" color="success">
              Đóng
            </Button>
            <Button disabled={isLoading} onClick={onClickEdit} variant="contained" color="success">
              {isLoading ? "Xin chờ ..." : "Xác nhận"}
            </Button>
          </div>
        </Box>

      </Modal>
    </div >
  )
}
