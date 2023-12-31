import React, { useCallback, useEffect, useState } from "react";
import { useObserver } from 'mobx-react';
import { useStore } from 'src/stores';
import LocalStorage from 'src/common/LocalStorage';
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
    styled
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Field, Form, Formik } from "formik";
import { AvatarLoadingSkeleton, InfoLoadingSkeleton } from "./UserProfileLoadingSkeleton";

const UserProfile: React.FC = ({ }: any) => {
    const { accountStore, authStore } = useStore();
    const {
        uploadUserAvatar,
        getAvatarSrc,
        updateUserInfo,
        // isLoading
    } = accountStore;
    const isLoading = true;
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
    }

    function handleFormSubmit(values: any) {
        console.log("form values: ", values);
        updateUserInfo(values);
    }

    const [imagePath, setImagePath] = useState("");

    const currentUser = LocalStorage.getLoginUser();

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
        if (currentLoginUser && currentLoginUser.avatar && currentLoginUser.avatar != "" && currentLoginUser) {
            const imageSrcPromise = getAvatarSrc(currentLoginUser.avatar);
            imageSrcPromise.then(function (data) {
                setImagePath(data);
            })
        }
    }, []);

    return useObserver(() => (
        <Formik
            initialValues={currentLoginUser || currentUser}
            onSubmit={handleFormSubmit}
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
                                                    <Avatar alt="" src={imagePath} sx={{ width: '70%', height: 'auto', aspectRatio: '1/1' }} />
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
                                                            value={values.username || ""}
                                                        />
                                                    </Grid>
                                                    <Grid xs={12} md={6}>
                                                        <TextField
                                                            name="fullname"
                                                            label="fullname"
                                                            fullWidth
                                                            value={values.fullname || ""}
                                                            placeholder="Not have yet"
                                                            onChange={change.bind(null, "fullname")}
                                                        />
                                                    </Grid>
                                                    <Grid xs={12}>
                                                        <TextField
                                                            name="address"
                                                            label="address"
                                                            fullWidth
                                                            value={values.address || ""}
                                                            placeholder="Not have yet"
                                                            onChange={change.bind(null, "address")}
                                                        />
                                                    </Grid>
                                                    {/* <Grid xs={12} md={6}>
                                                    <h6>Gender:</h6>
                                                    <div className="flex">
                                                        <div className="optionRadio flex-center">
                                                            <input
                                                                type="radio"
                                                                name="gender"
                                                                value="1"
                                                                checked={values.gender === "1"}
                                                                onChange={() => setFieldValue("gender", "1")}
                                                            />
                                                            <h6 className="m-0 ml-2">
                                                                Male
                                                            </h6>
                                                        </div>
    
                                                        <div className="optionRadio flex-center ml-3">
                                                            <input
                                                                type="radio"
                                                                name="gender"
                                                                value="0"
                                                                checked={values.gender === "0"}
                                                                onChange={() => setFieldValue("gender", "0")}
                                                            />
                                                            <h6 className="m-0 ml-2">
                                                                Female
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </Grid> */}
                                                    <Grid xs={12} md={6}>
                                                        <h6>Gender:</h6>
                                                        <RadioGroup
                                                            row
                                                            name="gender"
                                                            value={values.gender || ""}
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

    ));
};

export default UserProfile;