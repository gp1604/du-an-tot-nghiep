import { Create } from '@mui/icons-material'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_PRODUCT_EDIT } from 'utils/const'
import { API_GET_CATEGORY } from 'utils/const'
import { API_PRODUCT_DELETE } from 'utils/const'
import { API_PRODUCT_ADD } from 'utils/const'
import { API_GET_PILLAR } from 'utils/const'
import { API_GET_PRODUCT } from 'utils/const'
import CreatePillar from 'views/Pillar/CreatePillar'
import EditPillar from 'views/Pillar/EditPillar'
import Pillar from 'views/Pillar/Pillar'
import { API_GET_ADMIN_ADDRESS } from 'utils/const'
import { showError } from 'utils/error'
import { API_GET_ALL_ADDRESS } from 'utils/const'
import { API_GET_ALL_CATEGORY } from 'utils/const'
import login from "../examples/Login";

function AdminProduct() {
  const [keyword, setKeyword] = useState('')
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [dataAddress, setDataAddress] = useState([])
  const [dataCategory, setDataCategory] = useState([])

  const [selected, setSelected] = useState(undefined)
  const [open, setOpen] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [page, setPage] = React.useState(0);
  const [pageCRUD, setPageCRUD] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [product, setProduct] = useState(null)

  const [openDelete, setOpenDelete] = useState(false)
  const [randomNumber, setRandomNumber] = useState(0)
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getAllProduct()
    getAddress()
    getCategory()
  }, [])

  const getAddress = async (e) => {
    const response = await axios.get(API_GET_ALL_ADDRESS)
    if (response) {
      setDataAddress(response.data)
    }
  }

  const getCategory = async (e) => {
    const response = await axios.get(API_GET_ALL_CATEGORY)
    if (response) {
      setDataCategory(response.data)
    }
  }

  const handleChangeRowsPerPage = async (event) => {
    setPageCRUD(1)
    if (keyword == '') {
      const response = await axios.get(API_GET_PRODUCT + 1 + "?quantity=" + event.target.value + "&sort=desc" + "&sortField=id")
      if (response) {
        setData(response.data.content)
        setPage(0);
        // setTotalPages(response.data.totalElements)
        setRowsPerPage(+event.target.value);
      }
    } else {
      const response = await axios.get(API_GET_PRODUCT + 1 + "?quantity=" + event.target.value + "&sort=desc" + "&sortField=id&keyword=" + keyword)
      if (response) {
        setData(response.data.content)
        setPage(0);
        // setTotalPages(response.data.totalElements)
        setRowsPerPage(+event.target.value);
      }
    }
  };

  const handleChangePage = async (event, newPage) => {
    setPageCRUD(newPage + 1)
    if (keyword == '') {
      const response = await axios.get(API_GET_PRODUCT + (newPage + 1) + "?quantity=" + rowsPerPage + "&sort=desc" + "&sortField=id")
      if (response) {
        setPage(newPage)
        setData(response.data.content)
      }
    } else {
      const response = await axios.get(API_GET_PRODUCT + (newPage + 1) + "?quantity=" + rowsPerPage + "&sort=desc" + "&sortField=id&keyword=" + keyword)
      if (response) {
        setPage(newPage)
        setData(response.data.content)
      }
    }
  }

  const getAllProduct = async (e) => {
    const response = await axios.get(API_GET_PRODUCT + page + 1 + "?quantity=" + rowsPerPage + "&sort=desc" + "&sortField=id")
    if (response) {
      setTotalPages(response.data.totalElements)
      setData(response.data.content)
    }
  }

  const getAllProductWhenCRUD = async (e) => {
    const response = await axios.get(API_GET_PRODUCT + pageCRUD + "?quantity=" + rowsPerPage + "&sort=desc" + "&sortField=id")
    if (response) {
      setTotalPages(response.data.totalElements)
      setData(response.data.content)
    }
  }
  useEffect(() => {
    setSelected(product)
  }, [product, data])

  const onEdit = async (item) => {
    setSelected(item)
    setOpenEdit(true)
    setRandomNumber(Math.floor(Math.random() * (999)))
  }


  const onSubmit = async (data, setData) => {
    if (data.name === "") {
      toast.warning("Không được để trống tên địa chỉ", { autoClose: 1500 })
    }
    else if (data.price === 0) {
      toast.warning("Không được để trống giá", { autoClose: 1500 })
    }
    else if (data.description === "") {
      toast.warning("Không được để trống chú thích", { autoClose: 1500 })
    }

    else {
      setIsLoading(true)
      if(data.addressId === undefined){
        data.addressId = 0
      }
      if(data.categoryId === undefined){
        data.categoryId = 0
      }
      try {
        const formData = new FormData();
        formData.append('multipartFile', data.multipartFile);
        const response = await axios.post(API_PRODUCT_ADD + '?addressId=' + data.addressId+ '&categoryId=' + data.categoryId + '&description=' + data.description
          + '&name=' + data.name + '&price=' + data.price + '&lat=' + data.lat + '&lng=' + data.lng + '&num1=' + data.num1 + '&num2=' + data.num2, formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        if (response.status === 201) {
          toast.success("Thêm thành công", { autoClose: 1500 })
          setOpen(false)
          getAllProductWhenCRUD()
          setRandomNumber(Math.floor(Math.random() * (999)))
          setIsLoading(false)
          setData({
            description: "",
            status: "AVAILABLE",
            multipartFile: '',
            name: "",
            price: 0,
            lat: 12.68107,
            lng: 108.0354658,
            num1: 0,
            num2: 0,
          })
          setOpen(false)
          getAllProductWhenCRUD()
          setRandomNumber(Math.floor(Math.random() * (999)))
          setIsLoading(false)

        }

      } catch (error) {
        setIsLoading(false)
        showError(error)
      }
    }
  }

  const onSubmitEdit = async (data) => {
    if (data.name === "") {
      toast.warning("Không được để trống tên địa chỉ", { autoClose: 1500 })
    }
    else if (data.price === 0) {
      toast.warning("Không được để trống giá", { autoClose: 1500 })
    }
    else if (data.description === "") {
      toast.warning("Không được để trống chú thích", { autoClose: 1500 })
    }
    else {
      setIsLoading(true)
      try {
        const formData = new FormData();
        formData.append('multipartFile', data.multipartFile);
        const response = await axios.put(API_PRODUCT_EDIT + "?addressId=" + data.addressId + "&categoryId=" + data.categoryId +
          "&description=" + data.description + "&id=" + data.id + "&name=" + data.name + "&price=" + data.price + "&status=" + data.status + "&lat=" + data.lat + "&lng=" + data.lng + '&num1=' + data.num1 + '&num2=' + data.num2,

          formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (response.status === 200) {
          toast.success("Sửa thành công", { autoClose: 1500 })
          getAllProductWhenCRUD()
          setRandomNumber(Math.floor(Math.random() * (999)))
          setOpenEdit(true)
          setSelected(null)
          setIsLoading(false)
        }

        //catch show error
      } catch (error) {
        setIsLoading(false)
        showError(error)
      }
    }
  }

  const onDelete = async (id) => {
    setLoading(true)
    try {
      const response = await axios.delete(API_PRODUCT_DELETE + id)
      if (response.status === 200) {
        setOpenDelete(false)
        toast.success("Xóa thành công", { autoClose: 1500 })
        getAllProductWhenCRUD()
        setLoading(false)
      }
    } catch (error) {
      showError(error)
      setLoading(false)
    }
  }

  const search = async (keyword) => {
    setKeyword(keyword)
    const response = await axios.get(API_GET_PRODUCT + page + 1 + "?quantity=" + rowsPerPage + "&sort=desc" + "&sortField=id&keyword=" + keyword)
    if (response) {
      setTotalPages(response.data.totalElements)
      setData(response.data.content)
    }
  }
  return (
    <div>
      <CreatePillar isLoading={isLoading} dataCategory={dataCategory} onSubmit={onSubmit} open={open} setOpen={setOpen} dataAddress={dataAddress} added={randomNumber} />
      {selected && <EditPillar isLoading={isLoading} dataCategory={dataCategory} item={selected} setClickedProduct={setProduct} openEdit={openEdit} setOpenEdit={setOpenEdit} onSubmitEdit={onSubmitEdit} dataAddress={dataAddress} updated={randomNumber} />}
      <Pillar loading={loading} page={page} search={search} rowsPerPage={rowsPerPage} onDelete={onDelete} onEdit={onEdit} data={data} setOpen={setOpen}
        handleChangePage={handleChangePage} totalPages={totalPages} handleChangeRowsPerPage={handleChangeRowsPerPage}
        openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleOpenDelete={handleOpenDelete} />
    </div>
  )
}

export default AdminProduct