import { Skeleton } from "@mui/material";
import { observer } from "mobx-react";
import React, { memo } from "react";

function LoadingSkeleton() {
    return (
        <>
            <Skeleton animation="wave" variant="circular" width={150} height={150} className="pr-3 mt-3" />
            <Skeleton animation="wave" variant="text" width={100} height={35} className="mt-2" />
            <Skeleton animation="wave" variant="text" width={50} height={35} />
            <Skeleton animation="wave" variant="text" width={120} height={50} />
        </>
    );
}

export default memo(observer(LoadingSkeleton));