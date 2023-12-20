import React, { useState, memo, useEffect } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import LoginPage from "./LoginPage";
import Signup from "./SignUpPage";
import { useNavigate } from "react-router";
import { observer } from "mobx-react";
import { useStore } from "src/stores";

// Import your Login and Signup components here

function AuthIndex() {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  const handleChangeTab = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const paperStyle = { width: 340, margin: "0px auto", backgroundImage: `url('https://marketplace.canva.com/EAD2962NKnQ/2/0/400w/canva-rainbow-gradient-pink-and-purple-virtual-background-LrNk7fAXxw8.jpg')` };
  // const backgroundStyle = {background: 'https://marketplace.canva.com/EAD2962NKnQ/2/0/400w/canva-rainbow-gradient-pink-and-purple-virtual-background-LrNk7fAXxw8.jpg' };


  function TabPanel(props: any) {
    const { children, value, index, ...other } = props;
    const { chatStore } = useStore();
    const { setStompClient } = chatStore;

    useEffect(function () {
      setStompClient(null);
    }, []);

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex-center w-100 p-0 m-0 flex-1"
      style={{ background: `url('https://marketplace.canva.com/EAD2962NKnQ/2/0/400w/canva-rainbow-gradient-pink-and-purple-virtual-background-LrNk7fAXxw8.jpg')`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}
    >
      <Paper elevation={20} style={paperStyle}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={handleChangeTab}
          aria-label="disabled tabs example"
        >
          <Tab label="Sign In" style={{ borderRadius: '15px 0px 0px 0px' }} />

          <Tab label="Sign Up" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <LoginPage
            navigate={navigate}
            handleChangeTab={handleChangeTab}
          />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Signup
            navigate={navigate}
            handleChangeTab={handleChangeTab}
          />
        </TabPanel>
      </Paper>
    </div>
  );
}

export default memo(observer(AuthIndex));

//old auth index
// function AuthIndex() {
//   const { authStore } = useStore();
//   const {
//       registerUser,
//       userData,
//       setUserData
//   } = authStore;

//   function handleUsername(event: any) {
//       const { value } = event.target;
//       const newData = { ...userData, "username": value };
//       console.log("cahnging");
//       setUserData(newData);
//   }

//   useEffect(function () {
//       console.log("user data changed: " + userData);
//   }, [userData]);

//   console.log("checking userData: " + userData);

//   return (
//       <div className="register">
//           {userData?.connected && (
//               <>
//                   Bạn đã có tài khoản! Quay lại tab chat để trải nghiệm
//               </>
//           )}
//           {!userData?.connected && (
//               <>
//                   <input
//                       id="user-name"
//                       placeholder="Enter your name"
//                       name="username"
//                       onChange={handleUsername}
//                       value={userData.username}
//                   />
//                   <button type="button" onClick={registerUser}>
//                       connect
//                   </button>
//               </>
//           )}
//       </div>
//   );
// }
