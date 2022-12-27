import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { API_UPDATE_ROLE } from 'utils/const';
import { API_GET_USERS } from 'utils/const';
import { showError } from 'utils/error';
import Customer from 'views/customer/Customer';
import EditCustomer from 'views/customer/EditCustomer';

export default function AdminCustomer() {
  const [keyword, setKeyword] = useState('')
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [selected, setSelected] = useState(undefined)
  const [openEdit, setOpenEdit] = React.useState(false)
  const [pageCRUD, setPageCRUD] = React.useState(1);
  const handleCloseEdit = () => setOpenEdit(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchAPI()
  }, [])

  const handleChangePage = async (event, newPage) => {
    setPageCRUD(newPage + 1)
    if (keyword == '') {
      const response = await axios.get(API_GET_USERS + (newPage + 1) + "?sort=desc" + "&sortField=email" + "&usersPerPage=" + rowsPerPage)
      if (response) {
        setData(response.data.content)
        setPage(newPage);
      }
    } else {
      const response = await axios.get(API_GET_USERS + (newPage + 1) + "?sort=desc" + "&sortField=email" + "&usersPerPage=" + rowsPerPage + '&keyword=' + keyword)
      if (response) {
        setData(response.data.content)
        setPage(newPage);
      }
    }
  };

  const handleChangeRowsPerPage = async (event) => {
    setPageCRUD(1)
    if (keyword == '') {
      const response = await axios.get(API_GET_USERS + 1 + "?sort=desc" + "&sortField=email" + "&usersPerPage=" + event.target.value)
      if (response) {
        setData(response.data.content)
        setPage(0);
        setRowsPerPage(+event.target.value);
      }
    } else {
      const response = await axios.get(API_GET_USERS + 1 + "?sort=desc" + "&sortField=email" + "&usersPerPage=" + event.target.value + '&keyword=' + keyword)
      if (response) {
        setData(response.data.content)
        setPage(0);
        setRowsPerPage(+event.target.value);
      }
    }
  };

  const fetchAPI = async () => {
    const response = await axios.get(API_GET_USERS + page + 1 + "?sort=desc" + "&sortField=email" + "&usersPerPage=" + rowsPerPage)
    if (response) {
      setData(response.data.content)
      setTotalPages(response.data.totalElements)
    }
  }

  const fetchAPIWhenCRUD = async () => {
    const response = await axios.get(API_GET_USERS + pageCRUD + "?sort=desc" + "&sortField=email" + "&usersPerPage=" + rowsPerPage)
    if (response) {
      setData(response.data.content)
      setTotalPages(response.data.totalElements)
    }
  }

  const onEdit = async (item) => {
    setSelected(item)
    setOpenEdit(true)
  }

  // const [id, setId] = useState(0)
  // const [role, setRole] = useState('')

  const onSubmitEdit = async (data) => {
    let sub = data.roleName.substr(1, data.roleName.length)
    let roleSub = sub.substring(0, sub.length - 1)
    if (data.roleName === null) {
      toast.error("Vai trò không được để trống", { autoClose: 1500 })
    } else {
      setIsLoading(true)
      try {
        const response = await axios.put(API_UPDATE_ROLE + data.id + "/update?roleName=" + roleSub)
        if (response && response.status === 200) {
          toast.success("Sửa thành công", { autoClose: "1500" })
          fetchAPIWhenCRUD();
          setOpenEdit(false)
          setIsLoading(false)
        } else if (response && response.status === 400) {
          toast.error("Người dùng đã có vai trò này!", { autoClose: "1500" })
        }
        //catch show error
      } catch (error) {
        setIsLoading(false)
        showError(error)
      }
    }

  }

  const search = async (keyword) => {
    setKeyword(keyword)
    const response = await axios.get(API_GET_USERS + page + 1 + "?sort=desc" + "&sortField=email" + "&usersPerPage=" + rowsPerPage + "&keyword=" + keyword)
    if (response) {
      setData(response.data.content)
      setTotalPages(response.data.totalElements)
    }
  }
  return (
    <div>
      {selected && <EditCustomer isLoading={isLoading} item={selected} openEdit={openEdit} handleCloseEdit={handleCloseEdit} onSubmitEdit={onSubmitEdit} />}
      <Customer search={search} onEdit={onEdit} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} data={data} page={page} rowsPerPage={rowsPerPage} totalPages={totalPages} />
    </div>
  )
}
