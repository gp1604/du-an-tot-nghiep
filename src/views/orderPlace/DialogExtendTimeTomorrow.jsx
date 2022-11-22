import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { API_EXTEND_TIME } from 'utils/const';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';

function DialogExtendTime({ openConfirm, handleCloseConfirm, idSave, extendTime }) {
    return (
        <React.Fragment>
            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Xác nhận gia hạn thêm thời gian chờ"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn chắc chắn muốn gia hạn thêm thời gian chờ cho đơn hàng có id
                        <span style={{ color: 'red' }}> {idSave} </span>
                        đến hết  <span style={{ color: 'blue', fontWeight: '600' }}>ngày mai</span> ?
                        Lưu ý: sau khi chấp nhận không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Hủy</Button>
                    <Button onClick={e => {
                        handleCloseConfirm()
                        extendTime(idSave)
                    }} autoFocus>
                        Chấp nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default DialogExtendTime