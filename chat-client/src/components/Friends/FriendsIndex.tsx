import React, { memo, useEffect, useMemo, useState } from "react";
import LocalStorage from "src/common/LocalStorage";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Grid, TextField, Button, Card, Modal, Typography, Grow, IconButton } from '@mui/material'; // Import components from '@mui/material' instead of '@mui/core'
import * as Yup from 'yup';
import UserItem from "./UserItem";
import Carousel from "react-material-ui-carousel";
import SearchIcon from '@mui/icons-material/Search';

function FriendsIndex() {
    const MY_USER_ID = LocalStorage.getLoginUser()?.username;
    const { friendsStore, authStore } = useStore();
    const {
        searchUserByKeyword,
        usersList,
        allUsers,
        getAddFriendRequests,
        getPendingFriendRequests,
        allFriends,
        addFriendUsers,
        pendingFriendUsers,
    } = friendsStore;
    const {
        currentLoginUser
    } = authStore;
    const [expanded, setExpanded] = useState(false);
    
    const navigate = useNavigate();

    useEffect(function () {
        if (!currentLoginUser) {
        // if (!LocalStorage.getLoginUser()) {
            toast.info("You haven't logged in yet! Please login first!");
            navigate("/");
        }
        else {
            allFriends();
            getAddFriendRequests();
            getPendingFriendRequests();
            allUsers();
        }
    }, []);

    const initialValues = {
        keyword: ''
    };

    const validationSchema = Yup.object().shape({

    });

    // console.log(addFriendUsers, pendingFriendUsers)

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

    const toggleIconClick =() => {
        expanded==true ? setExpanded(false) : setExpanded(true);
    }

    return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {(props) => (
                    <Form autoComplete='off' className="p-0 m-0">
                        {/* <Grid container spacing={2} className="p-0 m-0 px-4">
                            <Grid item xs={12} sm={4} md={3}>
                                <div className="appCard \\
                                
                                
                                p-3">

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

                                </div>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9}>
                                <div className="appCard p-3 ">
                                    <Grid container spacing={2} className="m-0 p-0 w-100">
                                        {
                                            props?.values?.keyword.trim() == "" && (
                                                <h5 className="p-0 m-0">All available users </h5>
                                            )
                                        }
                                        <Carousel sx={{width: "200px"}}> 
                                        {
                                            // usersList.map(function (user, index) {
                                            //     return (
                                            //         <Grid item xs={12} key={index} className="p-0 m-0 w-100 py-2">
                                            //             <UserItem userInfo={user} />
                                            //         </Grid>
                                            //     );
                                            // })
                                            usersList.filter((user) => user.username != MY_USER_ID).map((user, index) => (<UserItem key={index} userInfo={user}></UserItem>))
                                        }
                                        </Carousel>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid> */
                        <>
                            <div className="d-flex mb-5" style={{width: "300px", margin: "auto"}}>
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Discover people around you!</Typography>
                                <div className="d-flex">
                                <Grow in={expanded} timeout={500}>
                                    <div>
                                        <Field
                                            as={TextField}
                                            label="Find someone"
                                            name="keyword"
                                            placeholder="Find someone"
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={props.isSubmitting}
                                            fullWidth
                                            className="display-block"
                                            sx={{marginTop: "5px"}}
                                        >
                                            {props.isSubmitting ? 'Loading' : 'Search'}
                                        </Button>
                                    </div>
                                </Grow>
                                    <IconButton
                                        disableFocusRipple={true}
                                        disableRipple={true}
                                        onClick={toggleIconClick}
                                    >
                                        <SearchIcon fontSize="large" />
                                    </IconButton>
                                </div>
                            </div>
                            
                            <Carousel sx={{width: "300px", mx: "auto"}} 
                                autoPlay={false}
                                stopAutoPlayOnHover={false}
                                indicators={false}
                                animation="slide"
                                duration={500}
                            > 
                            {
                                // usersList.map(function (user, index) {
                                //     return (
                                //         <Grid item xs={12} key={index} className="p-0 m-0 w-100 py-2">
                                //             <UserItem userInfo={user} />
                                //         </Grid>
                                //     );
                                // })
                                usersList.filter((user) => user.username != MY_USER_ID).map((user, index) => (<UserItem key={index} userInfo={user}></UserItem>))
                            }
                            </Carousel>
                        </>
                        }
                    </Form>
                )}
            </Formik>
    );
}

export default memo(observer(FriendsIndex));