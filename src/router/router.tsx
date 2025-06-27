import { memo, type JSX } from "react";
import { Routes, Route } from "react-router-dom";
import type { User } from "firebase/auth";

import Home from "../components/pages/Home";
import Login from "../components/pages/auth/Login";
import MyPage from "../components/pages/user/MyPage";
import SignUp from "../components/pages/auth/SignUp";
import Orders from "../components/pages/user/Orders";
import MyKit from "../components/pages/user/MyKit";
import ProductDetailGrid from "../components/products/ProductDetailGrid";
import CartPage from "../components/pages/carts/CartPage";
import EditInfo from "../components/pages/user/editInfo";
import WishListPage from "../components/pages/wishlist/WishListPage";




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
      <Route path="/mypage" element={<MyPage user={user}/>} />
      <Route path="/mypage/editinfo" element={<EditInfo user={user}/>} />
      <Route path="/wishlist" element={<WishListPage />} />
      <Route path="/mypage/orders" element={<Orders />} />
      <Route path="/mypage/mykit" element={<MyKit />} />
      <Route path="/cart" element={<CartPage />} />
      
    </Routes>
  );
};

export default memo(Router);