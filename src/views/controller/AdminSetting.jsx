import { faBedPulse } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_SETTING_UPDATE } from 'utils/const'
import { API_SETTING_GET } from 'utils/const'
import { showError } from 'utils/error'
import EditSetting from 'views/Setting/EditSetting'
import Setting from 'views/Setting/Setting'

export default function AdminSetting() {
    const [data, setData] = useState([])
    const [selected, setSelected] = useState(undefined)
    const [openEdit, setOpenEdit] = useState(false)
    let token = localStorage.getItem('token')
    console.log(data);

    useEffect(() => {
        fetchAPI()
    }, [])

    const fetchAPI = async () => {
        const response = await axios.get(API_SETTING_GET)
        if (response.status === 200) {
            setData(response.data)
        }
    }

    const onSubmitEdit = async (data) => {
        try {
            const response = await axios.post(API_SETTING_UPDATE, [data]
                // , {
                //     headers: {
                //         'authorization': 'Bearer ' + token,
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     }
                // }
            )
            if (response.status === 200) {
                toast.success("Sửa thành công", { autoClose: "1500" })
                fetchAPI()
                setOpenEdit(false)
            }
        } catch (error) {
            showError(error)
        }
    }

    const onEdit = (item) => {
        setOpenEdit(true)
        setSelected(item)
        console.log(item);
    }
    return (
        <div>
            <Setting data={data} onEdit={onEdit} />
            {selected && <EditSetting item={selected} openEdit={openEdit} setOpenEdit={setOpenEdit} onSubmitEdit={onSubmitEdit} />}
        </div>
    )
}
