import { observer } from "mobx-react";
import React, { memo, useEffect, useState } from "react";
import { Modal, Box, List, Typography, TextField, Button } from '@mui/material';
import { useStore } from "src/stores";
import ChooseUserItem from "./ChooseUserItem";
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from "react-toastify";

function GroupConversationCreator(props: any) {
    const { open, handleClose } = props;

    const { friendsStore, chatStore } = useStore();
    const { allFriends, currentFriends } = friendsStore;

    useEffect(function () {
        allFriends();
    }, []);

    const [conversationName, setConversationName] = useState("");
    function handleChangeConversationName(event: any) {
        const { value } = event.target;
        setConversationName(value);
    }

    function handleCreateNewGroupChat() {
        const sendData = {
            name: conversationName,
            joinUserIds: joinUserIds
        };
        if (sendData.joinUserIds.length < 2) {
            toast.info("Please choose at least 2 other people to use this feature");
            return;
        }
        console.log("checking send data...", sendData);

    }

    const [joinUserIds, setJoinUserIds] = useState([]);

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

                <List dense sx={{ width: '100%' }}>
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
                </List>

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
                        onClick={handleCreateNewGroupChat}
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