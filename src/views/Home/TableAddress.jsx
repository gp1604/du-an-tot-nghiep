import { Grid, IconButton, InputBase, Pagination, Stack, styled, Switch } from '@mui/material';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Link, NavLink, useHistory } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './css.css'
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { API_GET_PILLAR } from 'utils/const';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ModalDetailProduct from './ModalDetailProduct';
import { API_FIND_BY_PRODUCT_ID } from 'utils/const';
import { API_ADDRESS_FILTER } from 'utils/const';
import { toast } from 'react-toastify';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

import CheckIcon from '@mui/icons-material/Check';
import ToggleButtonMui from '@mui/material/ToggleButton';
import './scss.scss'
import AddressDetail from 'views/pillarAddress/AddressDetail';
import { API_GET_ADDRESS } from 'utils/const';
import { API_CLICK_SEARCH_ADDRESS } from 'utils/const';


import Menu from '@mui/material/Menu';
import usePagination from 'views/pillarAddress/Pagination';
import { formatMoney } from 'common/formatMoney';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';


const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 990,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function TableAddress() {
    const history = useHistory();

    const [selected, setSelected] = React.useState(false);
    const ToggleButton = styled(ToggleButtonMui)({
    });

    const handleChangeChecked = (event) => {
        setSelected(event.target.checked);
    };

    // show hide popup
    const [open, setOpen] = React.useState(false);
    const [dataDetail, setDataDetail] = useState([])
    const handleOpen = async (id) => {
        console.log(id);
        history.push('/auth/address/' + id)
    };
    const handleClose = () => setOpen(false);

    // getFirstPageForHome
    const [data, setData] = useState([])
    const [sort, setSort] = React.useState('asc');
    const [field, setField] = React.useState('totalProductAvailable');
    const [keyword, setKeyword] = React.useState('');
    const handleChangeField = (event) => {
        setField(event.target.value);
        onChangeSearchNew()
        // onclickFilter()
    };

    const getAllAddRess = async (e) => {
        const response = await axios.get(API_GET_ADDRESS + '1?dataPerPage=6&sort=desc&sortField=totalProductAvailable')
        if (response) {
            setData(response.data.contents)
            console.log(response.data.contents);
        }
    }


    //new
    const onChangeSearchNew = async (e) => {
        if (selected === false) {
            setSort('desc')
        } else setSort('asc')
        if (field === '') {
            setField('street')
        }
        const response = await axios.get(API_GET_ADDRESS + '1?dataPerPage=6&sort=' + sort + '&sortField=' + field)
        if (response) {
            setData(response.data.contents)
            setShow(false)
        }
    }

    //click search
    const [show, setShow] = useState(false);
    const onclickSearch = async (e) => {
        const response = await axios.get(API_GET_ADDRESS + '1?dataPerPage=6&keyword=' + keyword + '&sort=desc&sortField=totalProductAvailable')
        if (response) {
            setData(response.data.contents)
            setShow(true)
            // getAllAddRess()
        }
    }
    // ONCHANGE FILTER
    const onclickFilter = async (e) => {
        const response = await axios.get(API_ADDRESS_FILTER + "keyword=" + keyword + '&quantity=1&sort=' + sort + '&sortField=' + field)
        if (response) {
            setData(response.data)
        }
        setShow(false)
    }
    //Pagination
    let [page, setPage] = useState(1);
    const PER_PAGE = 6;
    const count = Math.ceil(data.length / PER_PAGE);
    const _DATA = usePagination(data, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };


    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        setKeyword(string)
        setShow(false)
    }

    const handleOnHover = (result) => {
        // the item hovered
    }

    const handleOnSelect = (item) => {
        // the item selected
        history.push('/auth/address/' + item.id)
    }

    const handleOnFocus = () => {
    }
    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left', cursor: 'pointer' }}> {item.street}</span>
                <span style={{ display: 'block', textAlign: 'left', cursor: 'pointer' }}> Khoảng giá: {formatMoney(item.minPrice)} - {formatMoney(item.maxPrice)} VNĐ </span>
            </>
        )
    }

    useEffect(() => {
        getAllAddRess()
    }, [])
    return (
        <React.Fragment>
            <Box sx={{ width: '86%', margin: 'auto' }}>
                <Box sx={{ flexGrow: 1, mt: 10, marginTop: '30px !important' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Paper sx={{ border: "1px solid #ddd", display: 'flex', height: '45px', width: '100%', borderRadius: '24px' }}>
                                {/* <IconButton type="button" sx={{ p: '5px', }} aria-label="search">
                                    <SearchIcon onClick={onclickFilter} />
                                </IconButton> */}
                                {/* <InputBase
                                    sx={{ ml: 1, flex: 1, width: '90%', fontSize: '1.1em' }}
                                    placeholder="Tìm theo từ khóa"
                                    onChange={e => {
                                        setKeyword(e.target.value)
                                        setShow(false)
                                    }}
                                /> */}
                                <div style={{ width: '100%', zIndex: '10' }}>
                                    <ReactSearchAutocomplete
                                        items={data}
                                        fuseOptions={{ keys: ["street"] }}
                                        onSearch={handleOnSearch}
                                        placeholder='Tìm kiếm theo tên đường'
                                        onHover={handleOnHover}
                                        onSelect={handleOnSelect}
                                        onFocus={handleOnFocus}
                                        autoFocus
                                        formatResult={formatResult}
                                    />
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={3} >
                            <FormControl sx={{ width: '53%', backgroundColor: 'white', height: '45px', borderRadius: '5px' }} size="small">
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <h3 style={{ color: 'black', width: '190px', marginLeft: '10%', marginRight: '10%', marginTop: '10px', height: '45px', }} id="demo-select-small">Sắp xếp </h3>
                                    <ToggleButton
                                        sx={{ height: '73%' }}
                                        value="check"
                                        selected={selected}
                                        onChange={() => {
                                            setSelected(!selected);
                                            onChangeSearchNew()
                                            // onclickFilter()
                                        }}
                                    >
                                        {selected ? <NorthIcon /> : <SouthIcon />}
                                    </ToggleButton>
                                </div>
                            </FormControl>
                            <Button sx={{ width: '40%', ml: 2, borderRadius: '5px', height: '45px', }} variant="contained" onClick={onclickSearch} color="primary">
                                Tìm kiếm
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ width: '100%', mt: 2, }} className='hoverBut' >
                    {show && <p>Tìm thấy {data.length} kết quả cho: "{keyword}"</p>}
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {_DATA.currentData().length > 0 ? _DATA.currentData().map((item, index) => (

                            <Grid item xs={6} sx={{ mt: 1 }} key={index} >
                                <div style={{ backgroundColor: '#E7EBF0', justifyItems: 'center', display: 'flex', flexDirection: 'row', padding: '10px', borderRadius: "8px" }}>
                                    <div style={{
                                        width: '100%', height: '260px'
                                    }}  >
                                        <img style={{ width: '100%', height: '100%', border: '1px solid #ddd', borderRadius: "8px" }} src={item.image} alt="" />

                                    </div>
                                    <div style={{ width: '100%', justifyContent: 'center', color: 'black' }}>
                                        <p style={{ fontSize: '20px', paddingTop: '7px' }}>Đường:  {item.street}</p>
                                        {/* <p>Thành Phố: {item.city} </p> */}
                                        {/* <p>Mô tả: {item.description}</p> */}
                                        <p>Khoảng giá: <span style={{ fontSize: '20px', fontWeight: '600' }}>{formatMoney(item.minPrice)} - {formatMoney(item.maxPrice)}</span> </p>
                                        <p>Trụ còn trống: <span style={{ color: 'red' }}>{item.totalProductAvailable}</span>/{item.totalProduct}</p>
                                        <p style={{ fontSize: '0.9em', fontWeight: '600' }}>{item.city} City</p>
                                        <NavLink to={'/auth/address/' + item.id}>
                                            <Button sx={{
                                                // mt:5,
                                                '&:hover': {
                                                    bgcolor: '#007784',
                                                    outline: "none",
                                                    boxShadow: "none",
                                                    color: "#FFFFFF !important"
                                                },
                                                border: "3px solid #007784 !important",
                                                fontWeight: "500", width: "90%",
                                                background: "none",
                                                outline: "none",
                                                color: "#007784 !important",
                                                borderRadius: "8px",
                                                boxShadow: "none",
                                            }}  >
                                                Xem thêm
                                            </Button>
                                        </NavLink>

                                    </div>
                                </div>
                            </Grid>
                        )) : <div style={{ width: '50%', margin: 'auto', marginTop: '7%' }}>
                            <p style={{ fontSize: '1.5em' }}>Hiện không có địa chỉ nào !</p>
                        </div>}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <ModalDetailProduct dataDetail={dataDetail} />
                            </Box>
                        </Modal>
                    </Grid>
                </Box>
                <Stack sx={{ mt: 8 }} alignItems="center">
                    <Pagination
                        sx={{ button: { color: '#ffffff', width: '100%', margin: 'auto' } }} showFirstButton showLastButton
                        count={count} page={page} color="secondary" onChange={handleChange} />
                </Stack>
            </Box>
        </React.Fragment>
    )
}

export default TableAddress