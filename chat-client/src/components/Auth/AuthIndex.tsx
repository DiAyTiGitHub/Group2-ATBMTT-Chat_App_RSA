import React, { memo } from 'react';
import { useStore } from 'src/stores';

function AuthIndex() {
    const { authStore } = useStore();
    // const {
    //     handleUsername,
    //     registerUser,
    //     userData
    // } = authStore;
    console.log(authStore);

    return (
        <div className="register">
            {/* <input
                id="user-name"
                placeholder="Enter your name"
                name="userName"
                value={userData?.username}
                onChange={handleUsername}
            />
            <button type="button" onClick={registerUser}>
                connect
            </button> */}
        </div>
    );
}

export default memo(AuthIndex);