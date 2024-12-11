import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Features from './components/Features';
import Footer from './components/Footer';

import Photography from './pages/Photography.jsx';
import MakeupSelector from './components/MakeupSelector';
import { AppProvider } from './context/AppContext';
import './index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Features />} />
            <Route path="/facilities/photography" element={<Photography />} />
          </Routes>
          <Footer />
          <MakeupSelector />
        </>
      </Router>
      <>
        <Header />
        <Features />
        <Footer />
  
      </>
    </AppProvider>
  );
}

export default App;
