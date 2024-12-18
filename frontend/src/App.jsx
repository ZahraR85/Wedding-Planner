import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard.jsx';
import UserInfo from './pages/UserInfo.jsx';
import AdminVenuePage from './AdminVenue/AdminVenuePage.jsx';
//import VenueList from './pages/AdminVenue/VenueList.jsx';
import VenueForm from './AdminVenue/VenueForm.jsx';
import VenueCard from './AdminVenue/VenueCard.jsx';
import VenueSelection from './pages/VenueSelection.jsx';
import Photography from './pages/Photography.jsx';
import MakeupSelector from './pages/MakeupSelector.jsx';
import MakeupDescriptionBox from './components/MakeupDescriptionBox.jsx';
import ReceptionSelector from './pages/ReceptionSelector.jsx';
import Guests from './pages/Guests.jsx';
import Musics from './pages/Music.jsx';
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
              {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/Dashboard" element={ <Dashboard />} />
            <Route path="/UserInfo" element={ <UserInfo />} />
            <Route path="/signin" element={ <SignIn />} />
            <Route path="/register" element={<Register />} />
              {/* Admin Routes */}
            <Route path="/venues" element={<AdminVenuePage />} />
            {/*<Route path="/venues" element={<VenueList />} />*/}
            <Route path="/venues/:id" element={<VenueCard />} />
            <Route path="/venues/add" element={<VenueForm />} />
             {/* user Routes */}
            <Route path="/venueSelections" element={<VenueSelection />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/Makeup" element={<MakeupSelector />} />
            <Route path="/Makeup" element={<MakeupDescriptionBox />} />
            <Route path="/Catering" element={<ReceptionSelector />} />
            <Route path="/Guests" element={<Guests />} />
            <Route path="/Musics" element={<Musics />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
