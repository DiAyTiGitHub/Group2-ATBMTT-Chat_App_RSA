import { observer } from "mobx-react";
import React, { memo, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useStore } from "src/stores";
import LogoutIcon from '@mui/icons-material/Logout';
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { HexColorPicker } from "react-colorful";

function ChangeConversationNamePopup(props: any) {
    const { open, handleClose } = props;

    const { chatStore } = useStore();
    const { chosenRoom, updateRoomInfo } = chatStore;

    const [isUpdating, setIsUpdating] = useState(false);

    async function handleChangeConversationTheme(values: any) {
        setIsUpdating(true);
        toast.info("Please await! We're updating this conversation");
        console.log("submit values: ", values)

        await updateRoomInfo(values);

        toast.success("This conversation is updated!");
        setIsUpdating(false);
        handleClose();
    }

    return (

        <Modal
            className="max-z-index"
            open={open}
            onClose={handleClose}
        >
            <Formik
                initialValues={{ color: chosenRoom?.color || "#0047ab" }}
                onSubmit={handleChangeConversationTheme}
            >
                {({ values, setFieldValue }) => (
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
                            <div className="flex-center w-100 p-3 justify-left flex-column">
                                <HexColorPicker color={values?.color} onChange={function (newColor: any) {
                                    setFieldValue("color", newColor);
                                }} />

                                <div className="value" style={{ borderLeftColor: values?.color }}>
                                    <h5 className="m-0 pt-2" style={{ color: values?.color }}>
                                        Conversation's color will be "{values?.color}"
                                    </h5>
                                </div>
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
