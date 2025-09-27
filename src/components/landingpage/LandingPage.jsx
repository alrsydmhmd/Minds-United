// src/components/landingpage/LandingPage.jsx
import React from "react";

// Landing page components
import Navbar from "./Navbar";
import Header from "./Header";
import About from "./About";
import Program from "./Program";
import Layanan from "./Layanan";
import Artikel from "./Artikel";
import Testimoni from "./Testimoni";
import Footer from "./Footer";

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

export default LandingPage;
