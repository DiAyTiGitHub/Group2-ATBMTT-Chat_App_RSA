import React, { memo, useEffect, useState } from "react";
import { observer, useObserver } from "mobx-react";
import { useStore } from "src/stores";
import { Grid, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router";
import SendIcon from '@mui/icons-material/Send';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

function FiendItemCard(props: any) {
    const { friend } = props;
    const { accountStore } = useStore();
    const { getAvatarSrc } = accountStore;
    const navigate = useNavigate();

    const [imagePath, setImagePath] = useState('https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg');
    useEffect(function () {
        if (friend && friend.avatar && friend.avatar != "") {
            const imageSrcPromise = getAvatarSrc(friend.avatar);
            imageSrcPromise.then(function (data) {
                setImagePath(data);
            })
        }
    }, [friend, friend?.id, friend?.avatar]);

    return (
        <Grid item xs={12} sm={3}>
            <div className="friendBlock">
                <img src={imagePath} alt="user image" className="object-cover" />
                <div className="friendInfo flex-column justify-between">
                    <h6 className="friendName flex-1 h-100">
                        {friend?.fullname ? (
                            <>
                                {friend?.username} - {friend?.fullname}
                            </>
                        ) : (
                            <>{friend?.username}</>
                        )}
                    </h6>
                    <div className="buttonContainer ">
                        <Button
                            fullWidth
                            className="pointer mb-2"
                            onClick={() => navigate(`/user-profile?userId=${friend?.id}`)}
                            type="button"
                        >
                            <PermContactCalendarIcon className="mr-2" />
                            View Profile
                        </Button>
                        <Button
                            fullWidth
                            className="pointer"
                            onClick={() => navigate("/chat")}
                            type="button"
                        >
                            <SendIcon className="mr-2" />
                            Send Message
                        </Button>
                    </div>
                </div>
            </div>
        </Grid>
    );
};

export default memo(observer(FiendItemCard));
