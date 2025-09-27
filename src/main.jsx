// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/landingpage/LandingPage";

// Pages
import Login from "./components/pages/Login";
import Signup  from"./components/pages/Signup";
import DashboardUser from "./components/pages/DashboardUser";

// Admin
import Users from "./components/admin/Users";
import Programs from "./components/admin/Programs";
import ArtikelAdmin from "./components/admin/Article";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Halaman Utama */}
        <Route path="/" element={<LandingPage />} />

        {/* Halaman Masuk atau Registrasi */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard User */}
        <Route path="/user" element={<DashboardUser />} />

        <Route path="/admin/user" element={<Users />} />
        <Route path="/admin/program" element={<Programs /> } />
        <Route path="/admin/article" element={<ArtikelAdmin />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
