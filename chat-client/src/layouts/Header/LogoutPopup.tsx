import { observer } from "mobx-react";
import React, { memo } from "react";
import { Modal, Box, List, Typography, TextField, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import { useStore } from "src/stores";
import { useNavigate } from "react-router";

function LogoutPopup(props: any) {
    const navigate = useNavigate();
    const { open, handleClose } = props;

    const { authStore } = useStore();
    const { currentLoginUser } = authStore;

    function handleLogout() {
        navigate("/");
    }

    return (
        <Modal
            className="max-z-index"
            open={open}
            onClose={handleClose}
        >
            <Box className='modal-container w-80'>
                <div className="modalContainer flex-center justify-between">
                    <Typography variant='h5' sx={{ fontWeight: 800 }}>CONFIRM</Typography>
                    <Button
                        className="m-0 p-2 br-50p mw-unset"
                        onClick={function () {
                            handleClose();
                        }}
                    >
                        <ClearIcon />
                    </Button>
                </div>

                <div className="flex-center w-100 p-4">
                    <h5>
                        Are you sure you want to log out of account {currentLoginUser?.usename}
                    </h5>
                </div>

                <div className='flex-center justify-right mt-2'>
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
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleLogout}
                    >
                        <SendTimeExtensionIcon
                            className="mr-2"
                        />
                        Log out
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default memo(observer(LogoutPopup));