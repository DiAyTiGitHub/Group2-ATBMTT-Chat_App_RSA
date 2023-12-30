import { Skeleton } from "@mui/material";
import { observer } from "mobx-react";
import React, { memo } from "react";

function LoadingSkeleton() {
    return (
        <>
            <Skeleton animation="wave" variant="circular" width={150} height={150} className="pr-3 mt-3" />
            <Skeleton animation="wave" variant="text" height={35} className="mt-2 w-100 px-4" />
            <Skeleton animation="wave" variant="text" height={35} className="w-100 px-4" />
            <Skeleton animation="wave" variant="text" height={50} className="w-100 px-4" />
        </>
    );
}

export default memo(observer(LoadingSkeleton));