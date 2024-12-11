import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}
      <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
