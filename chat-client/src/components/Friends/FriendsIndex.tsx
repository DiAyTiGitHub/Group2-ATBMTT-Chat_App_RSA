import React, { memo, useEffect } from "react";
import LocalStorage from "src/common/LocalStorage";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material'; // Import components from '@mui/material' instead of '@mui/core'
import * as Yup from 'yup';

function FriendsIndex() {
    const navigate = useNavigate();
    useEffect(function () {
        if (!LocalStorage.getLoginUser()) {
            toast.info("You haven't logged in yet! Please login first!");
            navigate("/");
        }
    }, []);

    const initialValues = {
        keyword: ''
    };

    const validationSchema = Yup.object().shape({

    });

    const { friendsStore } = useStore();
    const { searchUserByKeyword, usersList, allUsers } = friendsStore;

    const handleSubmit = (values: any, props: any) => {
        console.log("chekcing values :", values);
        searchUserByKeyword(values.keyword)
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {
                props.setSubmitting(false);
            });

    };

    useEffect(function () {
        allUsers();
    }, []);

    return (
        <Grid container spacing={2} className="p-4">
            <Grid item xs={12} sm={4} md={3}>
                <div className="appCard p-3">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {(props) => (
                            <Form autoComplete='off' className="p-0 m-0">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            label="Keyword for searching"
                                            name="keyword"
                                            placeholder="Enter keyword for searching..."
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={props.isSubmitting}
                                            fullWidth
                                            className="display-block"
                                        >
                                            {props.isSubmitting ? 'Loading' : 'Search'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
                <div className="appCard p-3">
                    <Grid container spacing={2}>
                        {
                            usersList.map(function (user, index) {
                                return (
                                    <Grid item xs={12} key={index}>
                                        {user.username}
                                    </Grid>
                                );
                            })
                        }
                    </Grid>

                </div>
            </Grid>
        </Grid>
    );
}

export default memo(observer(FriendsIndex));