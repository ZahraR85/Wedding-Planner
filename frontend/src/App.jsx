import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard.jsx';
import Photography from './pages/Photography.jsx';
import MakeupSelector from './pages/MakeupSelector.jsx';
import MakeupDescriptionBox from './components/MakeupDescriptionBox.jsx';
import ReceptionSelector from './pages/ReceptionSelector.jsx';
import Guests from './pages/Guests.jsx';
import { AppProvider } from './context/AppContext';
import SignIn from './Auth/SignIn.jsx';
import Register from './Auth/Register.jsx';
import './index.css';
function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Dashboard" element={ <Dashboard />} />
            <Route path="/signin" element={ <SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/Makeup" element={<MakeupSelector />} />
            <Route path="/Makeup" element={<MakeupDescriptionBox />} />
            <Route path="/Catering" element={<ReceptionSelector />} />
            <Route path="/Guests" element={<Guests />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
