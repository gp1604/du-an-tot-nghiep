import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_GET_PRODUCT_AVAILABLE } from 'utils/const';
import { API_GET_USERS } from 'utils/const';
import AvailablePillar from 'views/availablePillar/AvailablePillar';

export default function AdminAvailablePillar() {

    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);

    useEffect(() => {
        fetchAPI()
    }, [])

    const handleChangePage = async (event, newPage) => {
        const response = await axios.get(API_GET_PRODUCT_AVAILABLE + (newPage + 1) + "?sort=desc&sortField=street&dataPerPage=" + rowsPerPage + '&status=AVAILABLE')
        if (response) {
            setData(response.data.content)
            setPage(newPage);
        }
    };

    const handleChangeRowsPerPage = async (event) => {
        const response = await axios.get(API_GET_PRODUCT_AVAILABLE + 1 + "?sort=desc&sortField=street&dataPerPage=" + event.target.value + '&status=AVAILABLE')
        if (response) {
            setData(response.data.content)
            setPage(0);
            setRowsPerPage(+event.target.value);
        }
    };

    const fetchAPI = async () => {
        const response = await axios.get(API_GET_PRODUCT_AVAILABLE + page + 1 + "?sort=desc&sortField=street&dataPerPage=" + rowsPerPage + '&status=AVAILABLE')
        if (response) {
            setData(response.data.content)
            setTotalPages(response.data.totalElements)
        }
    }
    const search = async (keyword) => {
        const response = await axios.get(API_GET_PRODUCT_AVAILABLE + page + 1 + "?sort=desc&sortField=street&dataPerPage=" + rowsPerPage + '&status=AVAILABLE&keyword=' + keyword)
        if (response) {
            setData(response.data.content)
            setTotalPages(response.data.totalElements)
        }
    }

    return (
        <div>
            <AvailablePillar search={search} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} data={data} page={page} rowsPerPage={rowsPerPage} totalPages={totalPages} />
        </div>
    )
}
