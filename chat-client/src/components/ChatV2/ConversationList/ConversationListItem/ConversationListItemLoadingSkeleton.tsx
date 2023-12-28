import { Skeleton } from "@mui/material";
import { observer } from "mobx-react";
import React, { memo } from "react";

function ConversationListItemLoadingComponent() {
    return (
        <div className="flex w-100 p-4">
            <Skeleton animation="wave" variant="circular" width={50} height={50} className="pr-3" />
            <div className="flex-center align-start flex-column w-100 pl-3">
                <Skeleton
                    animation="wave"
                    height={10}
                    width="50%"
                    style={{ marginBottom: 6 }}
                    variant="rectangular"
                    className="br-10"
                >
                    <div className="pt-3"></div>
                </Skeleton>
                <Skeleton
                    animation="wave"
                    height={10}
                    width="90%"
                    variant="rectangular"
                    className="br-10"
                >
                    <div className="pt-3"></div>
                </Skeleton>
            </div>
        </div>
    );
}

export default memo(observer(ConversationListItemLoadingComponent));