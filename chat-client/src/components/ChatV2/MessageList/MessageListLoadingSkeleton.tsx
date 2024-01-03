import { Skeleton, Stack } from "@mui/material";
import { observer } from "mobx-react";
import { memo } from "react";

function LoadingSkeleton() {
    return (
        <>
            <div className="flex align-center mt-4">
                <Skeleton animation="wave" variant="circular" width={50} height={50} className="ml-1" />
                <Skeleton animation="wave" variant="rounded" width={150} height={40} className="ml-2 mt-1 br-4" />
            </div>
            <div className="flex justify-right">
                <Skeleton animation="wave" variant="rounded" width={140} height={50} className="mr-2 mt-3 br-4" />
            </div>
            <div className="flex">
                <Skeleton animation="wave" variant="circular" width={50} height={50} className="ml-1" />
                <div className="display-block">
                    <Skeleton animation="wave" variant="rounded" width={500} height={50} className="ml-2 mt-1 brtl-4 brtr-4 brbr-4" />
                    <Skeleton animation="wave" variant="rounded" width={500} height={80} className="ml-2 mt-1 brtr-4 brbr-4 brbl-4"/>
                </div>
            </div>
            <div className="flex justify-right">
                <Skeleton animation="wave" variant="rounded" width={400} height={80} className="mr-2 mt-3 br-4"/>
            </div>
            <div className="flex align-center">
                <Skeleton animation="wave" variant="circular" width={50} height={50} className="ml-1 mt-1" />
                <Skeleton animation="wave" variant="rounded" width={190} height={40} className="ml-2 mt-1 br-4"/>
            </div>
            <div className="flex justify-right">
                <Skeleton animation="wave" variant="rounded" width={400} height={120} className="mr-2 mt-3 br-4"/>
            </div>
            <div className="flex">
                <Skeleton animation="wave" variant="circular" width={50} height={50} className="ml-1" />
                <div className="display-block">
                    <Skeleton animation="wave" variant="rounded" width={400} height={40} className="ml-2 mt-1 brtl-4 brtr-4 brbr-4"/>
                    <Skeleton animation="wave" variant="rounded" width={450} height={80} className="ml-2 mt-1 brtr-4 brbr-4"/>
                    <Skeleton animation="wave" variant="rounded" width={400} height={60} className="ml-2 mt-1 brtr-4 brbr-4 brbl-4"/>
                </div>
            </div>
            <div className="flex justify-right">
                <Skeleton animation="wave" variant="rounded" width={400} height={40} className="mr-2 mt-3 br-4"/>
            </div>
            <div className="flex">
                <Skeleton animation="wave" variant="circular" width={50} height={50} className="ml-1" />
                <div className="display-block">
                    <Skeleton animation="wave" variant="rounded" width={400} height={40} className="ml-2 mt-1 brtl-4 brtr-4 brbr-4" />
                    <Skeleton animation="wave" variant="rounded" width={400} height={80} className="ml-2 mt-1 brtr-4 brbr-4 brbl-4"/>
                </div>
            </div>
        </>

    );
}

export default memo(observer(LoadingSkeleton));