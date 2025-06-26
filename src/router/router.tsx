import { memo, type JSX } from "react";
import { Routes, Route } from "react-router-dom";
import type { User } from "firebase/auth";

import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import MyPage from "../components/pages/MyPage";
import SignUp from "../components/pages/SignUp";
import Orders from "../components/pages/Orders";
import WishList from "../components/pages/WishList";
import MyKit from "../components/pages/MyKit";
import ProductDetailGrid from "../components/products/ProductDetailGrid";
import CartView from "../components/carts/CartView";
import EditInfo from "../components/pages/editInfo";




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
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/mypage/orders" element={<Orders />} />
      <Route path="/mykit" element={<MyKit />} />
      <Route path="/cart" element={<CartView />} />
      
    </Routes>
  );
};

export default memo(Router);