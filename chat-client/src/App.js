import React from 'react'
import ChatRoom from './components/Chatroom'

const App = () => {
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

