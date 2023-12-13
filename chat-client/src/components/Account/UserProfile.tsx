import React, { useCallback, useState } from "react";
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
    const accountStore = useStore();

    const avatar = LocalStorage.getLoginUser()?.avatar;
    const username = LocalStorage.getLoginUser()?.username;
    const address = LocalStorage.getLoginUser()?.address;
    const [values, setValues] = useState({
        avatar: avatar,
        fullName: LocalStorage.getLoginUser()?.fullname,
        userName: username,
        address: address,
        gender: LocalStorage.getLoginUser()?.gender,
        birthDate: LocalStorage.getLoginUser()?.birthDate
    });

    const handleChange = (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        };

    const handleSubmit = (event) => {
        event.preventDefault();
        saveFormDataToJSON();
    };

    const saveFormDataToJSON = async () => {
        try {
            const formData = {
                avatar: values.avatar,
                fullName: values.fullName,
                userName: values.userName,
                address: values.address,
                gender: values.gender,
                birthDate: values.birthDate
            };
            console.log(formData);

            await accountStore.updateUserInfo(formData);

            console.log("User info updated successfully!");
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    return useObserver(() => (
        <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
        >
            {/* <div className="appCard p-3 m-3"> */}
            <Grid
                container
                spacing={3}
            >
                <Grid
                    xs={12}
                    md={6}
                    lg={4}
                >
                    {/* <div className="appCard p-3 m-3"> */}
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Avatar
                                    src={avatar}
                                    sx={{
                                        height: 80,
                                        mb: 2,
                                        width: 80
                                    }}
                                />
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                >
                                    {/* {LocalStorage.getLoginUser()?.userName}a */}
                                    {username}
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    variant="body2"
                                >
                                    {address}
                                </Typography>
                            </Box>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                fullWidth
                                variant="text"
                                onClick={() => { }}
                            >
                                Upload picture
                            </Button>
                        </CardActions>
                    </Card>
                    {/* </div> */}
                </Grid>
                <Grid
                    xs={24}
                    md={12}
                    lg={8}
                >
                    {/* <div className="appCard p-3 m-3"> */}
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
                                    {/* <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Select State"
                                    name="state"
                                    onChange={handleChange}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.state}
                                >
                                    {states.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid> */}
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
                    {/* </div> */}
                </Grid>
            </Grid>
            {/* </div> */}
        </form>
    ));
};

export default UserProfile;