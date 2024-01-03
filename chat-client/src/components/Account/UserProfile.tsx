import React, { memo, useEffect, useState } from "react";
import { observer } from 'mobx-react';
import { useStore } from 'src/stores';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    TextField,
    Unstable_Grid2 as Grid,
    Avatar,
    RadioGroup,
    FormControlLabel,
    Radio,
    styled
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Field, Form, Formik } from "formik";
// import { AvatarLoadingSkeleton, InfoLoadingSkeleton } from "./UserProfileLoadingSkeleton";
import { AvatarLoadingSkeleton, InfoLoadingSkeleton } from "./UserProfileLoadingSkeleton";
import { toast } from "react-toastify";
import UpdateIcon from '@mui/icons-material/Update';

const UserProfile: React.FC = ({ }: any) => {
    const { accountStore, authStore } = useStore();
    const {
        uploadUserAvatar,
        getAvatarSrc,
        updateUserInfo,
        getCurrentUser,
        currentUser,
        isLoading
    } = accountStore;

    const { currentLoginUser, setCurrentLoginUser } = authStore;
    async function handleChangeImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            const imageSrc = await uploadUserAvatar(img);
            setImagePath(imageSrc);
            setCurrentLoginUser({
                ...currentLoginUser,
                avatar: imageSrc
            });
        }
        else {
            toast.error("Invalid avatar to set file");
        }
    }

    async function handleFormSubmit(values: any) {
        const res = updateUserInfo(values);
        setCurrentLoginUser(res);
    }

    const [imagePath, setImagePath] = useState("");
    
    // const currentUser = LocalStorage.getLoginUser();
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    

    useEffect(function () {
        if (currentLoginUser && currentLoginUser.avatar && currentLoginUser.avatar != "") {
            const imageSrcPromise = getAvatarSrc(currentLoginUser.avatar);
            imageSrcPromise.then(function (data) {
                setImagePath(data);
            })
        }
        getCurrentUser();
    }, []);

    return (
        <Formik
            initialValues={currentUser}
            onSubmit={handleFormSubmit}
            enableReinitialize
        >
            {({ values, handleChange, setFieldTouched, setFieldValue }) => {
                const change = (name: any, e: any) => {
                    e.persist();
                    handleChange(e);
                    setFieldTouched(name, true, false);
                };

                return (
                    <Form autoComplete='off'>
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
                                    <h3 className="mb-0">Avatar</h3>
                                    {isLoading ? (
                                        <AvatarLoadingSkeleton />
                                    ) : (
                                        <>
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
                                            <Button className="mb-2" component="label" variant="contained" startIcon={<CloudUploadIcon />} onChange={handleChangeImage}>
                                                Upload file
                                                <VisuallyHiddenInput type="file" />
                                            </Button>
                                            {/* <CardActions className="flex-1 display-none">
                                            <input type="file" name="avatar" onChange={handleChangeImage} />
                                        </CardActions> */}
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
                                    <h3 className="flex-center m-0">Your info</h3>
                                    {isLoading ? (
                                        <InfoLoadingSkeleton />
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
                                                            value={values?.username || ""}
                                                        />
                                                    </Grid>
                                                    <Grid xs={12} md={6}>
                                                        <TextField
                                                            name="fullname"
                                                            label="fullname"
                                                            fullWidth
                                                            value={values?.fullname || ""}
                                                            placeholder="Not have yet"
                                                            onChange={change.bind(null, "fullname")}
                                                        />
                                                    </Grid>
                                                    <Grid xs={12}>
                                                        <TextField
                                                            name="address"
                                                            label="address"
                                                            fullWidth
                                                            value={values?.address || ""}
                                                            placeholder="Not have yet"
                                                            onChange={change.bind(null, "address")}
                                                        />
                                                    </Grid>
                                                    <Grid xs={12} md={6}>
                                                        <h6>Gender: {(values?.gender == null ? "" : (values?.gender ? "Male" : "Female"))}</h6>
                                                        <RadioGroup
                                                            row
                                                            name="gender"
                                                            value={values?.gender || ""}
                                                            onChange={handleChange}
                                                        >
                                                            <FormControlLabel value="1" control={<Radio />} label="Male" />
                                                            <FormControlLabel value="0" control={<Radio />} label="Female" />
                                                        </RadioGroup>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                            <CardActions className="w-100 flex justify-right">
                                                <Button variant="contained" type="submit">
                                                    <UpdateIcon className="mr-2" />
                                                    Save details
                                                </Button>
                                            </CardActions>
                                            <Divider />
                                        </>
                                    )}
                                </Card>
                            </Grid>
                        </Grid >
                    </Form >
                );
            }}
        </Formik >

    );
};

export default memo(observer(UserProfile));