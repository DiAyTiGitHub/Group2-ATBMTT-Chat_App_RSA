import { observer } from "mobx-react";
import React, { memo } from "react";
import { Modal, Box, List, Typography, TextField, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import { useStore } from "src/stores";
import { useNavigate } from "react-router";
import LocalStorage from "src/common/LocalStorage";
import LogoutIcon from '@mui/icons-material/Logout';

function InfoListModal(props: any) {
    const { open, handleClose } = props;

    return (
        <Modal
            className="max-z-index"
            open={open}
            onClose={handleClose}
        >
            <Box className='modal-container w-80 p-0 m-0' sx={{ border: 0, borderRadius: "10px" }}>
                <div className="modalContainer flex-center justify-between appHeader" style={{ borderRadius: "10px 10px 0 0" }}>
                    <Typography className="p-3" variant='h5' sx={{ fontWeight: 800, color: "#fff" }}>MODAL</Typography>
                    <Button
                        className="btnClose m-0 p-2 br-50p mw-unset"
                        sx={{ color: "#fff" }}
                        onClick={function () {
                            handleClose();
                        }}
                    >
                        <ClearIcon />
                    </Button>
                </div>

                <div className="flex-center w-100 p-3">
                    <h5>
                        hihi cuti
                    </h5>
                </div>

                <div className='flex-center justify-right m-2 '>
                    <Button
                        variant="contained"
                        onClick={function () {
                            handleClose();
                        }}
                        className=" "
                    >
                        <ClearIcon
                            className=""
                        />
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        className="mr-2"
                    >
                        <LogoutIcon
                            className="mr-2"
                        />
                        Confirm
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}
export default memo(observer(InfoListModal));