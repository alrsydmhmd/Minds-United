// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Landing page components
import Navbar from "./components/landingpage/Navbar";
import Header from "./components/landingpage/Header";
import About from "./components/landingpage/About";
import Program from "./components/landingpage/Program";
import Layanan from "./components/landingpage/Layanan";
import Artikel from "./components/landingpage/Artikel";
import Testimoni from "./components/landingpage/Testimoni";
import Footer from "./components/landingpage/Footer";

// Pages
import Login from "./components/pages/Login";
import Signup  from"./components/pages/Signup";
import AdminDashboard from "./components/pages/AdminDashboard";
import DashboardUser from "./components/pages/DashboardUser";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Program />
      <Layanan />
      <Artikel />
      <Testimoni />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Halaman Utama */}
        <Route path="/" element={<LandingPage />} />

        {/* Halaman Masuk atau Registrasi */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Admin */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Dashboard User */}
        <Route path="/user" element={<DashboardUser />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
