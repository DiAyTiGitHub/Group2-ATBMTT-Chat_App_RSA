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
            <div className="flex">
                <Skeleton animation="wave" variant="text" height={50} className="m-2 w-50 px-4" />
                <Skeleton animation="wave" variant="text" height={50} className="m-2 w-50 px-4" />
            </div>
            <Skeleton animation="wave" variant="text" height={50} className="m-2 w-90 px-4" />
            <Skeleton animation="wave" variant="text" height={35} className="m-2 w-90 px-4" />
            <Skeleton animation="wave" variant="text" height={35} className="m-2 w-90 px-4" />
            <div className="flex justify-right">
                <Skeleton animation="wave" variant="text" width={145} height={40} className="mr-2 px-4" />
            </div>
        </>
    );
}

//  memo(observer(AvatarLoadingSkeleton));