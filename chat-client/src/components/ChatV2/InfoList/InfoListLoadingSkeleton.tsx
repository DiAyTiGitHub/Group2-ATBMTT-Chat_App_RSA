import { Skeleton } from "@mui/material";
import { observer } from "mobx-react";
import React, { memo } from "react";

function LoadingSkeleton() {
    return (
        <Skeleton animation="wave" variant="circular" width={120} height={120} className="pr-3" />
    );
}

export default memo(observer(LoadingSkeleton));