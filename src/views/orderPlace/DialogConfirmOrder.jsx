import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

function DialogConfirmOrder({ openConfirmOrder, handleCloseConfirmOrder, idSave, confirmOrder }) {
    return (
        <React.Fragment>
            <Dialog
                open={openConfirmOrder}
                onClose={handleCloseConfirmOrder}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Xác nhận đơn hàng"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn chắc chắn muốn chấp nhận duyệt cho đơn hàng có id
                        <span style={{ color: 'red' }}> {idSave} </span> ?
                      <p>  Lưu ý: sau khi chấp nhận không thể hoàn tác.</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmOrder}>Hủy</Button>
                    <Button onClick={e => {
                        handleCloseConfirmOrder()
                        confirmOrder(idSave)
                    }} autoFocus>
                        Chấp nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default DialogConfirmOrder