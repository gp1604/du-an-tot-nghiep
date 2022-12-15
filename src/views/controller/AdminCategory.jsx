import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { API_GET_CATEGORY } from 'utils/const';
import { API_ADD_CATEGORY } from 'utils/const';
import { API_GET_CATEGORY_PAGE } from 'utils/const';
import { API_EDIT_CATEGORY } from 'utils/const';
import { API_DELETE_CATEGORY } from 'utils/const';
import { API_UPDATE_ROLE } from 'utils/const';
import { API_GET_USERS } from 'utils/const';
import { showError } from 'utils/error';
import Category from 'views/category/Category';
import CreateCategory from 'views/category/CreateCategory';
import EditCategory from 'views/category/EditCategory';

export default function AdminCategory() {

    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);
    const [selected, setSelected] = useState(undefined)
    const [open, setOpen] = useState(false);
    const [pageCRUD, setPageCRUD] = React.useState(1);

    const [openEdit, setOpenEdit] = React.useState(false)
    const handleCloseEdit = () => setOpenEdit(false)

    const [openDelete, setOpenDelete] = useState(false)
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    useEffect(() => {
        fetchAPI()
    }, [])

    const handleChangePage = async (event, newPage) => {
        setPageCRUD(newPage + 1)
        const response = await axios.get(API_GET_CATEGORY_PAGE + (newPage + 1) + "?sort=desc" + "&sortField=id" + "&dataPerPage=" + rowsPerPage)
        if (response) {
            setData(response.data.content)
            setPage(newPage);
        }
    };

    const handleChangeRowsPerPage = async (event) => {
        setPageCRUD(1)
        const response = await axios.get(API_GET_CATEGORY_PAGE + 1 + "?sort=desc" + "&sortField=id" + "&dataPerPage=" + event.target.value)
        if (response) {
            setData(response.data.content)
            setPage(0);
            setRowsPerPage(+event.target.value);
        }
    };

    const fetchAPI = async () => {
        const response = await axios.get(API_GET_CATEGORY_PAGE + page + 1 + "?dataPerPage=" + rowsPerPage + "&sort=desc" + "&sortField=id")
        if (response) {
            setData(response.data.content)
            setTotalPages(response.data.totalElements)
        }
    }

    const fetchAPIWhenCRUD = async () => {
        const response = await axios.get(API_GET_CATEGORY_PAGE + pageCRUD + "?dataPerPage=" + rowsPerPage + "&sort=desc" + "&sortField=id")
        if (response) {
            setData(response.data.content)
            setTotalPages(response.data.totalElements)
        }
    }

    const onEdit = (item) => {
        setSelected(item)
        setOpenEdit(true)
        console.log(item);
    }

    const onSubmitAdd = async (data, setData) => {
        try {
            if (data.name == '') {
                toast.warning("Tên không được để trống", { autoClose: 1500 });
            }
            else if (data.description == '') {
                toast.warning("Mô tả không được để trống", { autoClose: 1500 });

            } else {
                const response = await axios.post(API_ADD_CATEGORY, data)
                if (response && response.status === 201) {
                    toast.success("Thêm thành công", { autoClose: 1500 })
                    setOpen(false)
                    fetchAPI()
                    setData({
                        name: "",
                        description: ""
                    })
                }
            }
        } catch (error) {
            showError(error)
        }
    }

    const onSubmitEdit = async (data) => {
        try {
            if (data.name == '') {
                toast.warning("Tên không được để trống", { autoClose: 1500 });
            }
            else if (data.description == '') {
                toast.warning("Mô tả không được để trống", { autoClose: 1500 });

            } else {
                const response = await axios.put(API_EDIT_CATEGORY, data)
                if (response && response.status === 201) {
                    toast.success("Sửa thành công", { autoClose: 1500 })
                    fetchAPIWhenCRUD();
                    setOpenEdit(false)
                }
            }
            //catch show error
        } catch (error) {
            showError(error)
        }
    }

    const onDelete = async (id) => {
        const response = await axios.delete(API_DELETE_CATEGORY + id)
        if (response && response.status === 201) {
            toast.success("Xoá thành công", { autoClose: 1500 })
            setOpenDelete(false)
            fetchAPIWhenCRUD()
        }
    }
    const search = async (keyword) => {
        // const response = await axios.get(API_GET_CATEGORY_PAGE + page + 1 + "?dataPerPage=" + rowsPerPage + "&sort=desc" + "&sortField=id&keyword=" + keyword)
        // if (response) {
        //     setData(response.data.content)
        //     setTotalPages(response.data.totalElements)
        // }
    }
    return (
        <div>
            {selected && <EditCategory item={selected} openEdit={openEdit} setOpenEdit={setOpenEdit} onSubmitEdit={onSubmitEdit} />}
            <CreateCategory open={open} setOpen={setOpen} onSubmitAdd={onSubmitAdd} />
            <Category totalPages={totalPages} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} page={page} rowsPerPage={rowsPerPage} data={data} search={search} setOpen={setOpen} onEdit={onEdit} onDelete={onDelete}
                openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleOpenDelete={handleOpenDelete} />
        </div>
    )
}
