import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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

const columnsDetail = [
  { id: 'id', label: 'Id', minWidth: 70 },
  {
    id: 'month',
    label: 'Số tháng thuê',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  }, {
    id: 'name',
    label: 'Tên trụ',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  }, {
    id: 'price',
    label: 'Giá tiền',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  }, {
    id: 'description',
    label: 'Mô tả',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  }, {
    id: 'address',
    label: 'Địa chỉ',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1300,
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
        console.log("yo")
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
      if (data.name === " ") {
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
    setInput({
      ...input,
      addressId: addressId,
      lat: lat,
      lng: lng,
      name: name
    })
  }
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  function calculateAndDisplayRoute(directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer) {
    directionsService
      .route({
        origin: { lat: data[0].lat, lng: data[0].lng },
        destination: { lat: data[data.length - 1].lat, lng: data[data.length - 1].lng },
        travelMode: google.maps.TravelMode.DRIVING,
      }

      )
  }

  function MapDraw() {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  }

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

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={closeDetail}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box  sx={style}>
          <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>
            <TableContainer sx={{ height: '550px' }}>
              <Table aria-label="sticky table">
                <TableHead>
                  <TableCell>
                    {updating ? <input type="number" value={updateId} /> : null}

                  </TableCell>
                  <TableCell>
                    name:
                    <input type="text" value={name} onChange={handleChange} />

                  </TableCell>
                  <TableCell>
                    lat:
                    <input type="text" value={lat} />

                  </TableCell>

                  <TableCell>
                    lng:
                    <input type="text" value={lng} />
                  </TableCell>
                  <TableCell>
                    {updating ? <>
                      <Button onClick={() => { onUpdatePoint(updateId, input) }}>Update</Button>
                      <Button onClick={() => { onCancelUpdate() }}>X</Button>
                    </>
                      : data.length < 2 ? <button onClick={() => addAddressPoint(addressId)}>Thêm</button> : null}
                  </TableCell>

                  {data.map((column) => (
                    <TableRow>

                      <TableCell>
                        {column.id}
                      </TableCell>
                      <TableCell>
                        {column.name}
                      </TableCell>
                      <TableCell>
                        {column.lng}
                      </TableCell>
                      <TableCell>
                        {column.lat}
                      </TableCell>
                      <TableCell>
                        {column.number}
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => addAddressPointBehind(addressId, column.id)} sx={{ height: '3.2em', width: "15%" }} variant="contained" color="success">
                          behind
                        </Button>
                      </TableCell>

                      <TableCell>
                        <Button onClick={() => deletePoint(column.id)} sx={{ height: '3.2em', width: "15%" }} variant="contained" color="warning">
                          X
                        </Button>
                      </TableCell>

                      <TableCell>
                        <Button onnClick={() => updatePoint(column)} sx={{ height: '3.2em', width: "15%" }} variant="contained" color="success">
                          U
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                  }
                </TableHead>
                <TableBody>

                </TableBody>
                <Button onClick={MapDraw} sx={{ height: '3.2em', width: "15%" }} variant="contained" color="success">
                  Test
                </Button>
              </Table>
              <Map
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
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
      </Modal>

    </React.Fragment >
  )
}

export default AddressPointBox