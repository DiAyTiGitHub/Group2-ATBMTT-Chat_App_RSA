import { observer } from "mobx-react";
import React, { memo, useEffect, useState } from "react";
import { Modal, Box, List, Typography, TextField, Button } from '@mui/material';
import { useStore } from "src/stores";
import ChooseUserItem from "./ChooseUserItem";
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from "react-toastify";
import FaceBookCircularProgress from "src/common/FaceBookCircularProgress";

function GroupConversationCreator(props: any) {
    const { open, handleClose } = props;
    const { friendsStore, chatStore } = useStore();
    const { allFriends, currentFriends } = friendsStore;
    const { createGroupChat } = chatStore;

    const [isLoading, setIsLoading] = useState(true);
    useEffect(function () {
        setIsLoading(true);
        allFriends()
            .finally(function () {
                setIsLoading(false);
            })
    }, []);

    const [conversationName, setConversationName] = useState("");
    function handleChangeConversationName(event: any) {
        const { value } = event.target;
        setConversationName(value);
    }

    async function handleCreateNewGroupChat() {
        setIsUpdating(true);
        toast.info("Please await! We're handling your requirement");

        const sendData = {
            name: conversationName,
            joinUserIds: joinUserIds
        };
        if (sendData.joinUserIds.length < 2) {
            toast.info("Please choose at least 2 other people to use this feature");
            setIsUpdating(false);
            return;
        }

        const data = await createGroupChat(sendData);

        toast.success("Create group chat " + data.name + " successfully");

        setIsUpdating(false);
        handleClose();

    }

    const [joinUserIds, setJoinUserIds] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='modal-container w-80'>
                <div className="modalContainer flex-center justify-between">
                    <Typography variant='h5' sx={{ fontWeight: 800 }}>Create new group chat</Typography>
                    <Button
                        className="m-0 p-2 br-50p mw-unset"
                        onClick={function () {
                            handleClose();
                        }}
                    >
                        <ClearIcon
                        />
                    </Button>
                </div>

                <TextField
                    id="standard-basic"
                    label="Enter new conversation name..."
                    variant="standard"
                    onChange={handleChangeConversationName}
                    value={conversationName}
                    className="w-100 py-1"
                />

                <List dense className="w-100 flex-center flex-column">
                    {isLoading && (
                        <FaceBookCircularProgress />
                    )}

                    {!isLoading && (
                        <>
                            {currentFriends.map((user, index) => {
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
                        </>
                    )}

                </List>

                <div className='flex-center justify-right mt-2'>
                    <Button
                        variant="contained"
                        onClick={function () {
                            handleClose();
                        }}
                        className="mr-2"
                        disabled={isUpdating}

                    >
                        <ClearIcon
                            className="mr-2"
                        />
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleCreateNewGroupChat}
                        disabled={isUpdating}
                    >
                        <SendTimeExtensionIcon
                            className="mr-2"
                        />
                        Confirm
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default memo(observer(GroupConversationCreator));