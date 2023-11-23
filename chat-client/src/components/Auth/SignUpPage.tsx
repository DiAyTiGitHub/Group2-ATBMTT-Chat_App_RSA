import React, { memo } from 'react';
import { Link, Grid, Paper, Avatar, Typography, TextField, Button, Checkbox, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material'; // Import components from '@mui/material' instead of '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'; // Import icons from '@mui/icons-material'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormHelperText } from '@mui/material';

import { useStore } from 'src/stores';
import { observer } from 'mobx-react';

function SignUpUser({ navigate, handleChangeTab }: any) {
    const paperStyle = { padding: 20, margin: '0 auto', borderRadius: '0px 0px 15px 15px' };
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    const { authStore } = useStore();
    const { signUpUser } = authStore;

    const initialValues = {
        username: '',
        password: '',
        passwordConfirm: '',
        remember: false,
    };

    const validationSchema = Yup.object().shape({
        // username: Yup.string().email('please enter a valid email').required('Required'),
        username: Yup.string().required("This field is required").nullable(),
        password: Yup.string().required('This field is Required').min(6, 'Enter at least 6 characters'),
        passwordConfirm: Yup.string().required('This field is Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const onSubmit = (values: any, props: any) => {
        signUpUser(values)
            .then(() => {
                handleChangeTab('event', 0);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                props.setSubmitting(false);
            })
    };

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid container spacing={2} className='flex-center'>
                    <Grid item xs={12} className='flex-center'>
                        <Avatar style={avatarStyle} className='mr-2'>
                            <AddCircleOutlineOutlinedIcon />
                        </Avatar>
                        <div>
                            <Typography style={headerStyle}><h2>Sign Up</h2> </Typography>
                        </div>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            {(props: any) => (
                                <Form>
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
                                            <Field
                                                as={TextField}
                                                label="Confirm Password"
                                                name="passwordConfirm"
                                                placeholder="confirm password"
                                                type="password"
                                                fullWidth
                                                required
                                            // helperText={<ErrorMessage name="passwordConfirm" />}
                                            />
                                            <div style={{ color: 'red' }}>
                                                <ErrorMessage name="passwordConfirm" />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={FormControlLabel}
                                                name="remember"
                                                control={<Checkbox color="primary" />}
                                                label="Remember me"
                                            />
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
                                                {props.isSubmitting ? 'Loading' : 'Sign Up'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                        <Typography className="flex-center">
                            {`Already have an account? `}
                            <Link href="#" onClick={() => handleChangeTab('event', 0)}>
                                Sign In
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper >
        </Grid >
    );
};

export default memo(observer(SignUpUser));
