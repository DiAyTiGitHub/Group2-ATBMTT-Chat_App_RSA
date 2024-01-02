import { memo, useState, useEffect } from "react";
import Toolbar from "../Toolbar/Toolbar";
import Popup from "../Popup/Popup";
import './InfoList.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { observer } from "mobx-react";
import { useStore } from "src/stores";
import LocalStorage from "src/common/LocalStorage";
import InfoListLoadingSkeleton from "./InfoListLoadingSkeleton";

function InfoList() {
    const { chatStore, accountStore } = useStore();

    const {
        chosenRoom,
        isLoading
    } = chatStore;

  const { getAvatarSrc } = accountStore;

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

    const [imagePath, setImagePath] = useState('https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg');

    function renderAvatar() {
        if (chosenRoom?.participants && chosenRoom?.participants.length > 0 && chosenRoom?.participants.length === 2) {
          const currentUser = LocalStorage.getLoginUser();
          let chattingPerson = null;
          for (let i = 0; i < chosenRoom?.participants.length; i++) {
            const participant = chosenRoom?.participants[i];
            if (participant.id !== currentUser.id) {
              console.log("Avt người dùng khác: " + participant.avatar);
              chattingPerson = participant;
              break;
            }
        }
        if (chattingPerson && chattingPerson.avatar && chattingPerson.avatar != "") {
            const imageSrcPromise = getAvatarSrc(chattingPerson.avatar);
            imageSrcPromise.then(function (data) {   
                console.log("Data: "+data);
                       
              setImagePath(data);
            })
          }
        }
    }
    
    useEffect(renderAvatar,[])
    
    return (
        <div className="info-list d-lg-flex">
            <Toolbar title="Info"></Toolbar>
            {isLoading ? (
                <InfoListLoadingSkeleton />
            ) : (
                <>
                    {!chosenRoom && (
                        <div className="no-info">
                            <p>No conversation chosen</p>
                        </div>
                    )}
                    {chosenRoom && (
                        <>
                            <img className="info-photo" src={imagePath} alt=""></img>
                            <div className="info-name"> {renderRoomName()} </div>
                            <div className="info-icons">
                                <IconButton>
                                    <AccountCircleIcon />
                                </IconButton>
                            </div>
                            <Popup title="test title" content="lorem ipsum something something" confirmation="true"></Popup>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default memo(observer(InfoList));