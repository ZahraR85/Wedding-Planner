import Header from './components/Header';
import Features from './components/Features';
import Footer from './components/Footer';
import { AppProvider } from './context/AppContext';
import './index.css';

function App() {
  return (
    <AppProvider>
      <>
        <Header />
        <Features />
        <Footer />
      </>
    </AppProvider>
  );
}

export default App;
