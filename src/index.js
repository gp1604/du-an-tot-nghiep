
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import 'react-phone-number-input/style.css'
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import AuthVerifyComponent from './AuthVerifyComponent '
import { toast, ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";


// let token = localStorage.getItem('token')
// let decoded;
// let decode;
// if (token !== null) {
//   decoded = jwt_decode(token);
//   decode = JSON.parse(atob(token.split('.')[1]));
// }
// if (token && decode.exp * 1000 < new Date().getTime()) {
//   localStorage.clear()
//   toast.warning('Phiên đăng nhập đã hết hạn ', { autoClose: 1200 })
//   setTimeout(() => {
//     window.location.reload();
//   }, 1500);
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <BrowserRouter >
      <AuthVerifyComponent />
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        {/* <Route path="/user" render={(props) => <UserLayout {...props} />} /> */}
        <Redirect from="/" to="/auth/homePage" />
      </Switch>
    </BrowserRouter>
  </React.Fragment>

);
