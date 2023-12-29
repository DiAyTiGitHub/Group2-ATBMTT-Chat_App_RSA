import { Skeleton } from "@mui/material";
import { observer } from "mobx-react";
import { memo } from "react";

function LoadingSkeleton() {
    return (
        <>
            <div className="flex align-center">
                <Skeleton animation="wave" variant="circular" width={40} height={40} className="ml-1" />
                <Skeleton animation="wave" variant="text" width={100} height={40} className="ml-2" />
            </div>
            <div className="flex justify-right">
                <Skeleton animation="wave" variant="text" width={140} height={40} className="mr-2" />
            </div>
            <div className="flex">
                <Skeleton animation="wave" variant="circular" width={40} height={40} className="ml-1" />
                <div className="display-block">
                    <Skeleton animation="wave" variant="text" width={400} height={40} className="ml-2" />
                    <Skeleton animation="wave" variant="text" width={400} height={80} className="ml-2" />
                </div>
            </div>
            <div className="flex justify-right">
                <Skeleton animation="wave" variant="text" width={400} height={80} className="mr-2" />
            </div>
            <div className="flex align-center">
                <Skeleton animation="wave" variant="circular" width={40} height={40} className="ml-1" />
                <Skeleton animation="wave" variant="text" width={190} height={40} className="ml-2" />
            </div>
            <div className="flex justify-right">
                <Skeleton animation="wave" variant="text" width={400} height={120} className="mr-2" />
            </div>
            <div className="flex">
                <Skeleton animation="wave" variant="circular" width={40} height={40} className="ml-1" />
                <div className="display-block">
                    <Skeleton animation="wave" variant="text" width={400} height={40} className="ml-2" />
                    <Skeleton animation="wave" variant="text" width={400} height={80} className="ml-2" />
                </div>
            </div>
            <div className="flex justify-right">
                <Skeleton animation="wave" variant="text" width={400} height={40} className="mr-2" />
            </div>
        </>
        
    );
}

export default memo(observer(LoadingSkeleton));