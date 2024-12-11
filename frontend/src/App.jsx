import Header from './components/Header';
import Features from './components/Features';
import Footer from './components/Footer';
import MakeupSelector from './components/MakeupSelector';
import { AppProvider } from './context/AppContext';
import './index.css';

function App() {
  return (
    <AppProvider>
      <>
        <Header />
        <Features />
        <Footer />
        <MakeupSelector />
      </>
    </AppProvider>
  );
}

export default App;
