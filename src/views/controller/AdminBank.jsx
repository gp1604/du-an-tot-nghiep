import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { API_BANK_GET } from 'utils/const'
import { showError } from 'utils/error';
import Banks from 'views/Banks/Banks'
import CreateBanks from 'views/Banks/CreateBanks';
import EditBanks from 'views/Banks/EditBanks';
import { API_BANK_ADD, API_BANK_REMOVE, API_BANK_UPDATE } from './../../utils/const';

export default function AdminBank() {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    const [openEdit, setOpenEdit] = useState(false)
    const [selected, setSelected] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchAPI()
    }, [])

    const fetchAPI = async () => {
        const response = await axios.post(API_BANK_GET)
        if (response.status === 200) {
            setData(response.data)
        }
    }

    const onSubmitAdd = async (data, setData) => {
        try {
            if (data.bankAccountName === '') {
                toast.warning('Tên chủ tài khoản không được bỏ trống', { autoClose: 1500 })
            }
            else if (data.bankAccountNumber === '') {
                toast.warning('Mã ngân hàng không được bỏ trống', { autoClose: 1500 })
            }
            else if (data.bankCode === '') {
                toast.warning('Số tài khoản không được bỏ trống', { autoClose: 1500 })
            }
            else if (data.bankName === '') {
                toast.warning('Tên ngân hàng không được bỏ trống', { autoClose: 1500 })
            } else {
                setIsLoading(true)
                const response = await axios.post(API_BANK_ADD, data)
                if (response.status === 200) {
                    setOpen(false)
                    toast.success("Thêm thành công", { autoClose: 1500 })
                    fetchAPI()
                    setIsLoading(false)
                    setData({
                        bankAccountName: "",
                        bankAccountNumber: "",
                        bankCode: "",
                        bankName: ""
                    })
                }
            }
        } catch (error) {
            setIsLoading(false)
            showError()
        }
    }

    const onEdit = (item) => {
        console.log(item);
        setSelected(item)
        setOpenEdit(true)
    }

    const onHandleEdit = async (data, setData) => {
        if (data.bankAccountName === '') {
            toast.warning('Tên ngân hàng không được bỏ trống', { autoClose: 1500 })
        }
        else if (data.bankAccountNumber === '') {
            toast.warning('Mã ngân hàng không được bỏ trống', { autoClose: 1500 })
        }
        else if (data.bankCode === '') {
            toast.warning('Số tài khoản không được bỏ trống', { autoClose: 1500 })
        }
        else if (data.bankName === '') {
            toast.warning('Tên chủ tài khoản không được bỏ trống', { autoClose: 1500 })
        } else {
            setIsLoading(true)
            try {
                const response = await axios.post(API_BANK_UPDATE, data)
                if (response.status === 200) {
                    toast.success("Sửa thành công", { autoClose: 1500 })
                    fetchAPI()
                    setIsLoading(false)
                    setOpenEdit(false)
                }
            } catch (error) {
                setIsLoading(false)
                showError(error)
            }
        }
    }

    const onDelete = async (id) => {
        setLoading(true)
        console.log(id);
        const response = await axios.post(API_BANK_REMOVE + id)
        if (response.status === 200) {
            fetchAPI()
            toast.success("Xoá thành công", { autoClose: 1500 })
            setOpenDelete(false)
            setLoading(false)
        }
    }

    return (
        <div>
            <Banks loading={loading} onEdit={onEdit} data={data} setOpen={setOpen} onDelete={onDelete}
                handleOpenDelete={handleOpenDelete} openDelete={openDelete} handleCloseDelete={handleCloseDelete} />
            <CreateBanks isLoading={isLoading} open={open} setOpen={setOpen} onSubmitAdd={onSubmitAdd} />
            {selected && <EditBanks isLoading={isLoading} onHandleEdit={onHandleEdit} item={selected} openEdit={openEdit} setOpenEdit={setOpenEdit} />
            }
        </div>
    )
}
