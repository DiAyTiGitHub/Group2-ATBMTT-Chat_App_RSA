import { Grid } from '@mui/material';
import { observer } from 'mobx-react';
import React, { memo } from 'react';
import { useStore } from 'src/stores';
import RequestItem from './RequestItem';

function AddFriendRequests() {
    const { accountStore } = useStore();
    const { addFriendRequests } = accountStore;

    return (
        <div className="p-3">
            <h4>My Add Friend Requests</h4>
            <Grid container spacing={2}>
                {addFriendRequests.map(function (request, index) {
                    return (
                        <RequestItem request={request} key={index} />
                    );
                })}

            </Grid>
        </div>
    );
}

export default memo(observer(AddFriendRequests));