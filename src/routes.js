
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.jsx";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import AdminCustomer from "views/controller/AdminCustomer";
import AdminCustomerOrders from "views/controller/AdminCustomerOrders";
import AdminAddress from "views/controller/AdminAddress";
import AdminPillar from "views/controller/AdminPillar";
import Cart from "views/cart/Cart";
import HomePage from "views/Home/HomePage";
import Checkout from "views/cart/Checkout";
import OrderDetail from "views/cart/OrderDetail";
import OrderPlace from "views/orderPlace/OrderPlace";
import AddressDetail from "views/pillarAddress/AddressDetail";
import AdminAvailablePillar from "views/controller/AdminAvailablePillar";
import AdminHiringPillar from "views/controller/AdminHiringPillar";
import Category from "views/category/Category";
import AdminCategory from "views/controller/AdminCategory";
import Activity from "views/Profile/Activity";
import PageNotFound from "layouts/PageNotFound";
import ForgotPassword from "views/examples/ForgotPassword";
import AdminBank from "views/controller/AdminBank";
import AdminPictures from "views/controller/AdminPictures";
import Setting from "views/Setting/Setting";
import AdminSetting from "views/controller/AdminSetting";
import ChangePassword from "views/examples/ChangePassword";
import WishList from "views/WishList/WishList";
import ChangePasswordForgot from "views/examples/ChangePasswordForgot";
import CategoryDetail from "views/Home/CategoryDetail";

var routes = [
  {
    path: "/index",
    name: "Bảng điều khiển",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin"
  // },
  {
    path: "/pillars",
    name: " Địa chỉ",
    icon: "ni ni-square-pin text-pink",
    component: AdminAddress,
    layout: "/admin"
  },
  {
    path: "/product",
    name: "Trụ",
    icon: "ni ni-bullet-list-67 text-blue",
    component: AdminPillar,
    layout: "/admin"
  },
  {
    path: "/availablePillar",
    name: "Trụ chưa cho thuê",
    icon: "ni ni-money-coins text-black",
    component: AdminAvailablePillar,
    layout: "/admin"
  },
  {
    path: "/hiringPillar",
    name: "Trụ đã cho thuê",
    icon: "ni ni-calendar-grid-58 text-green",
    component: AdminHiringPillar,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Loại trụ",
    icon: "ni  ni-paper-diploma text-green",
    component: AdminCategory,
    layout: "/admin"
  },
  {
    path: "/customers",
    name: "Khách hàng",
    icon: "ni ni-badge text-red",
    component: AdminCustomer,
    layout: "/admin"
  },
  {
    path: "/orderPlace",
    name: "Đơn đặt trụ",
    icon: "ni ni-single-copy-04 text-cyan",
    component: OrderPlace,
    layout: "/admin"
  },
  {
    path: "/banks",
    name: "Thông Tin Ngân hàng",
    icon: "ni ni-diamond text-gold",
    component: AdminBank,
    layout: "/admin"
  },
  {
    path: "/pictures",
    name: "Ảnh website",
    icon: "ni ni-image text-blue",
    component: AdminPictures,
    layout: "/admin"
  },
  {
    path: "/setting",
    name: "Cài đặt email",
    icon: "ni ni-settings text-blue",
    component: AdminSetting,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/auth"
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin"
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/homePage",
    name: "Home Page",
    icon: "ni ni-world text-pink",
    component: HomePage,
    layout: "/auth"
  },
  {
    path: "/cart",
    name: "Cart",
    icon: "ni ni-circle-08 text-pink",
    component: Cart,
    layout: "/auth"
  },
  {
    path: "/order/:id",
    name: "OrderDetail",
    icon: "ni ni-circle-08 text-pink",
    component: OrderDetail,
    layout: "/auth"
  },
  {
    path: "/activity",
    name: "Activity",
    icon: "ni ni-circle-08 text-pink",
    component: Activity,
    layout: "/auth"
  },
  {
    path: "/pageNotFound",
    name: "PageNotFound",
    icon: "ni ni-circle-08 text-pink",
    component: PageNotFound,
    layout: "/auth"
  },
  {
    path: "/address/:id",
    name: "AddressDetail",
    icon: "ni ni-circle-08 text-pink",
    component: AddressDetail,
    layout: "/auth"
  },

  {
    path: "/categories/:id",
    name: "CategoryDetail",
    icon: "ni ni-circle-08 text-pink",
    component: CategoryDetail,
    layout: "/auth"
  },

  {
    path: "/forgotPassword",
    name: "ForgotPassword",
    icon: "ni ni-circle-08 text-pink",
    component: ForgotPassword,
    layout: "/auth"
  },
  {
    path: "/changePassword",
    name: "ChangePassword",
    icon: "ni ni-circle-08 text-pink",
    component: ChangePassword,
    layout: "/auth"
  },
  {
    path: "/wishList",
    name: "wishList",
    icon: "ni ni-circle-08 text-pink",
    component: WishList,
    layout: "/auth"
  },
  {
    path: "/reset_password",
    name: "reset_password",
    icon: "ni ni-circle-08 text-pink",
    component: ChangePasswordForgot,
    layout: "/auth"
  },

];
export default routes;
