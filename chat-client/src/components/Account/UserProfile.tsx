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
    Typography
} from '@mui/material';
import { Form, Formik } from "formik";

const gender = [
    {
        value: "male",
        label: "Male"
    },
    {
        value: "female",
        label: "Female"
    },
];

const UserProfile: React.FC = ({ }: any) => {
    const { accountStore } = useStore();
    const { uploadUserAvatar, getAvatarSrc } = accountStore;

    async function handleChangeImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            const imageSrc = await uploadUserAvatar(img);
            setImagePath(imageSrc);
        }
    }

    function handleFormSubmit(values: any) {
        console.log("form values: ", values);
    }

    const currentUser = LocalStorage.getLoginUser();
    console.log(currentUser);
    const validationSchema = {};
    const [imagePath, setImagePath] = useState("");
    const initialValues = {};

    useEffect(function () {
        if (currentUser.avatar != "") {
            const imageSrcPromise = getAvatarSrc(currentUser.avatar);
            imageSrcPromise.then(function (data) {
                setImagePath(data);
            })
        }
    }, [])

    return useObserver(() => (
        <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
        >
            {(props) => (
                <Form autoComplete='off'>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            xs={12}
                            md={6}
                            lg={4}
                        >
                            <Card>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <h3>Avatar</h3>
                                        <img src={imagePath} alt="" className="userAvatar" />
                                    </Box>
                                </CardContent>
                                <Divider />
                                <CardActions>
                                    <input type="file" name="avatar" onChange={handleChangeImage} />
                                </CardActions>
                            </Card>
                        </Grid>
                        {/* <Grid
                    xs={24}
                    md={12}
                    lg={8}
                >
                    <Card>
                        <CardHeader
                            subheader="The information can be edited"
                            title="Profile"
                        />
                        <CardContent sx={{ pt: 0 }}>
                            <Box sx={{ m: -1.5 }}>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            helperText="Please specify the first name"
                                            label="Full name"
                                            name="fullName"
                                            onChange={handleChange}
                                            required
                                            value={values.fullName}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            label="User name"
                                            name="userName"
                                            onChange={handleChange}
                                            required
                                            value={values.userName}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            name="address"
                                            onChange={handleChange}
                                            required
                                            value={values.address}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Gender"
                                            name="gender"
                                            onChange={handleChange}
                                            required
                                            select
                                            SelectProps={{ native: true }}
                                            value={values.gender}
                                        >
                                            {gender.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            label="BirthDate"
                                            name="birthDate"
                                            onChange={handleChange}
                                            required
                                            value={values.birthDate}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                        <Divider />
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Button variant="contained" type="submit">
                                Save details
                            </Button>
                        </CardActions>
                    </Card>
                </Grid> */}
                    </Grid>
                </Form>
            )}
        </Formik>

    ));
};

export default UserProfile;