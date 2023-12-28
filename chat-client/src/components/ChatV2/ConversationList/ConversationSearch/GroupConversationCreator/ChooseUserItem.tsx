import { observer } from "mobx-react";
import React, { memo, useEffect, useState } from "react";
import { ListItem, ListItemAvatar, ListItemButton, ListItemText, Checkbox, Avatar } from '@mui/material';
import { useStore } from "src/stores";

function ChooseUserItem(props: any) {
    const { labelId, user, joinUserIds, setJoinUserIds } = props;

    const { accountStore } = useStore();
    const { getAvatarSrc } = accountStore;

    const [imagePath, setImagePath] = useState(user?.avatar);
    useEffect(function () {
        if (user && user.avatar && user.avatar != "") {
            const imageSrcPromise = getAvatarSrc(user.avatar);
            imageSrcPromise.then(function (data) {
                setImagePath(data);
            })
        }
    }, []);

    function handleChangeJoinUserIds() {
        const currentUserId = user.id;
        if (joinUserIds.includes(currentUserId)) {
            let newJoinUserIds = joinUserIds.filter((userId: string) => userId !== currentUserId);
            newJoinUserIds = [...newJoinUserIds];
            setJoinUserIds(newJoinUserIds);
            return;
        }

        joinUserIds.push(currentUserId);
        const newJoinUserIds = [...joinUserIds];
        setJoinUserIds(newJoinUserIds);
    }

    return (
        <ListItem
            className="p-0"
            secondaryAction={
                <Checkbox
                    edge="end"
                    onChange={handleChangeJoinUserIds}
                    checked={joinUserIds.includes(user.id)}
                    inputProps={{ 'aria-labelledby': labelId }}
                />
            }
            disablePadding
        >
            <ListItemButton
                className="p-0 py-2"
            >
                <ListItemAvatar>
                    <Avatar
                        alt=''
                        src={imagePath}
                    />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={user.username} color='black' />
            </ListItemButton>
        </ListItem>
    );
}

export default memo(observer(ChooseUserItem));