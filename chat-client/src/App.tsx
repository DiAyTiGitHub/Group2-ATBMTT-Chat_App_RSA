import React from 'react';
import ChatRoom from './components/Chatroom';
import { useRoutes } from 'react-router-dom';
import routes from './RootRouter';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ThemeProvider from './theme/ThemeProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './common/CommonStyles.scss';
import './index.css';

function App() {
  const content = useRoutes(routes);

  return (
    <>
      <ChatRoom />

      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <>
            {/* <CssBaseline /> */}
            {content}
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  )
}

export default App;

