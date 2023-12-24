import { memo } from "react";
import Toolbar from "../Toolbar/Toolbar";
import Popup from "../Popup/Popup";
import './InfoList.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { observer } from "mobx-react";
import { useStore } from "src/stores";
import LocalStorage from "src/common/LocalStorage";

function InfoList() {
    const { chatStore } = useStore();

    const {
        chosenRoom
    } = chatStore;

    console.log(chosenRoom);

    function renderRoomName() {
        if (!chosenRoom) return "No info";
        if (!chosenRoom?.name || chosenRoom?.name.length === 0 || chosenRoom?.name.trim() === '') {
            const currentUser = LocalStorage.getLoginUser();
            for (let i = 0; i < chosenRoom.participants.length; i++) {
                const participant = chosenRoom.participants[i];
                if (participant.id !== currentUser.id) {
                    return "Conversation with " + participant.username;
                }
            }
            return "No name conversation";
        }
        return chosenRoom.name;
    }

    function renderAvatar() {
        if (!chosenRoom || !chosenRoom?.avatar || chosenRoom?.avatar.trim() === '') {
            return "https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg";
        }
        return chosenRoom?.avatar;
    }

    return (
        <div className="info-list d-lg-flex">
            {!chosenRoom && (
                <div className="no-info">
                    <p>No conversation chosen</p>
                </div>
            )}
            {chosenRoom && (
                <>
                    <Toolbar title="Info"></Toolbar>
                    <img className="info-photo" src={renderAvatar()} alt=""></img>
                    <div className="info-name"> {renderRoomName()} </div>
                    <div className="info-icons">
                        <IconButton>
                            <AccountCircleIcon />
                        </IconButton>
                    </div>
                    <Popup title="test title" content="lorem ipsum something something" confirmation="true"></Popup>
                </>
            )}
        </div>
    )
}

export default memo(observer(InfoList));