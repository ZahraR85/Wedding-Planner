import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard.jsx';
import UserInfo from './pages/UserInfo.jsx';
import AdminVenuePage from './AdminVenue/AdminVenuePage.jsx';
//import VenueList from './pages/AdminVenue/VenueList.jsx';
import VenueDetialsAdmin from './AdminVenue/VenueDetialsAdmin.jsx';
//import VenueCard from './AdminVenue/VenueCard.jsx';
import VenueSelection from './pages/VenueSelection.jsx';
import VenueBooking from './pages/VenueBooking.jsx';
import Photography from './pages/Photography.jsx';
import MakeupSelector from './pages/MakeupSelector.jsx';
//import MakeupDescriptionBox from './components/MakeupDescriptionBox.jsx';
import ReceptionSelector from './pages/ReceptionSelector.jsx';
import Guests from './pages/Guests.jsx';
import Musics from './pages/Music.jsx';
import { AppProvider } from './context/AppContext';
import SignIn from './Auth/SignIn.jsx';
import Register from './Auth/Register.jsx';
import GalleryManagement from './AdminVenue/GalleryManagement.jsx';
import Gallery from './pages/Gallery.jsx';
import CategoryDetails from './components/CategoryDetails.jsx'; 
import ShoppingCard from './pages/ShoppingCard.jsx';
import Searchvenues from './components/searchvenues.jsx'
import VenueDetail from "./components/venuedetail";
import AboutUs from './Pages/AboutUs.jsx';
import FAQ from "./pages/FAQ.jsx"
import './index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
              {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/ShoppingCard" element={ <ShoppingCard />} />
            <Route path="/Dashboard" element={ <Dashboard />} />
            <Route path="/Gallery" element={<Gallery />} />
            <Route path="/Gallery/:category" element={<CategoryDetails />} />
            <Route path="/UserInfo" element={ <UserInfo />} />
            <Route path="/GalleryManagement" element={ <GalleryManagement />} />
            <Route path="/signin" element={ <SignIn />} />
            <Route path="/register" element={<Register />} />
              {/* Admin Routes */}
            <Route path="/Admin/Venue" element={<AdminVenuePage />} />
            <Route path="/Admin/Venue/:id" element={<VenueDetialsAdmin />} />
            {/*<Route path="/venues" element={<VenueList />} />*/}
            {/*<Route path="/venues/:id" element={<VenueCard />} />*/}
             {/* user Routes */}
            <Route path="/venueSelections" element={<VenueSelection />} />
            <Route path="/venueBooking/:venueId" element={<VenueBooking />} />

            <Route path="/venues/:id" element={<VenueDetail />} />

            <Route path="/photography" element={<Photography />} />
            <Route path="/Makeup" element={<MakeupSelector />} />
            <Route path="/Catering" element={<ReceptionSelector />} />
            <Route path="/Guests" element={<Guests />} />
            <Route path="/Musics" element={<Musics />} />
            <Route path="/searchvenues" element={<Searchvenues />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/FAQ" element={<FAQ />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
