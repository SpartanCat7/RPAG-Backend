import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NexusView from './Views/Nexus/NexusView';
import SignInView from './Views/SignIn/SignInView';

import AdminGatekeeper from './Views/Admin/AdminGatekeeper';
import AdminViewHome from './Views/Admin/AdminViewHome';
import AdminViewModerators from './Views/Admin/AdminViewModerators';
import AdminViewAlertTypes from './Views/Admin/AdminViewAlertTypes';
import AdminViewSubscribers from './Views/Admin/AdminViewSubscribers';

import ModGatekeeper from './Views/Mod/ModGatekeeper';
import ModViewHome from './Views/Mod/ModViewHome';
import ModViewContentModeration from './Views/Mod/ModViewContentModeration';
import ModViewUserDetail from './Views/Mod/ModViewUserDetail';

import SubGatekeeper from './Views/Sub/SubGatekeeper';
import SubViewHome from './Views/Sub/SubViewHome';
import SubViewSubscriptionAdmin from './Views/Sub/SubViewSubscriptionAdmin';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NexusView />} />
        <Route path="login" element={<SignInView />} />
        <Route path="admin" element={<AdminGatekeeper />} >
          <Route index element={<AdminViewHome />} />
          <Route path="moderadores" element={<AdminViewModerators />} />
          <Route path="suscriptores" element={<AdminViewSubscribers />} />
          <Route path="tiposDeAlerta" element={<AdminViewAlertTypes />} />
        </Route>
        <Route path="mod" element={<ModGatekeeper />} >
          <Route index element={<ModViewHome />} />
          <Route path="content_moderation" element={<ModViewContentModeration />} />
          <Route path="user_view/:userId" element={<ModViewUserDetail />} />
        </Route>
        <Route path="sub" element={<SubGatekeeper />} >
          <Route index element={<SubViewHome />} />
          <Route path="subscription_management" element={<SubViewSubscriptionAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
