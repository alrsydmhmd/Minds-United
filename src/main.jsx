import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from "./components/landingpage/Navbar"
import Header from "./components/landingpage/Header"
import Footer from "./components/landingpage/Footer"
import About from "./components/landingpage/About"
import Program from "./components/landingpage/Program"
import Layanan from "./components/landingpage/Layanan"
import Artikel from "./components/landingpage/Artikel"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Header />
    <About />
    <Program />
    <Layanan />
    <Artikel />
    <Footer />
  </StrictMode>,
)
