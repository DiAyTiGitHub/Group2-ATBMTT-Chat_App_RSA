import React, { useCallback, useState } from "react";
import { useObserver } from 'mobx-react';
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

const UserProfile: React.FC = () => {
    const { userStore } = useStore();

    const [values, setValues] = useState({
        avatar: '',
        fullName: 'Hoàng Vương',
        userName: 'Nathan',
        address: 'Hà Nội',
        gender: 'Male',
        birthDate: '25/10/2002'
    });

    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        }, []
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
        }, []
    );

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
                                        src={values.avatar}
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
                                        {values.userName}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        {values.address}
                                    </Typography>
                                </Box>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Button
                                    fullWidth
                                    variant="text"
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
                                <Button variant="contained">
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