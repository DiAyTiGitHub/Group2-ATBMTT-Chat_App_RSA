import { Tooltip } from "@mui/material";
import { observer } from "mobx-react";
import React, { memo, useEffect, useState } from "react";
import { useStore } from "src/stores";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ItemParticipant(props: any) {
    const { participant } = props;

    const [imagePath, setImagePath] = useState('https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg');

    const { accountStore } = useStore();
    const { getAvatarSrc } = accountStore;

    function renderAvatar() {
        if (participant && participant.avatar && participant.avatar != "") {
            const imageSrcPromise = getAvatarSrc(participant.avatar);
            imageSrcPromise.then(function (data: any) {
                setImagePath(data);
            })
        }
    }

    useEffect(renderAvatar, []);

    return (
        <div className="flex-center py-2 px-4 justify-left">
            <img className="participant-photo" src={imagePath} alt="" />
            <div className="participant-info flex-1">
                <h1 className="participant-title"></h1>
            </div>
            <div className="participant-timestamp">
                <Tooltip title='View this user profile' enterDelay={100} leaveDelay={100} arrow>
                    <AccountCircleIcon></AccountCircleIcon>
                </Tooltip>
            </div>
        </div>
    );
}

export default memo(observer(ItemParticipant));