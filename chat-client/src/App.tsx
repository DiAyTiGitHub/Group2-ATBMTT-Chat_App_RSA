import ChatRoom from './components/Chatroom';
import Header from './layouts/Header/Header';
import { Route, Routes} from 'react-router-dom';
import routes from 'src/RootRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route> */}
          {routes.map(function (route) {
            const { path, element } = route;

            return <Route path={path} element={element} />;
          })}
        </Routes>
        <Header />
        <ChatRoom />
      </BrowserRouter>

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
  )
}

export default App;

