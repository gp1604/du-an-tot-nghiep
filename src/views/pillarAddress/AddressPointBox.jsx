import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import {
  API_ADD_ADDRESS_POINT, API_DELETE_ADDRESS_POINT,
  API_GET_ADDRESS_POINT_BY_ID,
  API_PRODUCT_ADD, API_UPDATE_ADDRESS_POINT
} from "../../utils/const";
import Map from "./MapTest";
import { DirectionsService } from "@react-google-maps/api";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const columns = [
  { id: 'id', label: 'Id', minWidth: 10, maxWidth: 10 },

  {
    id: 'name',
    label: 'Tên',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: '',
    label: 'Lat',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: '',
    label: 'Lng',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: '',
    label: '',
    minWidth: 70,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },

];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  height: 750,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddressPointBox({ openDetail, closeDetail, addressId }) {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingItem, setUpdatingItem] = useState({});
  const [name, setName] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [input, setInput] = useState({
    addressId: addressId,
    lat: 0,
    lng: 0,
    name: ""
  }
  );
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [random, setRandom] = useState(0);
  const [updating, setUpdating] = useState(false);

  const fetchData = async (id) => {
    const response = await axios.get(API_GET_ADDRESS_POINT_BY_ID + id)
    if (response) {
      setData(response.data)
    }
  };

  useEffect(() => {
    if (updatingStatus === false) {
      if (openDetail === true) {
        fetchData(addressId);
        setOpen(true);
      }
    }
  }, [openDetail, random]);

  useEffect(() => {
    if (updatingStatus === false) {
      fetchData(addressId)
    }
  }, [random]);

  useEffect(() => {

    setInput({
      ...input,
      addressId: addressId,
      lat: lat,
      lng: lng
    })


  }, [lat, lng]);


  const addAddressPoint = async (addressId) => {
    try {
      if (name === '') {
        toast.warning("Không được để trống name ", { autoClose: 1500 })
      } else {
        const response = await axios.put(API_ADD_ADDRESS_POINT, JSON.stringify(input), {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        if (response.status === 200) {
          setRandom(Math.random());
          clear();
          toast.success("Thêm thành công", { autoClose: 1500 })
        }

      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
          autoClose: 2000
        })
      }
    }
  }


  const addAddressPointBehind = async (addressId, pointId) => {
    try {
      if (data.name === "") {
        toast.error("Không được để trống địa chỉ", { autoClose: "1500" })
      } else {

        const response = await axios.put(API_ADD_ADDRESS_POINT + '?addressPointId=' + pointId, JSON.stringify(input), {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        if (response.status === 200) {
          setRandom(Math.random());
          clear();
          toast.success("Thêm thành công", { autoClose: 1500 })
        }
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
          autoClose: 2000
        })
      }
    }
  }

  const deletePoint = async (pointId) => {
    try {
      if (data.name === " ") {
        toast.error("Không được để trống địa chỉ", { autoClose: "1500" })
      } else {
        const response = await axios.delete(API_DELETE_ADDRESS_POINT + pointId, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        if (response.status === 200) {
          setRandom(Math.random());
          toast.success("xoá thành công", { autoClose: 1500 })
        }
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
          autoClose: 2000
        })
      }
    }
  }

  function handleChange(e) {
    setName(e.target.value);


  }

  useEffect(() => {
    setInput({
      ...input,
      addressId: addressId,
      lat: lat,
      lng: lng,
      name: name
    })
  }, [name]);
  function updatePoint(data) {
    setUpdating(true);
    setLat(data.lat);
    setLng(data.lng);
    setName(data.name);
    setUpdateId(data.id);
    setInput({
      ...input,
      addressId: addressId,
      lat: lat,
      lng: lng,
      name: name
    })
  }

  const onUpdatePoint = async (updateId, item) => {
    try {
      if (data.name === " ") {
        toast.error("Không được để trống địa chỉ", { autoClose: "1500" })
      } else {
        const response = await axios.put(API_UPDATE_ADDRESS_POINT + updateId, JSON.stringify(item), {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        if (response.status === 200) {
          setRandom(Math.random());
          onCancelUpdate()
          toast.success("Update thành công", { autoClose: 1500 })
        }
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
          autoClose: 2000
        })
      }
    }

  }
  function clear() {
    setName("");
    setLat(0);
    setLng(0);

  }
  function onCancelUpdate() {
    clear();
    setUpdateId(null);
    setUpdating(false);

  }

  useEffect(() => {
    if (updatingStatus === true) {
      console.log("updating")
      onUpdatePoint(updatingItem.id, updatingItem)
      setUpdatingStatus(false)
    }
  }, [updatingStatus, updatingItem]);

  const StyledTableCell = styled(TableCell)({
    padding: '4px 16px',
  })
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={closeDetail}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box sx={{
            width: '95%',
            height: "95%",
            position: 'absolute',
            transform: "translate(-50%, -50%)",
            backgroundColor: 'white',
            padding: '10px',
            top: "50%",
            left: "50%"
          }}>
            <div onClick={() => closeDetail()}
              style={{
                position: 'absolute', color: 'red', cursor: 'pointer'
                , fontWeight: '700', fontSize: '1.2em', top: '0', left: "98.5%"
              }}>X</div>
            {/* sx={{ width: '100%', overflow: 'hidden', height: "100%", }} */}
            <Paper sx={{ width: '100%', overflow: 'hidden', height: "100%", }}>
              <Grid sx={{ display: "flex", flexDirection: "row", margin: "5px 0px", width: "100%" }} container spacing={1}>
                <Grid item xs={3} >
                  <TextField label="name" onChange={handleChange} value={name} type="text" />
                </Grid>
                <Grid item xs={3}>
                  <TextField label='Lat' value={lat} />
                </Grid>
                <Grid item xs={3}>
                  <TextField value={lng} label='Lng' />
                </Grid>

                {updating ? <>
                  <Grid item xs={3}>
                    <Button color='success' onClick={() => { onUpdatePoint(updateId, input) }}>Cập nhập</Button>
                    <Button color='warning' onClick={() => { onCancelUpdate() }}>X</Button>
                  </Grid>
                </>
                  : data.length < 2 ?
                    <>
                      <StyledTableCell />
                      <StyledTableCell> <Button color='success' onClick={() => addAddressPoint(addressId)}>Thêm</Button></StyledTableCell>
                    </>
                    : null}
              </Grid>
              <TableContainer sx={{ height: '95vh' }}>
                <StyledTableCell>
                  {updating ? updateId : null}
                </StyledTableCell>
                <Table aria-label="sticky table" >

                  <TableHead sx={{ borderBottom: '1px solid #ddd', borderTop: "1px solid #ddd" }}>



                    {/* <div className='mt-2 mr-5 h5 font-weight-bold'>
                        <span>Name:</span>
                        <input type="text" value={name} onChange={handleChange} />
                      </div>
                      <div className='mt-2 mr-5 h5 font-weight-bold'>
                        lat:
                        <input type="text" value={lat} />
                      </div>
                      <div className='mt-2 mr-5 h5 font-weight-bold'>
                        lng:
                        <input type="text" value={lng} />
                      </div> */}

                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }}
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((column, index) => (
                      <TableRow hover role="checkbox" key={index}>
                        <TableCell>{column.id}</TableCell>

                        <TableCell sx={{ textAlign: 'center' }}> {column.name}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}> {column.lng} </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>  {column.lat}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}> {column.number}</TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          <Button onClick={() => addAddressPointBehind(addressId, column.id)} variant="contained" color="success">
                            Thêm
                          </Button>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          <Button onClick={() => {
                            updatePoint(column)
                          }} variant="contained" color="success">
                            Sửa
                          </Button>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          <Button onClick={() => deletePoint(column.id)} variant="contained" color="warning">
                            X
                          </Button>
                        </TableCell>
                      </TableRow>


                      // <TableRow>
                      //   <StyledTableCell>
                      //     {column.id}
                      //   </StyledTableCell>
                      //   <StyledTableCell>
                      //     {column.name}
                      //   </StyledTableCell>
                      //   <StyledTableCell>
                      //     {column.lng}
                      //   </StyledTableCell>
                      //   <StyledTableCell>
                      //     {column.lat}
                      //   </StyledTableCell>
                      //   <StyledTableCell>
                      //     {column.number}
                      //   </StyledTableCell>
                      //   <StyledTableCell>
                      //     <Button onClick={() => addAddressPointBehind(addressId, column.id)} sx={{ height: '3.2em', width: "15%" }} variant="contained" color="success">
                      //       Thêm
                      //     </Button>
                      //   </StyledTableCell>

                      //   <StyledTableCell>
                      //     <Button onClick={() => {
                      //       updatePoint(column)
                      //     }

                      //     } sx={{ height: '3.2em', width: "15%" }} variant="contained" color="success">
                      //       Sửa
                      //     </Button>
                      //   </StyledTableCell>

                      //   <StyledTableCell>
                      //     <Button onClick={() => deletePoint(column.id)} sx={{ height: '3.2em', width: "15%" }} variant="contained" color="warning">
                      //       X
                      //     </Button>
                      //   </StyledTableCell>
                      // </TableRow>
                    ))
                    }
                  </TableBody>

                </Table>
                <Map
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `80%`, margin: `auto`, border: '2px solid black', width: '100%' }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  setLatMap={setLat}
                  setLngMap={setLng}
                  data={data}
                  setUpdatingItem={setUpdatingItem}
                  setUpdatingStatus={setUpdatingStatus}
                  finish={setUpdatingStatus}
                />
              </TableContainer>

            </Paper>

          </Box>
        </>

      </Modal>

    </React.Fragment >
  )
}

export default AddressPointBox