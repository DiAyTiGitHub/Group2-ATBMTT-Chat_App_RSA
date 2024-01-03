import { observer } from "mobx-react";
import React, { memo, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useStore } from "src/stores";
import LogoutIcon from '@mui/icons-material/Logout';
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";

function ChangeConversationNamePopup(props: any) {
    const { open, handleClose } = props;

    const { chatStore } = useStore();
    const { chosenRoom, updateRoomInfo } = chatStore;

    const [isUpdating, setIsUpdating] = useState(false);
    async function handleChangeConversationTheme(values: any) {
        setIsUpdating(true);
        toast.info("Please await! We're updating this conversation");

        await updateRoomInfo(values);
        // console.log("submit values: ", values)
        toast.success("This conversation is updated!");
        setIsUpdating(false);
        handleClose();
    }

    console.log("chosenRoom: ", chosenRoom)


    return (

        <Modal
            className="max-z-index"
            open={open}
            onClose={handleClose}
        >
            <Formik
                initialValues={{ color: chosenRoom?.color }}
                onSubmit={handleChangeConversationTheme}
            >
                {(props) => (
                    <Form autoComplete='off'>
                        <Box className='modal-container w-80 p-0 m-0' sx={{ border: 0, borderRadius: "10px" }}>
                            <div className="modalContainer flex-center justify-between appHeader" style={{ borderRadius: "10px 10px 0 0" }}>
                                <Typography className="p-3" variant='h5' sx={{ fontWeight: 800, color: "#fff" }}>Change conversation's theme</Typography>
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
                                <Field
                                    as={TextField}
                                    label="New conversation theme"
                                    name="color"
                                    placeholder="Enter new conversation theme"
                                    fullWidth
                                    required
                                    disabled={isUpdating}
                                />
                            </div>

                            <div className='flex-center justify-right p-3'>
                                <Button
                                    variant="contained"
                                    onClick={function () {
                                        handleClose();
                                    }}
                                    disabled={isUpdating}
                                >
                                    <ClearIcon
                                        className=""
                                    />
                                    Cancel
                                </Button>

                                <Button
                                    variant="contained"
                                    color="success"
                                    disabled={isUpdating}
                                    className="ml-2"
                                    type="submit"
                                >
                                    <LogoutIcon
                                        className="mr-2"
                                    />
                                    Update
                                </Button>
                            </div>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Modal >
    );
}

export default memo(observer(ChangeConversationNamePopup));
