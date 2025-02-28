import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import Impact from './components/Impact';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Solutions />
      <Impact />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;