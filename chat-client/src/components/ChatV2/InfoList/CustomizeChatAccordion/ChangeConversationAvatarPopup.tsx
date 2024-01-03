import { observer } from "mobx-react";
import React, { memo, useState } from "react";
import { Modal, Box, Typography, Button, styled } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useStore } from "src/stores";
import LogoutIcon from '@mui/icons-material/Logout';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from "react-toastify";
import FaceBookCircularProgress from "src/common/FaceBookCircularProgress";

function ChangeConversationNamePopup(props: any) {
    const { open, handleClose } = props;

    const { chatStore } = useStore();
    const { uploadRoomAvatar } = chatStore;

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const [isUpdating, setIsUpdating] = useState(false);
    async function handleChangeImage(event: any) {
        setIsUpdating(true);

        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            toast.info("Conversation's avatar is handling, please wait...");
            await uploadRoomAvatar(img);
            toast.success("Successfully updated avatar");
        }
        else {
            toast.error("Invalid avatar to set file");
        }

        setIsUpdating(false);
    }

    return (
        <Modal
            className="max-z-index"
            open={open}
            onClose={handleClose}
        >
            <Box className='modal-container w-80 p-0 m-0' sx={{ border: 0, borderRadius: "10px" }}>
                <div className="modalContainer flex-center justify-between appHeader" style={{ borderRadius: "10px 10px 0 0" }}>
                    <Typography className="p-3" variant='h5' sx={{ fontWeight: 800, color: "#fff" }}>Update new photo for conversation</Typography>
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

                <div className="flex-center w-100 p-3 flex-column">
                    {isUpdating && (
                        <FaceBookCircularProgress />
                    )}

                    <Button
                        fullWidth
                        className="mt-2"
                        component="label"
                        variant="contained"
                        disabled={isUpdating}
                        startIcon={<CloudUploadIcon />}
                        onChange={handleChangeImage}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file" />
                    </Button>
                </div>
            </Box>
        </Modal >
    );
}

export default memo(observer(ChangeConversationNamePopup));
