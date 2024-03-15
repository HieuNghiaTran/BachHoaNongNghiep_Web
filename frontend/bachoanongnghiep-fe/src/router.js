import { ROUTER } from "./utils/router";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/Home";
import DetailProduct from "./pages/Product_Detail";
import CartPage from "./pages/Cart";
import ResultSearch from "./pages/ResultSearch";
import ProductWithCatoryPage from "./pages/ProductWithCatory";
import Dashboard from "./admin/pages/dashboard";
import ProductManagerPage from "./admin/pages/productManager";
import SubmitOrderPage from "./pages/SubmitOrderPage";
import Location from "./pages/storeLocation";
import OrderManager from "./admin/pages/odersManager";
import MyOrder from "./pages/MyOrders";
import Login from "./admin/pages/login";
import SuccessOrder from "./pages/succesOrder";
const renderUserRouter = () => {
  const userrouter = [
    {
      path: ROUTER.USER.Home,
      component: <HomePage />,
    },
    {

      path: ROUTER.USER.Product,
      component: <DetailProduct />,


    },
    {
      path: ROUTER.USER.Cart,
      component: <CartPage />,
    },


    {
      path: ROUTER.USER.Result,
      component: <ResultSearch/>,
    },


    {
      path: ROUTER.USER.ProductWithCatory,
      component: <ProductWithCatoryPage/>,
    },

    
    {
      path: ROUTER.USER.SubmitOrder,
      component: <SubmitOrderPage/>,
    },
    {
      path: ROUTER.USER.Location,
      component: <Location/>,
    },

    {
      path: ROUTER.USER.My_Order,
      component: <MyOrder/>,
    },
    
    {
      path: ROUTER.USER.SuccessOrder,
      component: <SuccessOrder/>,
    },

  ];

  return (
    <Routes>
      {userrouter.map((item, key) => (
        <Route key={key} path={item.path} element={item.component} />
        
      ))}

    </Routes>
  );
}

const renderAdmin = () => {
  const adminrouter = [
    {
      path: ROUTER.ADMIN.Home,
      component: <Dashboard/>,
    },
    {
      path: ROUTER.ADMIN.Product_Manager,
      component: <ProductManagerPage/>,
    },

    {
      path: ROUTER.ADMIN.Order_Manager,
      component: <OrderManager/>,
    },
    {
      path: ROUTER.ADMIN.Login,
      component: <Login/>,
    },
  ];

  return (
    <Routes>
      {adminrouter.map((item, key) => (
        <Route key={key} path={item.path} element={item.component} />
      ))}
    </Routes>
  );
}

const RouterCustom = () => {
  return renderUserRouter();
};

const RouterAdmin = () => {

return renderAdmin()

};

export {RouterCustom, RouterAdmin};
