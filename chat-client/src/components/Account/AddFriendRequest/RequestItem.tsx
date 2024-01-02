import React, { memo, useEffect, useState } from "react";
import { observer, useObserver } from "mobx-react";
import { useStore } from "src/stores";
import { Grid, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router";
import SendIcon from '@mui/icons-material/Send';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { toast } from "react-toastify";

function RequestItem(props: any) {
    const { request } = props;
    const { requestSender } = request;

    const { accountStore, friendsStore } = useStore();
    const {
        getAvatarSrc,
        setIsLoading: setPageLoading,
        getAllFriends
    } = accountStore;
    const {
        acceptFriend,
    } = friendsStore;

    const navigate = useNavigate();

    const [imagePath, setImagePath] = useState('https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg');
    useEffect(function () {
        if (requestSender && requestSender.avatar && requestSender.avatar != "") {
            const imageSrcPromise = getAvatarSrc(requestSender.avatar);
            imageSrcPromise.then(function (data) {
                setImagePath(data);
            })
        }
    }, []);

    const [isLoading, setIsLoading] = useState(false);
    async function handleAcceptAddFriendRequest() {
        setIsLoading(true);
        console.log("clicked: ", request);
        await acceptFriend(request);
        setIsLoading(false);

        setPageLoading(true);
        await getAllFriends();
        setPageLoading(false);
    }

    return (
        <Grid item xs={12} sm={3}>
            <div className="friendBlock">
                <img src={imagePath} alt="user image" className="object-cover" />
                <div className="friendInfo">
                    <h6 className="friendName">
                        {requestSender?.fullname ? (
                            <>
                                {requestSender?.username} - ' ' {requestSender?.fullname}
                            </>
                        ) : (
                            <>{requestSender?.username}</>
                        )}
                    </h6>
                    <div className="buttonContainer">
                        <Button
                            fullWidth
                            className="pointer mb-2"
                            onClick={() => navigate(`/user-profile?userId=${requestSender?.id}`)}
                            type="button"
                            disabled={isLoading}
                        >
                            <PermContactCalendarIcon className="mr-2" />
                            View Profile
                        </Button>
                        <Button
                            fullWidth
                            className="pointer"
                            onClick={handleAcceptAddFriendRequest}
                            disabled={isLoading}
                            type="button"
                        >
                            <SendIcon className="mr-2" />
                            Accept Request
                        </Button>
                    </div>
                </div>
            </div>
        </Grid>
    );
};

export default memo(observer(RequestItem));
