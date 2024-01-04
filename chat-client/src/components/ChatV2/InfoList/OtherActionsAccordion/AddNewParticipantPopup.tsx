import { observer } from "mobx-react";
import React, { memo, useEffect, useState } from "react";
import { Modal, Box, Typography, Button, List } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useStore } from "src/stores";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import ChooseUserItem from "../../ConversationList/ConversationSearch/GroupConversationCreator/ChooseUserItem";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FaceBookCircularProgress from "src/common/FaceBookCircularProgress";

function AddNewParticipantPopup(props: any) {
    const { open, handleClose } = props;
    const [isUpdating, setIsUpdating] = useState(false);
    const { chatStore } = useStore();
    const { chosenRoom, getListFriendNotInRoom, notJoinedFriends } = chatStore;
    const { addMultipleUsersIntoGroupChat } = chatStore;
    const [joinUserIds, setJoinUserIds] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(function () {
        setIsLoading(true);
        getListFriendNotInRoom()
            .finally(function () {
                setIsLoading(false);
            })
    }, []);

    async function handleConfirmLeave() {
        setIsUpdating(true);
        toast.info("Please await! We're handling your requirement");

        await addMultipleUsersIntoGroupChat(joinUserIds);

        toast.success("Your conversation have new users!");
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
                initialValues={{ name: chosenRoom?.name }}
                onSubmit={handleConfirmLeave}
            >
                {(props) => (
                    <Form autoComplete='off'>
                        <Box className='modal-container w-80 p-0 m-0' sx={{ border: 0, borderRadius: "10px" }}>
                            <div className="modalContainer flex-center justify-between appHeader" style={{ borderRadius: "10px 10px 0 0" }}>
                                <Typography className="p-3" variant='h5' sx={{ fontWeight: 800, color: "#fff" }}>Add new participants</Typography>
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
                                {isLoading && (
                                    <FaceBookCircularProgress />
                                )}

                                {!isLoading && (
                                    <List dense sx={{ width: '100%' }}>
                                        {(!notJoinedFriends || notJoinedFriends.length <= 0) && (
                                            <div className="flex-center w-100">
                                                <p className="p-0 m-0 w-100 text-center">All your friends have joined this conversation! Let's get more friends</p>
                                            </div>
                                        )}

                                        {notJoinedFriends.map((user: any, index: number) => {
                                            const labelId = `checkbox-list-secondary-label-${index}`;

                                            return (
                                                <ChooseUserItem
                                                    key={index}
                                                    labelId={labelId}
                                                    user={user}
                                                    joinUserIds={joinUserIds}
                                                    setJoinUserIds={setJoinUserIds}
                                                />
                                            );
                                        })}
                                    </List>
                                )}
                            </div>

                            <div className='flex-center justify-right p-3 '>
                                <Button
                                    variant="contained"
                                    onClick={function () {
                                        handleClose();
                                    }}
                                    className="mr-2 flex-center"
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
                                    className="flex-center"
                                    type="submit"
                                >
                                    <GroupAddIcon
                                        className="mr-2"
                                    />
                                    Add new participants
                                </Button>
                            </div>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Modal >
    );
}

export default memo(observer(AddNewParticipantPopup));