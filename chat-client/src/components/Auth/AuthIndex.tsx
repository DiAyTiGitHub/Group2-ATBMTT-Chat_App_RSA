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
import './AuthStyles.scss';

function AuthIndex() {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  const handleChangeTab = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const paperStyle = { width: 340, margin: "0px auto", backgroundImage: `url('https://marketplace.canva.com/EAD2962NKnQ/2/0/400w/canva-rainbow-gradient-pink-and-purple-virtual-background-LrNk7fAXxw8.jpg')` };

  function TabPanel(props: any) {
    const { children, value, index, ...other } = props;
    const { chatStore, authStore } = useStore();
    
    const {
      stompClient: chatStompClient,
      setStompClient: chatSetStompClient,
      disconnectStompClient: disconnectStompClientFromChatStore
    } = chatStore;
    const {
      stompClient: authStompClient,
      setStompClient: authSetStompClient,
      disconnectStompClient: disconnectStompClientFromAuthStore
    } = authStore;

    useEffect(function () {
      if (chatStompClient) {
        disconnectStompClientFromChatStore();
        chatSetStompClient(null);
      }
      if (authStompClient) {
        disconnectStompClientFromAuthStore();
        authSetStompClient(null);
      }

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
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex-center w-100 p-0 m-0 flex-1 authIndexStyle"
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