import { memo, type JSX } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import MyPage from "../components/pages/MyPage";
import SignUp from "../components/pages/SignUp";


const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};

export default memo(Router);