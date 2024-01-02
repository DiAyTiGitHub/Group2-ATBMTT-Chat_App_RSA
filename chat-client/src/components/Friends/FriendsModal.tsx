import FriendsIndex from "./FriendsIndex";
import { memo, useState } from "react";
import { observer } from "mobx-react";
import { Typography, Box, Modal, Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useStore } from 'src/stores';
import LocalStorage from 'src/common/LocalStorage';

function FriendsModal(props: any) {
    const MY_USER_ID = LocalStorage.getLoginUser()?.username;
    const { friendsStore } = useStore();
    const { usersList, currentFriends } = friendsStore;
    const { open, handleClose } = props;
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
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
                { 
                    !usersList.filter(user => user.username != MY_USER_ID).filter((user1 =>  !currentFriends.some(user2 => user1.id == user2.id))) ?
                        <FriendsIndex></FriendsIndex>
                    :   <Typography variant="h4" sx={{textAlign: "center", p: 10, lineHeight: 2, fontWeight: 500}}>There's no one to discover here :(( </Typography>
                }
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