import Header from '../components/Header';
import Footer from '../components/footer';
import Features from '../components/features';
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Features />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
