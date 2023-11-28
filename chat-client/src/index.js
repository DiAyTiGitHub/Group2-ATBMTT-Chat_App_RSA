import React from 'react';
import './index.css';
import App from './App';

import { createRoot } from 'react-dom/client';
import LocalStorage from './common/LocalStorage';
import AuthStore from './components/Auth/AuthStore';

//setup bearer token for axios before app is loaded
if(LocalStorage.getItem("jwt_token")){
    (new AuthStore()).setSession(LocalStorage.getItem("jwt_token"));
}

const root = document.getElementById('root');
const rootContainer = createRoot(root);
rootContainer.render(<App />);