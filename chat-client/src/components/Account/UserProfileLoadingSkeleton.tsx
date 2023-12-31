import { Skeleton } from "@mui/material";
import { observer } from "mobx-react";
import React, { memo } from "react";

export function AvatarLoadingSkeleton() {
    return (
        <>
            <Skeleton animation="wave" variant="circular" width={150} height={150} className="pr-3 mt-3" />
            <Skeleton animation="wave" variant="text" width={145} height={40} className="mt-2 px-4" />
        </>
    );
}
export function InfoLoadingSkeleton() {
    return (
        <>
            <Skeleton animation="wave" variant="circular" width={150} height={150} className="pr-3 mt-3" />
            <Skeleton animation="wave" variant="text" height={35} className="mt-2 w-80 px-4" />
        </>
    );
}

//  memo(observer(AvatarLoadingSkeleton));