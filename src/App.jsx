import { BuilderProvider } from './context/BuilderContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Builder from './components/Builder/Builder';
import Summary from './components/Summary/Summary';
import Footer from './components/Footer/Footer';
import './index.css';

export default function App() {
  return (
    <BuilderProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Builder />
        <Summary />
      </main>
      <Footer />
    </BuilderProvider>
  );
}
