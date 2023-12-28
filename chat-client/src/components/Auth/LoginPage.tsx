import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material'; // Import components from '@mui/material' instead of '@mui/core'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Import icons from '@mui/icons-material'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useStore } from 'src/stores';
import LoginIcon from '@mui/icons-material/Login';
import { toast } from 'react-toastify';

function LoginPage({ handleChangeTab, navigate }: any) {
    const paperStyle = { padding: 20, margin: 'auto 0px', borderRadius: '0px 0px 15px 15px' };
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
                toast.dismiss();
                toast.success("Successfully generating keys for conversations!");
                toast.info("Decrypting old messages in conversations!");
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
                <Grid className='flex-center pb-5'>
                    <Avatar style={avatarStyle} className='mr-2'>
                        <LockOutlinedIcon />
                    </Avatar>
                    <div className='flex-center'>
                        <h2 className='m-0'>Log In</h2>
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
                                        className='flex-center'
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        disabled={props.isSubmitting}
                                        style={btnstyle}
                                        fullWidth
                                    >
                                        <LoginIcon className='mr-2' />
                                        <h6 className='m-0 flex-center'>
                                            {props.isSubmitting ? 'Loading' : 'Log in'}
                                        </h6>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                <Typography className="flex-center">
                    {`Do you have an account? `}
                    <Link href="#" onClick={() => handleChangeTab('event', 1)} className="ml-1">
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
};

export default LoginPage;
