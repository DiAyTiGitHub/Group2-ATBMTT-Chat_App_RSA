import { observer } from "mobx-react";
import React, { memo, useEffect, useState } from "react";
import { Modal, Box, List, Typography, TextField, Button } from "@mui/material";
import { useStore } from "src/stores";
import ChooseUserItem from "./ChooseUserItem";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";
import "./GroupConversationCreator.css";
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

  const [isUpdating, setIsUpdating] = useState(false);
  async function handleCreateNewGroupChat() {
    setIsUpdating(true);
    setIsLoading(true);

    const sendData = {
      name: conversationName,
      joinUserIds: joinUserIds,
    };

    if (sendData.joinUserIds.length < 2) {
      toast.info("Please choose at least 2 other people to use this feature");
      setIsUpdating(false);
      setIsLoading(false);
      return;
    }

    const data = await createGroupChat(sendData);
    toast.success("Create group chat " + data.name + " successfully");

    setIsUpdating(false);
    setIsLoading(false);
    handleClose();
  }

  const [joinUserIds, setJoinUserIds] = useState([]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-container w-80 ">
        <div
          className=" w-full flex-center justify-between p-3"
          style={{ background: "#0047ab", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
        >
          <div>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, color: "#fff" }}
            >
              Create new group chat
            </Typography>
          </div>
          <Button
            className="btnClose m-0 p-2 br-50p mw-unset"
            sx={{ color: "#fff" }}
            onClick={() => handleClose()}
          >
            <ClearIcon />
          </Button>
        </div>

        <div className="modal-container-content p-3">
          <TextField
            id="standard-basic"
            label="Enter new conversation name..."
            variant="standard"
            onChange={handleChangeConversationName}
            value={conversationName}
            className="w-100 py-1"
            disabled={isLoading || isUpdating}
          />

          <List dense sx={{ width: "100%" }} className="flex-column">
            {isLoading && (
              <div className="flex-center w-100">
                <FaceBookCircularProgress />
              </div>
            )}

            {!isLoading && currentFriends.map((user, index) => {
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

          <div className="flex-center justify-right ">
            <Button
              variant="contained"
              onClick={function () {
                handleClose();
              }}
              className="mr-2"
              disabled={isUpdating}
            >
              <ClearIcon className="mr-2" />
              Cancel
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={handleCreateNewGroupChat}
              disabled={isUpdating}
            >
              <SendTimeExtensionIcon className="mr-2" />
              Confirm
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default memo(observer(GroupConversationCreator));
