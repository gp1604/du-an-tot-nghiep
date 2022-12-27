import React from 'react'
import ReactLoading from 'react-loading';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function Loading({ loading }) {
    return (
        <Modal
            open={loading}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    display: 'flex',
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100vh",
                    // borderRadius: "10px"
                }}
            >
                <ReactLoading type="spinningBubbles" color="#ffffff" height={"5%"} width={"5%"} />
            </Box>

        </Modal>

    )
}
