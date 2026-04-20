import { Routes, Route } from 'react-router-dom';
import { BuilderProvider } from './context/BuilderContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import BuilderPage from './pages/BuilderPage';
import SummaryPage from './pages/SummaryPage';
import './index.css';

export default function App() {
  return (
    <BuilderProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </main>
      <Footer />
    </BuilderProvider>
  );
}
