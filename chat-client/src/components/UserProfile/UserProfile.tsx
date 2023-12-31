import React, { memo, useEffect, useState } from "react";
import { observer, useObserver } from 'mobx-react';
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
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    styled
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Field, Form, Formik } from "formik";

const UserProfile: React.FC = ({ }: any) => {
    const { accountStore, userProfileStore } = useStore();
    const {
        getAvatarSrc,
    } = accountStore;
    const { viewingProfile } = userProfileStore;

    const [imagePath, setImagePath] = useState("");

    useEffect(function () {
        if (viewingProfile && viewingProfile?.avatar && viewingProfile.avatar != "") {
            const imageSrcPromise = getAvatarSrc(viewingProfile.avatar);
            imageSrcPromise.then(function (data) {
                setImagePath(data);
            })
        }
    }, []);

    return useObserver(() => (
        <>
            {console.log(viewingProfile)}
        </>
    ));
};

export default memo(observer(UserProfile));