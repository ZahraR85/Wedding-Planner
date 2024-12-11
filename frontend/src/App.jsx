import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Homepage from './pages/Homepage';
import Photography from './pages/Photography';
import MakeupSelector from './components/MakeupSelector';
import { AppProvider } from './context/AppContext';
import SignIn from './components/SignIn';
import './index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signin" element={ <SignIn />} />
            <Route path="/facilities/photography" element={<Photography />} />
          </Routes>
        </Layout>
        <MakeupSelector />
      </Router>
    </AppProvider>
  );
}

export default App;
