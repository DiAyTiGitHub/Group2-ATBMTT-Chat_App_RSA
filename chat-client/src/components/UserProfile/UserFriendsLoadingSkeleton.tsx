import { Skeleton } from "@mui/material";
import { observer } from "mobx-react";
import React, { memo } from "react";

function LoadingSkeleton() {
    return (
        <div className="flex-center flex-column ml-11">
            <Skeleton animation="wave" variant="rounded" width={400} height={240} className="pr-3 mt-3" />
            <Skeleton animation="wave" variant="text" width={400} height={40} className="mt-2 px-4" />
            <Skeleton animation="wave" variant="text" width={400} height={60} className="mt-2 px-4" />
        </div>
    );
}

export default memo(observer(LoadingSkeleton));