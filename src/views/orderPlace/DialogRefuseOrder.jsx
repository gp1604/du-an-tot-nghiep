import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

function DialogRefuseOrder({ openRefuseOrder, handleCloseRefuseOrder, idSave, refuseOrder }) {
    return (
        <React.Fragment>
            <Dialog
                open={openRefuseOrder}
                onClose={handleCloseRefuseOrder}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Xác nhận hủy đơn hàng"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn chắc chắn muốn hủy đơn hàng có id
                        <span style={{ color: 'red' }}> {idSave} </span> này không ?
                        <p>  Lưu ý: sau khi xác nhận không thể hoàn tác.</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRefuseOrder}>Hủy</Button>
                    <Button onClick={e => {
                        handleCloseRefuseOrder()
                        refuseOrder(idSave)
                    }} autoFocus>
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default DialogRefuseOrder