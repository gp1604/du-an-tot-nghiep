import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { API_GET_CATEGORY } from 'utils/const';
import { API_ADD_CATEGORY } from 'utils/const';
import { API_EDIT_CATEGORY } from 'utils/const';
import { API_GET_PICTURES } from 'utils/const';
import { API_POST_PICTURES } from 'utils/const';
import { API_DELETE_PICTURES } from 'utils/const';
import { API_UPDATE_PICTURES } from 'utils/const';
import { API_DELETE_CATEGORY } from 'utils/const';
import { API_UPDATE_ROLE } from 'utils/const';
import { API_GET_USERS } from 'utils/const';
import { showError } from 'utils/error';
import Category from 'views/category/Category';
import CreateCategory from 'views/category/CreateCategory';
import EditCategory from 'views/category/EditCategory';
import AddPictures from 'views/imageWeb/AddPictures';
import EditPictures from 'views/imageWeb/EditPictures';
import Picture from 'views/imageWeb/Picture';

export default function AdminPictures() {

    const [data, setData] = useState([])
    const [selected, setSelected] = useState(undefined)
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = React.useState(false)
    const handleCloseEdit = () => setOpenEdit(false)
    const [openDelete, setOpenDelete] = useState(false)
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    useEffect(() => {
        fetchAPI()
    }, [])



    const fetchAPI = async () => {
        const response = await axios.get(API_GET_PICTURES)
        if (response) {
            setData(response.data)
        }
    }

    const onEdit = (item) => {
        setSelected(item)
        setOpenEdit(true)
        console.log(item);
    }

    const onSubmitAdd = async (data) => {
        try {
            const formData = new FormData();
            formData.append('image', data.image);
            const response = await axios.post(API_POST_PICTURES + '?category=' + data.category, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            if (response && response.status === 200) {
                toast.success("Thêm thành công", { autoClose: 1500 })
                setOpen(false)
                fetchAPI()
            }
        } catch (error) {
            showError(error)
        }
    }

    const onSubmitEdit = async (data) => {
        console.log('on submit id ', data);
        try {
            const formData = new FormData();
            formData.append('image', data.image);
            const response = await axios.post(API_UPDATE_PICTURES + data.id, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            if (response && response.status === 200) {
                toast.success("Sửa thành công", { autoClose: 1500 })
                fetchAPI();
                setOpenEdit(false)
            }
            //catch show error
        } catch (error) {
            showError(error)
        }
    }

    const onDelete = async (id) => {
        try {
            const response = await axios.delete(API_DELETE_PICTURES + id)
            if (response && response.status === 200) {
                toast.success("Xoá thành công", { autoClose: 1500 })
                setOpenDelete(false)
                fetchAPI()
            }
        } catch (error) {
            showError(error)
        }
    }
    const search = async (keyword) => {
        // const response = await axios.get(API_GET_ADMIN_ADDRESS + page + 1 + "?dataPerPage=" + rowsPerPage + "&sort=desc" + "&sortField=id&keyword=" + keyword)
        // if (response) {
        //   setdata(response.data.content)
        //   setTotalPages(response.data.totalElements)

        // }
    }
    return (
        <div>
            <Picture search={search} data={data} setOpen={setOpen} onEdit={onEdit} onDelete={onDelete}
                openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleOpenDelete={handleOpenDelete} />
            <AddPictures open={open} setOpen={setOpen} onSubmitAdd={onSubmitAdd} />
            {selected && <EditPictures data={data} item={selected} openEdit={openEdit} setOpenEdit={setOpenEdit} onSubmitEdit={onSubmitEdit} />}
        </div>
    )
}
