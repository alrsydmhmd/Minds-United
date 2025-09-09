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
import Signin from "./components/pages/Signin";
import Register from"./components/pages/Register";
import DashboardAdmin from "./components/pages/DashboardAdmin";
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

        {/* Form Sign In */}
        <Route path="/signin" element={<Signin />} />

        {/* Form Register */}
        <Route path="/register" element={<Register />} />

        {/* Dashboard Admin */}
        <Route path="/dashboard/admin" element={<DashboardAdmin />} />

        {/* Dashboard User */}
        <Route path="/dashboard/user" element={<DashboardUser />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
