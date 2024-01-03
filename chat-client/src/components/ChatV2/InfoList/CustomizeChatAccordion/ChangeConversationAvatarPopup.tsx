import { observer } from "mobx-react";
import React, { memo, useState } from "react";
import { Modal, Box,Typography, TextField, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useStore } from "src/stores";
import LogoutIcon from '@mui/icons-material/Logout';
import { Field, Form, Formik } from "formik";

function ChangeConversationNamePopup(props: any) {
    const { open, handleClose } = props;

    const { chatStore } = useStore();
    const { chosenRoom } = chatStore;

    const [isUpdating, setIsUpdating] = useState(false);
    async function handleChangeConversationName() {
        setIsUpdating(true);



        setIsUpdating(false);
    }

    return (
        <Modal
            className="max-z-index"
            open={open}
            onClose={handleClose}
        >
            <Formik
                initialValues={{ name: chosenRoom?.name }}
                onSubmit={handleChangeConversationName}
            >
                {(props) => (
                    <Form autoComplete='off'>
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

                                <Field
                                    as={TextField}
                                    label="Conversation name"
                                    name="name"
                                    placeholder="Enter new conversation name"
                                    fullWidth
                                    required
                                    disabled={isUpdating}
                                />

                            </div>

                            <div className='flex-center justify-right m-2 '>
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
                                    className="mr-2"
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
