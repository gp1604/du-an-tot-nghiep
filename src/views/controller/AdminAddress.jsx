import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_EDIT_PILLAR } from 'utils/const'
import { API_GET_ADMIN_ADDRESS } from 'utils/const'
import { API_GET_ADDRESS } from 'utils/const'
import { API_CLICK_SEARCH_ADDRESS } from 'utils/const'
import { API_ADD_PILLAR } from 'utils/const'
import { API_DELETE_PILLAR } from 'utils/const'
import { API_GET_PILLAR } from 'utils/const'
import Address from 'views/pillarAddress/Address'
import CreateAddress from 'views/pillarAddress/CreateAddress'
import EditAddress from 'views/pillarAddress/EditAddress'


export default function AdminPillar() {
  const [keyword, setKeyword] = useState('')
  const [data, setdata] = useState([])
  const [selected, setSelected] = useState(undefined)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openEdit, setOpenEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [openDelete, setOpenDelete] = useState(false)
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const [pageCRUD, setPageCRUD] = React.useState(1);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    fetchAPI()
  }, [])

  const handleChangePage = async (event, newPage) => {
    setPageCRUD(newPage + 1)
    if (keyword == '') {
      const response = await axios.get(API_GET_ADMIN_ADDRESS + (newPage + 1) + "?dataPerPage=" + rowsPerPage + "&sort=desc" + "&sortField=id")
      if (response) {
        setPage(newPage);
        setdata(response.data.content)
      }
    } else {
      const response = await axios.get(API_GET_ADMIN_ADDRESS + (newPage + 1) + "?dataPerPage=" + rowsPerPage + "&sort=desc" + "&sortField=id&keyword=" + keyword)
      if (response) {
        setPage(newPage);
        setdata(response.data.content)
      }
    }
  };

  const handleChangeRowsPerPage = async (event) => {
    setPageCRUD(1)
    if (keyword == '') {
      const response = await axios.get(API_GET_ADMIN_ADDRESS + 1 + "?dataPerPage=" + event.target.value + "&sort=desc" + "&sortField=id")
      if (response) {
        setdata(response.data.content)
        setPage(0);
        setRowsPerPage(+event.target.value);
      }
    } else {
      const response = await axios.get(API_GET_ADMIN_ADDRESS + 1 + "?dataPerPage=" + event.target.value + "&sort=desc" + "&sortField=id&keyword=" + keyword)
      if (response) {
        setdata(response.data.content)
        setPage(0);
        setRowsPerPage(+event.target.value);
      }
    }
  };

  const fetchAPI = async (e) => {
    const response = await axios.get(API_GET_ADMIN_ADDRESS + page + 1 + "?dataPerPage=" + rowsPerPage + "&sort=desc" + "&sortField=id")
    if (response) {
      setdata(response.data.content)
      setTotalPages(response.data.totalElements)
    }
  }
  const fetchAPIWhenCRUD = async (e) => {
    const response = await axios.get(API_GET_ADMIN_ADDRESS + pageCRUD + "?dataPerPage=" + rowsPerPage + "&sort=desc" + "&sortField=id")
    if (response) {
      setdata(response.data.content)
      setTotalPages(response.data.totalElements)
    }
  }

  const onSubmit = async (data, setDataAddress, setOpen) => {
    if (data.city === '') {
      toast.warning("Thành phố không được để trống", { autoClose: 1500 });
    }
    else if (data.street === '') {
      toast.warning("Đường không được để trống", { autoClose: 1500 });
    }
    else {
      setIsLoading(true)
      try {
        const formData = new FormData();
        formData.append('multipartFile', data.multipartFile);
        const response = await axios.post(API_ADD_PILLAR + "?city=" + data.city + "&description=" + data.description + "&street=" + data.street, formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        if (response && response.status === 201) {
          toast.success("Thêm thành công", { autoClose: 1500 });
          setOpenEdit(false);
          fetchAPI();
          setIsLoading(false)

          setDataAddress({
            city: '',
            street: '',
            description: '',
            multipartFile: ''
          })
          setOpen(false)
        }

        //catch show error
      } catch (error) {
        setIsLoading(false)
        console.log(error.response.data)
        if (error.response.data.message) {
          toast.error(`${error.response.data.message}`, {
            autoClose: 2000
          })
        }
        else if (error.response.data.error) {
          toast.error(`${error.response.data.error}`, {
            autoClose: 2000
          })
        }
        else if (error.response.data.error && error.response.data.message) {
          toast.error(`${error.response.data.message}`, {
            autoClose: 2000
          })
        }
        else {
          toast.error('Error', {
            autoClose: 2000
          })
        }
      }
    }

  }

  const onEdit = async (post) => {
    setSelected(post)
    setOpenEdit(true)
  }

  const onSubmitEdit = async (data) => {
    if (data.city === '') {
      toast.warning("Thành phố không được để trống", { autoClose: 1500 });
    }
    else if (data.street === '') {
      toast.warning("Đường không được để trống", { autoClose: 1500 });
    }
    else {
      setIsLoading(true)
      try {
        const formData = new FormData();
        formData.append('multipartFile', data.multipartFile);
        const response = await axios.put(API_EDIT_PILLAR + "?city=" + data.city + "&description=" + data.description + "&id=" + data.id + "&street=" + data.street, formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        if (response && response.status === 201) {
          toast.success("Cập nhập thành công", { autoClose: 1500 });
          fetchAPIWhenCRUD();
          setIsLoading(false)
          setOpenEdit(false)
        }

        //catch show error
      } catch (error) {
        setIsLoading(false)

        console.log(error.response.data)
        if (error.response.data.message) {
          toast.error(`${error.response.data.message}`, {
            autoClose: 2000
          })
        }
        else if (error.response.data.error) {
          toast.error(`${error.response.data.error}`, {
            autoClose: 2000
          })
        }
        else if (error.response.data.error && error.response.data.message) {
          toast.error(`${error.response.data.message}`, {
            autoClose: 2000
          })
        }
        else {
          toast.error('Error', {
            autoClose: 2000
          })
        }
      }
    }
  }

  const onDelete = async (id) => {
    try {
      const response = await axios.delete(API_DELETE_PILLAR + id)
      if (response && response.status === 201) {
        setOpenDelete(false)
        toast.success("Xóa thành công", { autoClose: 1500 });
        fetchAPIWhenCRUD();
      }
      //catch show error
    } catch (error) {
      console.log(error.response.data)
      if (error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
          autoClose: 2000
        })
      }
      else if (error.response.data.error) {
        toast.error(`${error.response.data.error}`, {
          autoClose: 2000
        })
      }
      else if (error.response.data.error && error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
          autoClose: 2000
        })
      }
      else {
        toast.error('Error', {
          autoClose: 2000
        })
      }

    }
  }

  const search = async (keyword) => {
    setKeyword(keyword)
    const response = await axios.get(API_GET_ADMIN_ADDRESS + page + 1 + "?dataPerPage=" + rowsPerPage + "&sort=desc" + "&sortField=id&keyword=" + keyword)
    if (response) {
      setdata(response.data.content)
      setTotalPages(response.data.totalElements)

    }
  }

  return (
    <div>
      <CreateAddress isLoading={isLoading} onSubmit={onSubmit} open={open} setOpen={setOpen} />
      {selected && <EditAddress isLoading={isLoading} item={selected} onSubmitEdit={onSubmitEdit} openEdit={openEdit} setOpenEdit={setOpenEdit} />}
      <Address search={search} open={open} setOpen={setOpen} data={data} onDelete={onDelete} onEdit={onEdit} totalPages={totalPages}
        page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} rowsPerPage={rowsPerPage}
        openDelete={openDelete} setOpenDelete={setOpenDelete} handleOpenDelete={handleOpenDelete} handleCloseDelete={handleCloseDelete} />
    </div>
  )
}
