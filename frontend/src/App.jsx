import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Features from './components/Features';
import Footer from './components/Footer';
import Photography from './pages/Photography';
import MakeupSelector from './components/MakeupSelector';
import ReceptionSelector from './components/ReceptionSelector';
import Guests from './components/guest';
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
            <Route path="/reception" element={<ReceptionSelector />} />
            <Route path="/makeups" element={<MakeupSelector />} />
          </Routes> 
          <Footer /> 
          <MakeupSelector />
          <ReceptionSelector />
          <Guests />
          <Photography />
           </> </Router>
    </AppProvider>
  );
}
export default App;