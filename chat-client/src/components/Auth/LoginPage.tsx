import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material'; // Import components from '@mui/material' instead of '@mui/core'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Import icons from '@mui/icons-material'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useStore } from 'src/stores';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

function LoginPage({ handleChangeTab, navigate }: any) {
    const paperStyle = { padding: 20, margin: 'auto 0px', borderRadius: '0px 0px 15px 15px' };
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    const initialValues = {
        username: '',
        password: '',
        remember: false,
    };

    const validationSchema = Yup.object().shape({
        // username: Yup.string().email('please enter a valid email').required('Required'),
        username: Yup.string().required("This field is required").nullable(),
        password: Yup.string().required('This field is required'),
    });

    const { authStore, chatStore } = useStore();
    const { authenticateUser } = authStore;

    const onSubmit = (values: any, props: any) => {
        authenticateUser(values)
            .then(function () {
                navigate("/chat-v2");
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {
                props.setSubmitting(false);
            });

    };

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid className='flex-center' style={{ paddingBottom: '20px' }}>
                    <Avatar style={avatarStyle} className='mr-2'>
                        <LockOutlinedIcon />
                    </Avatar>
                    <div>
                        <Typography style={headerStyle}>
                            <h2>Sign In</h2>
                        </Typography>
                    </div>
                </Grid>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {(props) => (
                        <Form autoComplete='off'>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        label="Username"
                                        name="username"
                                        placeholder="Enter username"
                                        fullWidth
                                        required
                                    />
                                    <div style={{ color: 'red' }}>
                                        <ErrorMessage name="username" />
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        label="Password"
                                        name="password"
                                        placeholder="Enter password"
                                        type="password"
                                        fullWidth
                                        required
                                    />
                                    <div style={{ color: 'red' }}>
                                        <ErrorMessage name="password" />
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        disabled={props.isSubmitting}
                                        style={btnstyle}
                                        fullWidth
                                    >
                                        {props.isSubmitting ? 'Loading' : 'Sign in'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                <Typography className="flex-center">
                    <Link href="#">Forgot password?</Link>
                </Typography>
                <Typography className="flex-center">
                    {`Do you have an account? `}
                    <Link href="#" onClick={() => handleChangeTab('event', 1)}>
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
};

export default LoginPage;
