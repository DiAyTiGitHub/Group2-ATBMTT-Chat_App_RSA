import { observer } from 'mobx-react';
import React from 'react';

function UserItem({ userInfo }: any) {
    console.log(userInfo);

    function handleClickAddFriend() {
        console.log('clicked');
    }

    return (
        <div className="appCard flex w-100 br-10 pointer userItem over-hidden">
            <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="user image"
                className='w-auto h-88 br-50p'
            />
            <div className="userItemContent flex-1 p-3">
                <h6 className="p-0 m-0">
                    {userInfo?.fullname ? (
                        <>{userInfo?.fullname} - ' ' {userInfo?.username}</>
                    ) : (
                        <>{userInfo?.username}</>
                    )}
                </h6>

            </div>
            <div className="userItemAction flex-center flex-column p-3">
                <button className='br-10' onClick={handleClickAddFriend}>
                    <h6 className='p-0 m-0'>
                        Kết bạn
                    </h6>
                </button>
            </div>
        </div>
    );

}

export default React.memo(observer(UserItem));