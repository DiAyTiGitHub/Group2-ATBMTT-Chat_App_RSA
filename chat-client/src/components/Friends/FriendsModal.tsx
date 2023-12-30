import FriendsIndex from "./FriendsIndex";
import { memo, useState } from "react";
import { observer } from "mobx-react";
import { Typography, Box, Modal, Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
function FriendsModal(props: any) {
    const {open, handleClose} = props;
    console.log(props);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
      
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={{...style}}>
                <FriendsIndex></FriendsIndex>
                <div className="d-flex justify-content-end mt-5">
                    <Button
                        variant="contained"
                        onClick={function () {
                            handleClose();
                        }}
                        className="mr-2"
                    >
                        <ClearIcon
                            className="mr-2"
                        />
                        Close
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default memo(observer(FriendsModal));