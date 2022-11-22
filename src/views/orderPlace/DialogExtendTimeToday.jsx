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

function DialogExtendTimeToday({ openConfirmToday, handleCloseConfirmToday, idSave, extendTimeToday }) {
    return (
        <React.Fragment>
            <Dialog
                open={openConfirmToday}
                onClose={handleCloseConfirmToday}
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
                        đến hết <span style={{color: 'blue',fontWeight: '600'}}>hôm nay</span> ?
                        Lưu ý: sau khi chấp nhận không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmToday}>Hủy</Button>
                    <Button onClick={e => {
                        handleCloseConfirmToday()
                        extendTimeToday(idSave)
                    }} autoFocus>
                        Chấp nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default DialogExtendTimeToday