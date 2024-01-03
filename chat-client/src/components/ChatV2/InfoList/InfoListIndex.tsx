import React, { memo, useState, useEffect } from "react";
import Toolbar from "../Toolbar/Toolbar";
import Popup from "../Popup/Popup";
import './InfoListStyles.scss';
import { observer } from "mobx-react";
import { useStore } from "src/stores";
import InfoListLoadingSkeleton from "./InfoListLoadingSkeleton";
import CustomizeChatIndex from "./CustomizeChatAccordion/CustomizeChatIndex";
import ParticipantIndex from "./ParticipantAccordion/ParticipantIndex";
import OtherActionsIndex from "./OtherActionsAccordion/OtherActionsIndex";
import { Accordion } from "@mui/material";
import InfoListModal from "./InfoListModal";

function InfoList() {
    const { chatStore, accountStore, authStore } = useStore();
    const [openModal, setOpenModal] = useState(false);
    const {
        chosenRoom,
        isLoading,
    } = chatStore;

    const { currentLoginUser } = authStore;

    const { getAvatarSrc } = accountStore;

    function renderDescription() {
        if (!chosenRoom) return "No info";
        if (!chosenRoom?.description || chosenRoom?.description.length === 0 || chosenRoom?.description.trim() === '') {
            return "";
        }
        return chosenRoom.description;
    }

    function renderRoomName() {
        if (!chosenRoom) return "No info";
        if (!chosenRoom?.name || chosenRoom?.name.length === 0 || chosenRoom?.name.trim() === '') {
            const currentUser = currentLoginUser;
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
            const currentUser = currentLoginUser;
            let chattingPerson = null;
            for (let i = 0; i < chosenRoom?.participants.length; i++) {
                const participant = chosenRoom?.participants[i];
                if (participant.id !== currentUser.id) {
                    chattingPerson = participant;
                    break;
                }
            }
            if (chattingPerson && chattingPerson.avatar && chattingPerson.avatar != "") {
                const imageSrcPromise = getAvatarSrc(chattingPerson.avatar);
                imageSrcPromise.then(function (data) {
                    setImagePath(data);
                })
            }
        }
    }

    useEffect(renderAvatar, [chosenRoom]);

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChangeStateAccordion =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
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
                                <div className="info-description"> {renderDescription()} </div>
                                <div className="w-100" style={{ backgroundColor: "#f4f7ff" }}>
                                    <div className="flex-center w-100 p-1">
                                        <CustomizeChatIndex expanded={expanded} handleChangeStateAccordion={handleChangeStateAccordion} />
                                    </div>

                                    <div className="flex-center w-100 participants-container position-relative p-1">
                                        <ParticipantIndex expanded={expanded} handleChangeStateAccordion={handleChangeStateAccordion} />
                                    </div>

                                    {
                                        !(chosenRoom?.roomType?.name === "private") && (
                                            <div className="flex-center w-100 p-1">
                                                <OtherActionsIndex expanded={expanded} handleChangeStateAccordion={handleChangeStateAccordion} />
                                            </div>
                                        )
                                    }
                                </div>

                            </>
                        )}
                    </>
                )}
            </div>
            {openModal && (
                <InfoListModal
                    open={openModal}
                    handleClose={function () {
                        setOpenModal(false);
                    }}
                />
            )}
        </>
    )
}

export default memo(observer(InfoList));