import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import BlogsPage from './pages/BlogsPage';
import CareersPage from './pages/CareersPage';
import { ScrollToTop } from './components/ScrollToTop';

function HomeLayout() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    (window as any).gtag?.('config', 'G-GCPPYDPRGH', { page_path: location.pathname });
  }, [location]);

  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/services/:id" element={<ServicePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/careers" element={<CareersPage />} />
    </Routes>
    </>
  );
}
