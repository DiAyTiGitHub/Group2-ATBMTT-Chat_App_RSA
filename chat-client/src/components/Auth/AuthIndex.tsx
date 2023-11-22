import React, { memo, useEffect } from 'react';
import { useStore } from 'src/stores';
import { observer } from 'mobx-react';

function AuthIndex() {
    const { authStore } = useStore();
    const {
        registerUser,
        userData,
        setUserData
    } = authStore;

    function handleUsername(event: any) {
        const { value } = event.target;
        const newData = { ...userData, "username": value };
        console.log("cahnging");
        setUserData(newData);
    }

    useEffect(function () {
        console.log("user data changed: " + userData);
    }, [userData]);

    console.log("checking userData: " + userData);

    return (
        <div className="register">
            {userData?.connected && (
                <>
                    Bạn đã có tài khoản! Quay lại tab chat để trải nghiệm
                </>
            )}
            {!userData?.connected && (
                <>
                    <input
                        id="user-name"
                        placeholder="Enter your name"
                        name="username"
                        onChange={handleUsername}
                        value={userData.username}
                    />
                    <button type="button" onClick={registerUser}>
                        connect
                    </button>
                </>
            )}
        </div>
    );
}

export default (observer(AuthIndex));