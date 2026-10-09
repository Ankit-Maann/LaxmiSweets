
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Global components
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FloatingWhatsApp from "./components/FloatingWhatsapp";
import BackToTop from "./components/BackToTop";

// Cart context
import { CartProvider } from "./context/CartContext";

// Pages
import Home from "./pages/Home";
import Sweets from "./pages/Sweets";
import Catering from "./pages/Catering";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

// Replace with the shop's actual WhatsApp number.
// Use country code + number, without +, spaces, or dashes.
const WHATSAPP_PHONE = "";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />

        <div className="flex min-h-screen flex-col bg-[#fffdf9]">
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sweets" element={<Sweets />} />
              <Route path="/catering" element={<Catering />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />

              {/* 404 page for unknown routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />

          {/* Global floating actions */}
          <FloatingWhatsApp phoneNumber={WHATSAPP_PHONE} />
          <BackToTop />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
