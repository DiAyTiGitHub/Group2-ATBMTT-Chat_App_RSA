import { Button, Container, Grid, Typography } from '@mui/material';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer/FooterIndex';
import PageTitleWrapper from 'src/components/PageTitleWrapper/PageTitleWrapperIndex';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import EthnicsTable from './EthnicsTable';
import CommonTable from 'src/common/CommonTable';

function EthnicsIndex() {
    const user = {
        name: 'Catherine Pike',
        avatar: '/static/images/avatars/1.jpg'
    };

    return (
        <>
            <Helmet>
                <title>Ethnics - Management</title>
            </Helmet>
            <Grid container spacing="2">
                <Grid item xs={12}>
                    <PageTitleWrapper>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Typography variant="h3" component="h3" gutterBottom>
                                    Ethnics
                                </Typography>
                                <Typography variant="subtitle2">
                                    {user.name}, these are your ethnics data
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    sx={{ mt: { xs: 2, md: 0 } }}
                                    variant="contained"
                                    startIcon={<AddTwoToneIcon fontSize="small" />}
                                >
                                    Create ethnic
                                </Button>
                            </Grid>
                        </Grid>
                    </PageTitleWrapper>
                </Grid>
                <Grid item xs={12} className='flex-grow-1'>
                    <Container maxWidth="lg">
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="stretch"
                            spacing={3}
                        >
                            <Grid item xs={12}>
                               <CommonTable data={[]}/>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Footer />
                </Grid>
            </Grid>
        </>
    );
}

export default memo(EthnicsIndex);