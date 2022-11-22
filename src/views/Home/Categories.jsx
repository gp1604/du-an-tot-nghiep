import { Box } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Nav } from 'reactstrap';
import { API_GET_ALL_CATEGORY } from 'utils/const';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CategoryIcon from '@mui/icons-material/Category';
function Categories() {

    const [data, setData] = useState([]);
    const getAllCategories = async (e) => {
        const response = await axios.get(API_GET_ALL_CATEGORY)
        if (response) {
            setData(response.data)
        }
    }
    useEffect(() => {
        getAllCategories()
    }, [])


    return (
        <Box sx={{ width: '86%', margin: 'auto', borderRadius: "8px" }}>
            <div>
                <h2 style={{ margin: "8px 0px 10px 10px", color: 'white' }}>Danh mục </h2>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {
                        data.map((item, index) => (
                            <NavLink key={index} to={'/auth/categories/' + item.id} aria-label="main mailbox folders"
                                style={{ margin: "8px 10px 10px 0px" }}>
                                <Button variant="contained"
                                    sx={{
                                        width: '100%', maxWidth: 360,
                                        bgcolor: 'background.paper',
                                        '&:hover': {
                                            backgroundColor: '#87CEFA',
                                        },
                                    }}
                                >
                                    <ListItemIcon>
                                        <CategoryIcon />
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: "#333" }} primary={item.name} />
                                </Button>

                                <Divider />
                            </NavLink>
                        ))
                    }

                </div>
            </div >
        </Box >
    )
}

export default Categories