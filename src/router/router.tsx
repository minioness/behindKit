import { memo, type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import type { User } from "firebase/auth";

import Home from "../components/pages/Home";
import Login from "../components/pages/auth/Login";
import MyPage from "../components/pages/user/MyPage";
import SignUp from "../components/pages/auth/SignUp";
import Orders from "../components/pages/order/Orders";
import MyKit from "../components/pages/mykit/MyKit";
import ProductDetailGrid from "../components/products/ProductDetailGrid";
import CartPage from "../components/pages/carts/CartPage";
import EditInfo from "../components/pages/user/editInfo";
import WishListPage from "../components/pages/wishlist/WishListPage";
import OrderComplete from "../components/pages/order/OrderComplete";




interface RouterProps {
  user: User | null;
}


const Router = ({ user }: RouterProps): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetailGrid />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route 
        path="/mypage" 
        element={user ? <MyPage user={user} /> : <Navigate to="/login" replace />} 
      />

      <Route
        path="/mypage/orders"
        element={user ? <Orders user={user} /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/mypage/mykit"
        element={user ? <MyKit user={user} /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/mypage/editinfo"
        element={user ? <EditInfo user={user} /> : <Navigate to="/login" replace />}
      />
      
      <Route 
        path="/order-complete" 
        element={user ? <OrderComplete /> : <Navigate to="/login" replace />} 
      />

      <Route path="/wishlist" element={<WishListPage />} />
      <Route path="/cart" element={<CartPage user={user} />} />
      
    </Routes>
  );
};

export default memo(Router);