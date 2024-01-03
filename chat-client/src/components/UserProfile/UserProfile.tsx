import React, { memo, useEffect, useState } from "react";
import { observer, useObserver } from 'mobx-react';
import { useStore } from 'src/stores';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid,
    Avatar,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    styled,
    Skeleton
} from '@mui/material';
import { AvatarLoadingSkeleton, InfoLoadingSkeleton } from './UserProfileLoadingSkeleton'
import { is } from "date-fns/locale";

const UserProfile: React.FC = ({ }: any) => {
    const { accountStore, userProfileStore } = useStore();
    const {
        getAvatarSrc,
    } = accountStore;
    const {
        viewingProfile,
        isLoading
    } = userProfileStore;

    const [imagePath, setImagePath] = useState("");

    console.log("viewProfile: ", viewingProfile);

    useEffect(function () {
        if (viewingProfile && viewingProfile?.avatar && viewingProfile.avatar != "") {
            const imageSrcPromise = getAvatarSrc(viewingProfile.avatar);
            imageSrcPromise.then(function (data) {
                setImagePath(data);
            })
        }
    }, []);

    return useObserver(() => (
        <>
            <Grid
                container
                spacing={0}
            >
                <Grid
                    xs={12}
                    md={4}
                    lg={3}
                >
                    <Card className="flex-center flex-column w-100 h-100">
                        {isLoading ? (
                            <AvatarLoadingSkeleton />
                            ) : (
                                <>
                                <h3 className=" mb-0">{viewingProfile?.username}'s Avatar</h3>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Avatar alt="" src={imagePath} variant="rounded" sx={{ width: '70%', height: 'auto', aspectRatio: '1/1', borderRadius: '10px' }} />
                                    </Box>
                                </CardContent>
                                <Divider />
                            </>
                        )}
                    </Card>
                </Grid>
                <Grid
                    xs={12}
                    md={8}
                    lg={9}
                >
                    <Card className="w-100 h-100">
                        {isLoading ? (
                            <div className="flex-center m-0">
                                <Skeleton animation="wave" variant="text" width={145} height={40} className="mt-2 px-4" />
                            </div>
                        ):(
                            <h3 className="flex-center m-0">{viewingProfile?.username}'s info</h3>
                        )}
                        {isLoading ? (
                            <InfoLoadingSkeleton/>
                        ) : (
                            <>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid xs={12} md={6}>
                                            <TextField
                                                name="username"
                                                label="username"
                                                fullWidth
                                                disabled
                                                value={viewingProfile?.username || ""}
                                            />
                                        </Grid>
                                        <Grid xs={12} md={6}>
                                            <TextField
                                                name="fullname"
                                                label="fullname"
                                                fullWidth
                                                disabled
                                                value={viewingProfile?.fullname || ""}
                                                placeholder="Not have yet"
                                            />
                                        </Grid>
                                        <Grid xs={12}>
                                            <TextField
                                                name="address"
                                                label="address"
                                                fullWidth
                                                disabled
                                                value={viewingProfile?.address || ""}
                                                placeholder="Not have yet"
                                            />
                                        </Grid>
                                        <Grid xs={12} md={6}>
                                            <h6>Gender:</h6>
                                            <RadioGroup
                                                row
                                                name="gender"
                                                value={(viewingProfile?.gender == null ? "" : (viewingProfile?.gender ? "1" : "0"))}
                                            >
                                                <FormControlLabel value={true} control={<Radio />} label="Male" disabled />
                                                <FormControlLabel value={false} control={<Radio />} label="Female" disabled />
                                            </RadioGroup>
                                        </Grid>
                                    </Grid>
                                </CardContent >
                                <Divider />
                            </>
                        )}
                    </Card >
                </Grid >
            </Grid >
        </>
    ));
};

export default memo(observer(UserProfile));