import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Homepage from './pages/Homepage';
import Photography from './pages/Photography.jsx';
import MakeupSelector from './components/MakeupSelector';
import MakeupDescriptionBox from './components/MakeupDescriptionBox.jsx';
import ReceptionSelector from './components/ReceptionSelector.jsx';
import { AppProvider } from './context/AppContext';
import SignIn from './components/SignIn.jsx';
import './index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signin" element={ <SignIn />} />
          {/* <Route path="/register" element={<Register />} />*/}
            <Route path="/photography" element={<Photography />} />
            <Route path="/Makeup" element={<MakeupSelector />} />
            <Route path="/Makeup" element={<MakeupDescriptionBox />} />
            <Route path="/Catering" element={<ReceptionSelector />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
