/* eslint-disable react/prop-types */
import MainNav from "./mainNav";
import Footer from '../components/footer'
import "../assets/styles/layout.css"

//
const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <MainNav />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
