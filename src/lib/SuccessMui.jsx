import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function SuccessMui() {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert anchorOrigin variant="outlined" onClose={() => { }}>This is a success alert — check it out!</Alert>

        </Stack>
    );
}