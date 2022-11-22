import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_GET_PRODUCT_HIRING } from 'utils/const';
import { API_GET_PRODUCT_AVAILABLE } from 'utils/const';
import HiringPillar from 'views/hiringPillar/HiringPillar';


export default function AdminHiringPillar() {

    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);

    useEffect(() => {
        fetchAPI()
    }, [])
    console.log("data hiring", data);
    const handleChangePage = async (event, newPage) => {
        const response = await axios.get(API_GET_PRODUCT_HIRING + (newPage + 1) + "?dataPerPage=" + rowsPerPage + '&sort=desc&sortField=street&status=HIRING')
        if (response) {
            setData(response.data.content)
            setPage(newPage);
        }
    };

    const handleChangeRowsPerPage = async (event) => {
        const response = await axios.get(API_GET_PRODUCT_HIRING + 1 + "?dataPerPage=" + event.target.value + '&sort=desc&sortField=street&status=HIRING')
        if (response) {
            setData(response.data.content)
            setPage(0);
            setRowsPerPage(+event.target.value);
        }
    };

    const fetchAPI = async () => {
        const response = await axios.get(API_GET_PRODUCT_HIRING + (page + 1) + "?dataPerPage=" + rowsPerPage + '&sort=desc&sortField=street&status=HIRING')
        if (response) {
            setData(response.data.content)
            setTotalPages(response.data.totalElements)
        }
    }
    const search = async (keyword) => {
        const response = await axios.get(API_GET_PRODUCT_HIRING + page + 1 + "?sort=desc&sortField=street&dataPerPage=" + rowsPerPage + '&status=HIRING&keyword=' + keyword)
        if (response) {
            setData(response.data.content)
            setTotalPages(response.data.totalElements)
        }
    }


    return (
        <div>
            <HiringPillar search={search} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} data={data} page={page} rowsPerPage={rowsPerPage} totalPages={totalPages} />
        </div>
    )
}
