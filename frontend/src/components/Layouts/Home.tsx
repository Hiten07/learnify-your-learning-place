import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { ToastContainer } from 'react-toastify';

const Home = () => {
  return (
    <div>
      <header>
            <Navbar/>
            <ToastContainer/>
        </header>
        <Outlet/>
        <footer>
        </footer>
    </div>
  )
}

export default Home;
